import * as Yup from 'yup'
import { lang } from '../../settings/constants/arlang'
import MakeForm from '../../tools/makeform/MakeForm'
import fileValidation from '../../tools/validations/fileValidation.js'

function PaymentForm({ payment, status, onSubmit }) {

    const inputs = [
        {
            name: 'id',
            label: "id",
            hidden: true,
            disabled: true,
            value: payment?._id
        }, {
            name: 'name',
            label: 'اسم وسيله الدفع',
            value: payment?.name ?? '',
            validation: Yup.string().required(lang.REQUERIED)
        }, {
            name: 'description',
            label: 'تفاصيل وسيله الدفع',
            type: 'editor',
            value: payment?.description ?? '',
            validation: Yup.string().required(lang.REQUERIED)

        }, {
            name: 'isActive',
            label: 'الحاله',
            type: 'switch',
            value: payment?.isActive ?? true
        }, {
            name: 'file',
            label: 'الصوره',
            type: 'file',
            validation: fileValidation
        },
    ]
    return (
        <MakeForm inputs={inputs} onSubmit={onSubmit} status={status} />
    )
}

export default PaymentForm
