import * as Yup from 'yup'
import { lang } from '../../settings/constants/arlang'
import Section from '../../style/mui/styled/Section'
import MakeForm from '../../tools/makeform/MakeForm'
import { useCreateNotificationMutation } from '../../toolkit/apis/notificationsApi'
import usePostData from '../../hooks/usePostData'
import senderConstants from '../../settings/constants/senderConstants'
import GetWhatsStatus from '../whatsapp/GetWhatsStatus'
import TitleWithDividers from '../ui/TitleWithDividers'
import { useState } from 'react'

function NotificationsForm({ setNotifications, resetFc, user }) {

    const [sendData, status] = useCreateNotificationMutation()
    const [createNotification] = usePostData(sendData)
    const [whatsStatus, setWhatsStatus] = useState(false)

    const inputs = [
        {
            name: 'user',
            label: '',
            hidden: true,
            disabled: true,
            value: user._id,
            validation: Yup.string().required(lang.REQUERIED)
        }, {
            name: 'subject',
            label: 'الموضوع',
            validation: Yup.string().required(lang.REQUERIED)
        }, {
            name: 'message',
            label: 'الرساله',
            validation: Yup.string().required(lang.REQUERIED)
        }, {
            name: 'method',
            label: 'طريقه الارسال',
            type: 'select',
            options: Object.values(senderConstants),
            disabledValues: !whatsStatus ? [senderConstants.WHATSAPP, senderConstants.REPORT_USER_WHATSAPP, senderConstants.FAMILY_WHATSAPP, senderConstants.REPORT_FAMILY_WHATSAPP] : [],
            value: senderConstants.CONTACT
        }, {
            name: 'isSkip',
            label: 'عدم حفظ الرساله',
            type: 'switch',
            value: false
        },
    ]

    const onSubmit = async (values, props) => {
        const res = await createNotification(values)
        if (setNotifications) {
            setNotifications(pre => {
                return [...pre, res]
            })
        }
        if (resetFc) {
            resetFc()
        }
        // props.resetForm()
    }

    return (
        <Section>
            <TitleWithDividers title={'ارسال اشعار'} />
            <GetWhatsStatus setWhatsStatus={setWhatsStatus} />
            <MakeForm inputs={inputs} btnWidth={'100%'} status={status} onSubmit={onSubmit} />
        </Section>
    )
}

export default NotificationsForm
