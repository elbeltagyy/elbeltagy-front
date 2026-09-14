import MakeForm from "../../tools/makeform/MakeForm"
import * as Yup from 'yup'
import Courses from "../all/Courses"

function ApplicationForm({ application = {}, onSubmit, status, courses, setCourses }) {

    const inputs = [
        // {
        //     name: 'grade',
        //     value: application.grade,
        //     validation: Yup.number()
        //         .required(),
        //     disabled: true, hidden: true
        // }, 
        {
            name: 'title',
            label: 'اسم الاستماره',
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
            name: 'numbers',
            label: 'العدد المسموح به للاستخدام',
            value: 1,
            column: 1, row: 2,
            validation: Yup.number()
                .min(1, '1 اقل قيمه')
                .max(500, 'اقصى قيمه هى 500')
                .required("مطلوب"),
        },
        // {
        //     name: 'discount',
        //     label: 'السعر قبل الخصم',
        //     type: 'number',
        //     column: 1, row: 3,
        //     validation: Yup.number()
        //         .nullable() // Allow null or undefined
        //         .when('price', (price, schema) => {
        //             return price
        //                 ? schema.min(price, 'يجب ان يكون اكبر من السعر الفعلى')
        //                 : schema // No validation if price is not provided
        //         }
        //         )
        // },
        {
            name: 'isActive',
            label: 'الحاله',
            type: 'switch',
            column: 2, row: 3,
            value: true
        },
    ]

    return (
        <div>
            <MakeForm inputs={inputs} preValue={application} onSubmit={onSubmit} status={status} allowDirty={false} />
            <Courses selections={courses} setSelection={setCourses} />
        </div>
    )
}

export default ApplicationForm