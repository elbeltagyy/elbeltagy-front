import { useState } from 'react'
import { Alert, Box, TextField } from '@mui/material'
import { useSearchParams } from 'react-router-dom';

import Loader from '../../style/mui/loaders/Loader'
import Section from '../../style/mui/styled/Section'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import { FilledHoverBtn } from '../../style/buttonsStyles'

import useLazyGetData from '../../hooks/useLazyGetData'
import { useLazyGetOneUserQuery } from '../../toolkit/apis/usersApi'
import WrapperHandler from '../../tools/WrapperHandler'

import Separator from '../../components/ui/Separator'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import UserAttempts from '../../components/users/UserAttempts'
import UserHeader from '../../components/ui/UserHeader'
import UserCodes from '../../components/users/UserCodes'
import UserSubscriptions from '../../components/users/UserSubscriptions'
import UserNotifications from '../../components/users/UserNotifications'
import UserProfileUpdate from '../../components/users/UserProfileUpdate'

function FindUserPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [userName, setUserName] = useState(searchParams.get('userName') || '')
    const [searchedUserName, setSearchedUserName] = useState()

    const [user, setUser] = useState()
    const [getData, status] = useLazyGetOneUserQuery()
    const [getByUserName] = useLazyGetData(getData)

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

                    <TextField
                        label={'البحث عن طالب'}
                        placeholder={'اسم المستخدم فقط'}
                        fullWidth
                        color='warning'
                        value={userName}
                        onChange={(e) => { setUserName(e.target.value) }}
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
                    <FlexColumn sx={{ width: '100%', gap: "12px" }}>
                        <UserHeader user={user} isAll={true} flexDirection='column' />
                        <UserNotifications user={user} />
                        <UserCodes user={user} />
                        <UserSubscriptions user={user} />
                        <UserAttempts user={user} />
                        <UserProfileUpdate user={user} isAdmin={true} setUserAdmin={setUser} />
                    </FlexColumn>
                )}
            </Box>
        </Section>
    )
}

export default FindUserPage
