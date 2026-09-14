import bookConstants, { bookConstantsArray } from "../../settings/constants/bookConstants"
import MakeForm from "../../tools/makeform/MakeForm"
import * as Yup from 'yup'
import { pdfSizeValid, pdfTypeValid } from "../../tools/validations/pdfValidation"
import imageValidation from "../../tools/validations/imageValidation"

const notAllowed = ['url', 'file']

function BookForm({ book = {}, onSubmit, status }) {
    const inputs = [
        {
            name: 'grade',
            value: book.grade,
            validation: Yup.number()
                .required(),
            disabled: true, hidden: true
        }, {
            name: 'title',
            label: 'اسم الكتاب',
            validation: Yup.string()
                .required(),
            column: 1, row: 1
        }, {
            name: 'description',
            label: 'الوصف',
            rows: 3,
            column: 2, row: 1,
            variant: 'filled',
            validation: Yup.string()
                .required()
        }, {
            name: 'type',
            label: 'نوع الكتاب',
            type: 'select',
            column: 1, row: 2,
            options: bookConstantsArray,
            disabled: true
        }, {
            name: 'copies',
            label: 'عدد النسخ',
            value: 1,
            column: 2, row: 2,
            validation: Yup.number()
                .min(1, '1 اقل قيمه')
                .max(500, 'اقصى قيمه هى 500')
                .required("مطلوب"),
        }, {
            name: 'price',
            label: 'السعر',
            type: 'number',
            column: 1, row: 3,
            validation: Yup.number()
                .min(0, '0 اقل قيمه')
                .max(200, 'اقصى قيمه هى 200')
                .required("مطلوب"),
        }, {
            name: 'discount',
            label: 'السعر قبل الخصم',
            type: 'number',
            column: 1, row: 3,
            validation: Yup.number()
                .nullable() // Allow null or undefined
                .when('price', (price, schema) => {
                    return price
                        ? schema.min(price, 'يجب ان يكون اكبر من السعر الفعلى')
                        : schema // No validation if price is not provided
                }
                )
        },
        {
            name: 'isActive',
            label: 'الحاله',
            type: 'switch',
            column: 2, row: 3,
            value: true
        }, {
            name: 'avatar',
            label: 'صوره الملف',
            type: 'file',
            width: '100%',
            validation: imageValidation
        },  {
            name: 'file',
            label: 'الملف',
            type: 'file',
            width: '100%',
            validation: Yup.mixed().nullable()
                .test(pdfTypeValid)
                .test(pdfSizeValid),
        }, {
            name: 'url',
            label: 'لينك الملف',
            type: 'url',
            player: 'google',
            validation: Yup.string()
                .nullable()
                .url('رابط غير صالح')
                .test(
                    'file-or-link-required',
                    'يجب اختيار ملف أو إدخال رابط',
                    function (value) {
                        // value = this field's own value (the url string)
                        // this.parent = the sibling fields on the same object level
                        return Boolean(value) || Boolean(this.parent?.file)
                    }
                )
        },
    ]

    const modifiedInputs = book.type === bookConstants.PHYSICAL ? inputs.filter(i => !notAllowed.includes(i.name)) : inputs
    return (
        <div>
            <MakeForm inputs={modifiedInputs} preValue={book} onSubmit={onSubmit} status={status} />
        </div>
    )
}

export default BookForm