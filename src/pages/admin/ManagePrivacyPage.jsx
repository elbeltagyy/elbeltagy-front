import React, { useState } from 'react'
import Section from '../../style/mui/styled/Section'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import Separator from '../../components/ui/Separator'
import GetPrivacies from '../../components/privacy/GetPrivacies'
import CreatePrivacy from '../../components/privacy/CreatePrivacy'

function ManagePrivacyPage() {

    const [reset, setReset] = useState(false)

    return (
        <Section>
            <TitleWithDividers title={'اداره سياسات المنصه'} />
            <CreatePrivacy setReset={setReset} />
            <Separator />
            <GetPrivacies reset={reset} setReset={setReset} />
        </Section>
    )
}

export default ManagePrivacyPage
