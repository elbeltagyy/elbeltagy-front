import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import gradeConstants from '../../settings/constants/gradeConstants'
import MakeForm from '../../tools/makeform/MakeForm'
import { lang } from '../../settings/constants/arlang'
import usePostData from '../../hooks/usePostData'
import { useCreateReportMutation } from '../../toolkit/apis/reportsApi'
import { user_roles } from '../../settings/constants/roles'

const ReportCompo = ({ course, excludedUsers, isExcluded }) => {
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
        },
    ]
    const [sendData, status] = useCreateReportMutation()
    const [createReport] = usePostData(sendData)

    const trigger = async (values) => {
        const params = { ...values, excludedUsers, isExcluded }
        if (course) {
            params.course = course
        }
        await createReport(params)
    }

    if (!course) {
        inputs.push({
            name: 'grade',
            label: lang.GRADE,
            type: 'select',
            options: makeArrWithValueAndLabel(gradeConstants, { value: 'index', label: 'name' }),
        })
    }
    return <MakeForm inputs={inputs} onSubmit={trigger} status={status} />
}

export default ReportCompo
