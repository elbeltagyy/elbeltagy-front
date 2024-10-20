import React from 'react'
import { useSelector } from 'react-redux'
import Section from '../../style/mui/styled/Section'
import UserHeader from '../../components/ui/UserHeader'
import TitleSection from '../../components/ui/TitleSection'
import Separator from '../../components/ui/Separator'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import UserProfileUpdate from '../../components/users/UserProfileUpdate'

function UserProfilePage() {

    const { user } = useSelector(s => s.global)

    return (
        <Section>
            <TitleSection title={'الصفحه الشخصيه'} />
            <UserHeader isAll={true} user={user} />
            <Separator />
            <UserProfileUpdate user={user} />
        </Section>
    )
}

export default UserProfilePage
