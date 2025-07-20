import { useState } from "react"
import usePostData from "../../hooks/usePostData"
import { lang } from "../../settings/constants/arlang"
import { user_roles } from "../../settings/constants/roles"
import senderConstants from "../../settings/constants/senderConstants"
import { useSendToManyMutation } from "../../toolkit/apis/notificationsApi"
import MakeForm from "../../tools/makeform/MakeForm"
import GetWhatsStatus from "../whatsapp/GetWhatsStatus"
import * as yup from 'yup'

const MessagesCompo = ({ course, excludedUsers, isExcluded }) => {
    const [whatsStatus, setWhatsStatus] = useState(false)

    const [sendData, status] = useSendToManyMutation()
    const [createReport] = usePostData(sendData)

    const trigger = async (values) => {
        const params = { ...values, excludedUsers } //, isExcluded
        if (course) {
            params.course = course
        }
        await createReport(params)
    }
    const inputs = [
        {
            name: 'message',
            label: 'الرساله المراد ارسالها',
            rows: 4
        }, {
            name: 'method',
            label: 'طريقه الارسال',
            type: 'select',
            options: [senderConstants.WHATSAPP, senderConstants.FAMILY_WHATSAPP],
            disabledValues: !whatsStatus ? [senderConstants.WHATSAPP, senderConstants.FAMILY_WHATSAPP] : [],
            value: senderConstants.FAMILY_WHATSAPP,
            disabled: !whatsStatus
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
    return <>
        <GetWhatsStatus setWhatsStatus={setWhatsStatus} />
        <MakeForm inputs={inputs} status={status} onSubmit={trigger} disabledBtn={!whatsStatus} />
    </>
}

export default MessagesCompo
