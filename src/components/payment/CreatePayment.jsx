import usePostData from "../../hooks/usePostData"
import Section from "../../style/mui/styled/Section"
import { useCreatePaymentMutation } from "../../toolkit/apis/paymentsApi"
import PaymentForm from "./PaymentForm"

function CreatePayment({ setReset }) {
    const [sendData, status] = useCreatePaymentMutation()
    const [createPayment] = usePostData(sendData)

    const onSubmit = async (values, props) => {
        await createPayment(values, true)
        if (setReset) {
            setReset(prev => {
                return !prev
            })
        }
        props.resetForm()
    }

    return (
        <Section>
            <PaymentForm status={status} onSubmit={onSubmit} />
        </Section>
    )
}

export default CreatePayment
