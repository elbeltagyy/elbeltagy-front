import React, { useState } from 'react'
import Section from '../../style/mui/styled/Section'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import { Alert, Box, Button, TextField } from '@mui/material'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import Separator from '../../components/ui/Separator'
import { FilledHoverBtn } from '../../style/buttonsStyles'
import { useLazyGetOneUserQuery } from '../../toolkit/apis/usersApi'
import { useGetCodesQuery } from '../../toolkit/apis/codesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import WrapperHandler from '../../tools/WrapperHandler'
import Loader from '../../style/mui/loaders/Loader'
import UserHeader from '../../components/ui/UserHeader'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import UserCodes from '../../components/users/UserCodes'
import UserSubscriptions from '../../components/users/UserSubscriptions'
import UserAttempts from '../../components/users/UserAttempts'
import UserNotifications from '../../components/users/UserNotifications'
import UserProfileUpdate from '../../components/users/UserProfileUpdate'

function FindUserPage() {
    const [userName, setUserName] = useState()
    const [searchedUserName, setSearchedUserName] = useState()

    const [user, setUser] = useState()
    const [getData, status] = useLazyGetOneUserQuery()
    const [getByUserName] = useLazyGetData(getData)

    const findUser = async () => {
        setSearchedUserName(userName)
        const res = await getByUserName(userName)
        setUser(res)
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
                        <UserProfileUpdate user={user} isAdmin={true} />
                    </FlexColumn>
                )}
            </Box>
        </Section>
    )
}

export default FindUserPage
