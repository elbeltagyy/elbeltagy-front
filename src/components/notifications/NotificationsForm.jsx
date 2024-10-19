import React from 'react'
import * as Yup from 'yup'
import { lang } from '../../settings/constants/arlang'
import Section from '../../style/mui/styled/Section'
import MakeForm from '../../tools/makeform/MakeForm'
import { useCreateNotificationMutation } from '../../toolkit/apis/notificationsApi'
import usePostData from '../../hooks/usePostData'

function NotificationsForm({ setNotifications, resetFc, user }) {

    const [sendData, status] = useCreateNotificationMutation()
    const [createNotification] = usePostData(sendData)

    const inputs = [
        {
            name: 'user',
            label: '',
            hidden: true,
            disabled: true,
            value: user._id,
            // icon: <MdOutlineDriveFileRenameOutline color='green' />,
            validation: Yup.string().required(lang.REQUERIED)
        }, {
            name: 'subject',
            label: 'الموضوع',
            // icon: <MdOutlineDriveFileRenameOutline color='green' />,
            validation: Yup.string().required(lang.REQUERIED)
        }, {
            name: 'message',
            label: 'الرساله',
            // icon: <MdOutlineDriveFileRenameOutline color='green' />,
            validation: Yup.string().required(lang.REQUERIED)
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
        props.resetForm()
    }

    return (
        <Section>
            <MakeForm inputs={inputs} btnWidth={'100%'} status={status} onSubmit={onSubmit} />
        </Section>
    )
}

export default NotificationsForm
