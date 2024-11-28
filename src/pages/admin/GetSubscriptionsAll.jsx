import Section from '../../style/mui/styled/Section'
import GetSubscriptions from '../../components/subscriptions/GetSubscriptions'
import TitleWithDividers from '../../components/ui/TitleWithDividers'

function GetSubscriptionsAll() {
    return (
        <Section>
            <TitleWithDividers title={'اشتراكات المنصه'} />
            <GetSubscriptions />
        </Section>
    )
}

export default GetSubscriptionsAll
