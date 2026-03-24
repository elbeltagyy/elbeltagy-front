import * as Yup from 'yup'
import { lang } from '../../settings/constants/arlang'
import Section from '../../style/mui/styled/Section'
import MakeForm from '../../tools/makeform/MakeForm'
import { useCreateNotificationMutation, useSendToManyMutation } from '../../toolkit/apis/notificationsApi'
import senderConstants, { notificationMethods } from '../../settings/constants/senderConstants'
import GetWhatsStatus from '../whatsapp/GetWhatsStatus'
import TitleWithDividers from '../ui/TitleWithDividers'
import { memo, useState } from 'react'

import { Box } from '@mui/material'

function NotificationsForm({ setNotifications, resetFc, user, users = [], matches, isExcluded = false }) {

    // const [sendData, status] = useCreateNotificationMutation()
    const [sendData, status] = useSendToManyMutation()
    // const [createNotification] = usePostData(sendData) //make auto close to btn Modal
    const [whatsStatus, setWhatsStatus] = useState(false)

    const inputs = [
        {
            name: 'subject',
            label: 'الموضوع',
            validation: Yup.string().required(lang.REQUERIED)
        }, {
            name: 'message',
            label: 'الرساله المراد ارسالها',
            validation: Yup.string().required(lang.REQUERIED),
            rows: 5,
            helperText: '*خط ثقيل* - _خط مائل_ - ~خط منصف~ '
        }, {
            name: 'method',
            label: 'طريقه الارسال',
            type: 'select',
            options: notificationMethods,
            disabledValues: !whatsStatus ?
                [senderConstants.WHATSAPP, senderConstants.REPORT_USER_WHATSAPP, senderConstants.FAMILY_WHATSAPP, senderConstants.REPORT_FAMILY_WHATSAPP]
                : [],
            value: senderConstants.CONTACT
        },
        {
            name: 'users',
            label: '',
            hidden: true,
            disabled: true,
            value: user?._id ? [user?._id, ...users] : users
        },
    ]

    const onSubmit = async (values) => {
        // console.log({ ...matches, ...values })
        // user => only send to this
        //Users = ExcludedUsers
        // match => isExcluded = true
        // console.log({ ...matches, ...values, isExcluded })
        const res = await sendData({ ...matches, ...values, isExcluded })
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
        <Box>
            <TitleWithDividers title={'ارسال اشعار :' + (users?.length ? ('الي ' + users.length + ' ' + 'مستخدمين') : (user ? user?.name : ''))} desc={user?.userName && 'اسم المستخدم : ' + user?.userName} />
            <GetWhatsStatus setWhatsStatus={setWhatsStatus} />
            <MakeForm inputs={inputs} btnWidth={'100%'} status={status} onSubmit={onSubmit} />
        </Box>
    )
}

export default memo(NotificationsForm)
