import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'

import MakeForm from '../../tools/makeform/MakeForm'
import { lang } from '../../settings/constants/arlang'
import usePostData from '../../hooks/usePostData'
import { useCreateReportMutation } from '../../toolkit/apis/reportsApi'
import { user_roles } from '../../settings/constants/roles'
import * as yup from 'yup'
import useGrades from '../../hooks/useGrades'
const ReportCompo = ({ course, excludedUsers }) => {
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
            label: 'من',
            type: 'fullDate'
        }, {
            name: 'endDate',
            label: 'الي',
            type: 'fullDate'
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
        }, {
            name: 'isExcluded',
            label: 'هل تريد الارسال الي الطلاب المختارين ام استبعادهم',
            type: 'select',
            options: [{ value: true, label: 'استبعاد الطلاب' }, { value: false, label: 'الارسال الي الطلاب المختارين فقط' }],
            validation: yup.boolean().required()
        },
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
    return <MakeForm inputs={inputs} onSubmit={trigger} status={status} />
}

export default ReportCompo
