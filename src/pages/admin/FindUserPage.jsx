import { useState } from 'react'
import { Alert, Box } from '@mui/material'
import { useSearchParams } from 'react-router-dom';

import Loader from '../../style/mui/loaders/Loader'
import Section from '../../style/mui/styled/Section'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import { FilledHoverBtn } from '../../style/buttonsStyles'

import useLazyGetData from '../../hooks/useLazyGetData'
import { useLazyGetOneUserQuery, useLazyGetUsersQuery } from '../../toolkit/apis/usersApi'
import WrapperHandler from '../../tools/WrapperHandler'

import Separator from '../../components/ui/Separator'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import AutoInput from '../../style/mui/styled/AutoInput';
import UserInAdmin from '../../components/users/UserInAdmin';

function FindUserPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [userName, setUserName] = useState(searchParams.get('userName') || null)
    const [searchedUserName, setSearchedUserName] = useState()

    const [user, setUser] = useState()
    const [getData, status] = useLazyGetOneUserQuery()
    const [getByUserName] = useLazyGetData(getData)

    const [getUsersData] = useLazyGetUsersQuery()
    const [filterUsers] = useLazyGetData(getUsersData)

    const fetchFc = async (filter) => {
        const res = await filterUsers({ userName: 'contains_split_' + filter, limit: 3 })
        return res.users.map(user => user.userName)
    }

    const findUser = async () => {
        setUser()
        setSearchedUserName(userName)
        const res = await getByUserName(userName)
        setUser(res)
        setSearchParams({
            userName
        });
    }

    return (
        <Section>
            <TitleWithDividers title={'البحث عن طالب بواسطه اسم المستخدم'} />
            <Box sx={{ mt: 5 }}>
                <FlexColumn>
                    <AutoInput
                        label={'البحث عن طالب'}
                        placeholder={'اسم المستخدم فقط'}
                        fetchFc={fetchFc}
                        setSearch={setUserName}
                        value={userName}
                    />

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
