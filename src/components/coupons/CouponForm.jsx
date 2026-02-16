import { codeConstants } from "../../settings/constants/codeConstants"
import MakeForm from "../../tools/makeform/MakeForm"
import * as Yup from 'yup'

function CouponForm({ course, onSubmit, status, coupon = { type: codeConstants.PRIVATE } }) {
    const inputs = [
        {
            name: 'course',
            value: course?._id || course,
            disabled: true,
            hidden: true
        }, {
            name: 'coupon',
            label: 'الكوبون',
            validation: Yup.string()
                .min(6, '6 احرف على الاقل ')
                .matches(/^[a-z0-9]+$/, 'Must be all lowercase letters') // Ensures all characters are lowercase letters
                .required("مطلوب"),
        }, {
            name: 'type',
            label: 'نوع الكوبون',
            type: 'select',
            options: [codeConstants.GLOBAL, codeConstants.PRIVATE, codeConstants.DEFINED],
            value: coupon?.type,
            disabled: true
        }, {
            name: 'copies',
            label: 'عدد النسخ',
            value: 1,
            validation: Yup.number()
                .min(1, '1 اقل قيمه')
                .max(500, 'اقصى قيمه هى 500')
                .required("مطلوب"),
        }, {
            name: 'numbers',
            label: 'العدد المسموح به للاستخدام',
            type: 'number',
            value: 1,
            validation: Yup.number()
                .min(1, '1 اقل قيمه')
                .max(200, 'اقصى قيمه هى 200')
                .required("مطلوب"),
        }, {
            name: 'discount',
            label: 'نسبه الخصم',
            type: 'number',
            validation: Yup.number()
                .min(1, '1 اقل قيمه')
                .max(100, 'اقصى قيمه هى 100 %')
                .required("مطلوب"),
        },
        {
            name: 'isActive',
            label: 'الحاله',
            type: 'switch',
            value: true
        }
    ]


    return (
        <div>
            <MakeForm inputs={inputs} onSubmit={onSubmit} status={status} />
        </div>
    )
}

export default CouponForm
