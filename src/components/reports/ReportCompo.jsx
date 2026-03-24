import MakeForm from '../../tools/makeform/MakeForm'
import usePostData from '../../hooks/usePostData'
import { useCreateReportMutation } from '../../toolkit/apis/reportsApi'
import senderConstants, { notificationMethods } from '../../settings/constants/senderConstants'
import { useState } from 'react'
import { FlexRow } from '../../style/mui/styled/Flexbox'
import GetWhatsStatus from '../whatsapp/GetWhatsStatus'


const ReportCompo = ({ course, excludedUsers, modalInfo, isExcluded, matches }) => {
    const [whatsStatus, setWhatsStatus] = useState(false)

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
            name: 'method',
            label: 'ارسال الي',
            type: 'select',
            options: notificationMethods.filter(n => n.report),
            disabledValues: !whatsStatus ?
                [senderConstants.WHATSAPP, senderConstants.REPORT_USER_WHATSAPP, senderConstants.FAMILY_WHATSAPP, senderConstants.REPORT_FAMILY_WHATSAPP]
                : [],
            value: whatsStatus ? senderConstants.REPORT_FAMILY_WHATSAPP : '',
            disabled: !whatsStatus
        },
    ]
    const [sendData, status] = useCreateReportMutation()
    const [createReport] = usePostData(sendData)

    const trigger = async (values) => {
        const params = { ...values, excludedUsers, isExcluded, ...matches }
        if (course) {
            params.course = course
        }
        // console.log(params)
        await createReport(params)
    }
    return <FlexRow flexDirection={'column'}>
        <GetWhatsStatus setWhatsStatus={setWhatsStatus} />
        <MakeForm modalInfo={modalInfo} inputs={inputs} onSubmit={trigger} status={status} />
    </FlexRow>
}

export default ReportCompo
