import usePostData from "../../hooks/usePostData"
import Section from "../../style/mui/styled/Section"
import { useUpdatePaymentMutation } from "../../toolkit/apis/paymentsApi"
import TitleWithDividers from "../ui/TitleWithDividers"
import PaymentForm from "./PaymentForm"

function UpdatePayment({ setReset, payment }) {
    const [sendFc, status] = useUpdatePaymentMutation()
    const [updatePayment] = usePostData(sendFc)

    const handleSubmit = async (data) => {
        await updatePayment({ ...data, _id: payment._id }, true)
        if (setReset) setReset(s => !s)
    }
    return (
        <Section>
            <TitleWithDividers title={'تعديل وسيله الدفع' + ' ' + payment.name} />
            <PaymentForm onSubmit={handleSubmit} payment={payment} status={status} />
        </Section>
    )
}

export default UpdatePayment
