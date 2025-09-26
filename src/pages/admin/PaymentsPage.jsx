import GetPayments from "../../components/payment/GetPayements"
import TitleWithDividers from "../../components/ui/TitleWithDividers"
import Section from "../../style/mui/styled/Section"

function ManagePaymentsPage() {
    return (
        <Section>
            <TitleWithDividers title={'وسائل الدفع'} />
            <GetPayments />
        </Section>
    )
}

export default ManagePaymentsPage
