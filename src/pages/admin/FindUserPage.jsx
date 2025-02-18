import { useState } from 'react'
import { Alert, Box, Button, TextField } from '@mui/material'
import { useSearchParams } from 'react-router-dom';

import Loader from '../../style/mui/loaders/Loader'
import Section from '../../style/mui/styled/Section'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import { ErrorBtn, FilledHoverBtn, OutLinedHoverBtn } from '../../style/buttonsStyles'

import useLazyGetData from '../../hooks/useLazyGetData'
import { useLazyGetOneUserQuery, useLazyGetUsersQuery } from '../../toolkit/apis/usersApi'
import WrapperHandler from '../../tools/WrapperHandler'

import Separator from '../../components/ui/Separator'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import UserAttempts from '../../components/users/UserAttempts'
import UserHeader from '../../components/ui/UserHeader'
import UserCodes from '../../components/users/UserCodes'
import UserSubscriptions from '../../components/users/UserSubscriptions'
import UserNotifications from '../../components/users/UserNotifications'
import UserProfileUpdate from '../../components/users/UserProfileUpdate'
import AutoInput from '../../style/mui/styled/AutoInput';
import GetSubscriptions from '../../components/subscriptions/GetSubscriptions';
import UserActions from '../../components/users/UserActions';

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
        const res = await filterUsers({ userName: filter, limit: 3 })
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
                    <FlexColumn sx={{ width: '100%', gap: "12px" }}>
                        <UserHeader user={user} isAll={true} flexDirection='column' />
                        <UserActions user={user} setUser={setUser} />
                        <UserNotifications user={user} />
                        <UserCodes user={user} />
                        <GetSubscriptions user={user._id} isShowTitle={true} />
                        <UserAttempts user={user} />
                        <UserProfileUpdate user={user} isAdmin={true} setUserAdmin={setUser} />
                    </FlexColumn>
                )}
            </Box>
        </Section>
    )
}

export default FindUserPage
