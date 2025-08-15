import { FlexColumn } from "../../style/mui/styled/Flexbox"
import UserHeader from "../ui/UserHeader"
import UserActions from "./UserActions"
import UserInfoTabs from "./UserInfoTabs"

function UserInAdmin({ user, setUser, setReset }) {
    return (
        <FlexColumn sx={{ width: '100%', gap: "12px" }}>
            <UserHeader user={user} isAll={true} flexDirection='column' />
            <UserActions user={user} setUser={setUser} setReset={setReset} />

            <UserInfoTabs user={user} setUser={setUser} setReset={setReset} />
        </FlexColumn>
    )
}

export default UserInAdmin
