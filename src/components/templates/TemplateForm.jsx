import { Stack } from "@mui/material";
import MakeForm from "../../tools/makeform/MakeForm"
import TitleWithDividers from "../ui/TitleWithDividers";
import { CATEGORIES } from "./categories";

import * as yup from 'yup'

function TemplateForm({ template = {}, status, onSubmit }) {

    const inputs = [
        {
            name: 'category',
            label: 'نوع السؤال', type: 'select',
            options: CATEGORIES.filter(c => c.value !== 'all'),
            validation: yup.string().required()
        },
        {
            name: 'question',
            label: 'السؤال', rows: 2,
            placeholder: 'كيف يمكنني اعاده ضبط كلمة السر ؟',
            validation: yup.string().required()
        },
        { name: 'answer', label: 'الاجابه', rows: 4, placeholder: 'ادخل علي نسيت كلمة السر فى صفحه تسجيل الدخول', validation: yup.string().required() },
        // { name: 'isActive', label: 'فعال للطلاب', type: 'switch', value: false },
    ]

    return (
        <Stack>
            <TitleWithDividers title={'انشاء سؤال جديد'} />
            <MakeForm inputs={inputs} preValue={template} status={status} onSubmit={onSubmit} />
        </Stack>
    )
}

export default TemplateForm