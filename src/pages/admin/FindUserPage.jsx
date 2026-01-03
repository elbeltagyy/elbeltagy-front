import { useState } from 'react'
import { Alert, Box, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom';

import Loader from '../../style/mui/loaders/Loader'
import Section from '../../style/mui/styled/Section'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import { FilledHoverBtn } from '../../style/buttonsStyles'

import useLazyGetData from '../../hooks/useLazyGetData'
import { useLazyGetOneUserQuery, useLazyGetUsersQuery } from '../../toolkit/apis/usersApi'
import WrapperHandler from '../../tools/WrapperHandler'

import Separator from '../../components/ui/Separator'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import AutoInput from '../../style/mui/styled/AutoInput';
import UserInAdmin from '../../components/users/UserInAdmin';
import RadioStyled from '../../style/mui/styled/RadioStyled';
import InfoText from '../../components/ui/InfoText';

//Phone - FamilyPhone - Name
const paramsToFind = [
    {
        value: 'userName', label: 'اسم المستخدم'
    }, {
        value: 'name', label: 'الاسم'
    }
    // , {
    //     value: 'familyPhone', label: 'رقم ولي الامر'
    // }
]

function FindUserPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchBy, setSearchBy] = useState('userName')

    const [userName, setUserName] = useState(searchParams.get('userName') || null)

    const [searchedUserName, setSearchedUserName] = useState()

    const [user, setUser] = useState()
    const [getData, status] = useLazyGetOneUserQuery()
    const [getByUserName] = useLazyGetData(getData)

    const [getUsersData] = useLazyGetUsersQuery()
    const [filterUsers] = useLazyGetData(getUsersData)

    const fetchFc = async (filter) => {
        const res = await filterUsers({ [searchBy]: 'contains_split_' + filter, limit: 3, select: 'userName name familyPhone' })
        const options = res.users.map(user => {
            return ({
                id: user?.userName, label: user?.name + ' (' + user?.userName + ')',
                familyPhone: user?.familyPhone
            })
        })
        return options
    }

    const findUser = async () => {
        setUser()
        const validUserName = userName?.id || (typeof userName === 'string' && userName)
        setSearchedUserName(validUserName)
        const res = await getByUserName(validUserName)
        setUser(res)
        setSearchParams({
            userName: validUserName
        });
    }


    const RenderOption = ({ props, option }) => {

        return <FlexColumn sx={{ justifyContent: 'flex-start', mb: '12px' }}>
            <InfoText label={'الطالب'} description={option.label} />
            <InfoText label={'اسم المستخدم'} description={option.id} />
            <InfoText label={'رقم ولي الامر'} description={option.familyPhone} />
        </FlexColumn>
    }

    return (
        <Section>
            <TitleWithDividers title={'البحث عن طالب '} />
            <Box sx={{ mt: 5 }}>
                <FlexColumn gap={'16px'}>
                    <RadioStyled sx={{ mr: 'auto' }} row
                        options={paramsToFind}
                        label={'البحث بواسطه'} setValue={setSearchBy} value={searchBy} />

                    <AutoInput
                        label={'البحث عن طالب'}
                        placeholder={'اسم المستخدم فقط'}
                        fetchFc={fetchFc}
                        setSearch={setUserName}
                        value={userName}
                        RenderOption={RenderOption}
                    />

                    {/* Btn return User Data */}
                    <FlexColumn >
                        <FilledHoverBtn disabled={!userName || status.isLoading || userName === searchedUserName} onClick={findUser}>
                            {status.isLoading ? <Loader /> : 'ابحث'}
                        </FilledHoverBtn>
                        <WrapperHandler status={status} />

                        {!user && status.isSuccess && (
                            <Alert>لا يوجد مستخدم لديه هذا  {searchedUserName} </Alert>
                        )}

                    </FlexColumn>
                </FlexColumn>

                <Separator />

                {user && (
                    <UserInAdmin user={user} setUser={setUser} />
                )}
            </Box>
        </Section>
    )
}

export default FindUserPage
