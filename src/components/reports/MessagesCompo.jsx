import { useState } from "react"
import usePostData from "../../hooks/usePostData"
import { lang } from "../../settings/constants/arlang"
import { user_roles } from "../../settings/constants/roles"
import senderConstants from "../../settings/constants/senderConstants"
import { useSendToManyMutation } from "../../toolkit/apis/notificationsApi"
import MakeForm from "../../tools/makeform/MakeForm"
import GetWhatsStatus from "../whatsapp/GetWhatsStatus"
import * as yup from 'yup'

const MessagesCompo = ({ course, excludedUsers, isExcluded, modalInfo }) => {
    const [whatsStatus, setWhatsStatus] = useState(false)

    const [sendData, status] = useSendToManyMutation()
    const [createReport] = usePostData(sendData)

    const trigger = async (values) => {
        const params = { ...values, excludedUsers, isExcluded } //, isExcluded
        if (course) {
            params.course = course
        }
        await createReport(params)
    }
    const inputs = [
        {
            name: 'message',
            label: 'الرساله المراد ارسالها',
            rows: 4,
            validation: yup.string().required(),
        }, {
            name: 'method',
            label: 'طريقه الارسال',
            type: 'select',
            options: [senderConstants.WHATSAPP, senderConstants.FAMILY_WHATSAPP],
            disabledValues: !whatsStatus ? [senderConstants.WHATSAPP, senderConstants.FAMILY_WHATSAPP] : [],
            value: senderConstants.FAMILY_WHATSAPP,
            disabled: !whatsStatus,
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

    //get many numbers to send
    //in Backend 
    return <>
        <GetWhatsStatus setWhatsStatus={setWhatsStatus} />
        <MakeForm modalInfo={modalInfo} inputs={inputs} status={status} onSubmit={trigger} disabledBtn={!whatsStatus} />
    </>
}

export default MessagesCompo
