import { useState } from "react"
import Section from "../../style/mui/styled/Section"
import TitleWithDividers from "../ui/TitleWithDividers"
import UserInAdmin from "./UserInAdmin"

function UserShowTable({ row, setReset }) {
    const [user, setUser] = useState(row)
    if (!user) return <Section>
        <TitleWithDividers title={'هذا المستخدم غير موجود !'} />
    </Section>

    return (
        <Section>
            <TitleWithDividers title={'صفحه الطالب : ' + user?.name} />
            <UserInAdmin user={user} setUser={setUser} setReset={setReset} />
        </Section>
    )
}

export default UserShowTable
