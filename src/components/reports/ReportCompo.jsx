import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'

import MakeForm from '../../tools/makeform/MakeForm'
import { lang } from '../../settings/constants/arlang'
import usePostData from '../../hooks/usePostData'
import { useCreateReportMutation } from '../../toolkit/apis/reportsApi'
import { user_roles } from '../../settings/constants/roles'
import * as yup from 'yup'
import useGrades from '../../hooks/useGrades'


const ReportCompo = ({ course, excludedUsers, modalInfo }) => {
    const { grades } = useGrades()

    const inputs = [
        {
            name: 'title',
            label: 'اسم التقرير',
        }, {
            name: 'description',
            label: 'وصف التقرير',
        }, {
            name: 'startDate',
            label: 'المحاضرات من تاريخ',
            type: 'fullDate',
            width: '48%',
            helperText: 'اذا تم وضع تاريخ بدايه فانه يقوم باضافه المحاضرات التي تمت بعد هذا التاريخ',
        }, {
            name: 'endDate',
            label: 'الي',
            type: 'fullDate',
            width: '48%',
        }, {
            name: 'role',
            label: lang.ROLE,
            type: 'select',
            options: [user_roles.ONLINE, user_roles.STUDENT],
        }, {
            name: 'isActive',
            label: 'ارسال للطلاب الفعالين فقط',
            type: 'switch',
            value: true,
        }
    ]
    const [sendData, status] = useCreateReportMutation()
    const [createReport] = usePostData(sendData)

    const trigger = async (values) => {
        const params = { ...values, excludedUsers }
        if (course) {
            params.course = course
        }
        // console.log(params)
        await createReport(params)
    }

    if (!course) {
        inputs.push({
            name: 'grade',
            label: lang.GRADE,
            type: 'select',
            options: makeArrWithValueAndLabel(grades, { value: 'index', label: 'name' }),
        })
    }
    return <MakeForm modalInfo={modalInfo} inputs={inputs} onSubmit={trigger} status={status} />
}

export default ReportCompo
