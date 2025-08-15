import Section from '../../style/mui/styled/Section'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import Invoices from '../../components/invoices/Invoices'

function InvoicesPage() {
    return (
        <Section>
            <TitleWithDividers title={'Invoices'} />
            <Invoices />
        </Section>
    )
}

export default InvoicesPage
