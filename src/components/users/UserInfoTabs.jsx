import { useState } from 'react'
import TabsStyled from '../../style/mui/styled/TabsStyled'
import UserNotifications from './UserNotifications'
import UserCodes from './UserCodes'
import GetSubscriptions from '../subscriptions/GetSubscriptions'
import UserAttempts from './UserAttempts'
import UserProfileUpdate from './UserProfileUpdate'
import GetViewsCompo from '../views/GetViews'
import GetEveryUserViews from '../views/GetEveryUserViews'

function UserInfoTabs({ user, setUser, setReset }) {



    const [tabOpen, setTab] = useState(0)
    const tabOptions = [
        { label: "الاشعارات", value: 0, },
        { label: "الاكواد", value: 1 },
        { label: "الاشتراكات", value: 2 },
        { label: "الاختبارات", value: 3 },
        { label: "المشاهدات", value: 4 },
        { label: "وقت التدريب", value: 5 },
        { label: "تحديث البيانات", value: 6 },
    ]


    return (
        <>
            <TabsStyled value={tabOpen} setValue={setTab}
                tabs={tabOptions}
            />
            {tabOpen === 0 ?
                <UserNotifications user={user} /> : tabOpen === 1 ?
                    <UserCodes user={user} /> : tabOpen === 2 ?
                        <GetSubscriptions user={user._id} isShowTitle={true} /> : tabOpen === 3 ?
                            <UserAttempts user={user} /> : tabOpen === 4 ?
                                <GetViewsCompo userId={user?._id} />
                                : tabOpen === 5 ?
                                    <GetEveryUserViews userId={user._id} /> :
                                    <UserProfileUpdate user={user} isAdmin={true} setUserAdmin={setUser} setReset={setReset} />
            }

        </>
    )
}

export default UserInfoTabs
