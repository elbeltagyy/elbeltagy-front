import { useState } from 'react'
import { useDeleteNotificationMutation, useLazyGetNotificationsQuery, useUpdateNotificationMutation } from '../../toolkit/apis/notificationsApi'
import TitleWithDividers from '../ui/TitleWithDividers'
import { Box } from '@mui/material'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import TabInfo from '../ui/TabInfo'
import { getFullDate } from '../../settings/constants/dateConstants'
import { FilledHoverBtn } from '../../style/buttonsStyles'

import NotificationsForm from '../notifications/NotificationsForm'
import useLazyGetData from '../../hooks/useLazyGetData'
import usePostData from '../../hooks/usePostData'
import BtnModal from '../ui/BtnModal'

function UserNotifications({ user }) {

    const [getData, status] = useLazyGetNotificationsQuery()
    const [getUserNotifications] = useLazyGetData(getData)

    const [isReset, setIsReset] = useState(false)

    const resetFc = () => {
        setIsReset(!isReset)
    }

    const columns = [
        {
            field: 'isSeen',
            headerName: "seen",
            width: 170,
            type: 'boolean',
            editable: true
        },
        {
            field: "subject",
            headerName: 'عنوان الرساله',
            editable: true

        }, {
            field: "message",
            headerName: 'الرساله',
            width: 500,
            editable: true
        }, {
            field: 'createdAt',
            headerName: 'تاريخ الارسال',
            width: 200,
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.createdAt)} i={1} />
            }
        },
    ]

    const fetchFc = async (params) => {
        const res = await getUserNotifications({ ...params, user: user._id })
        return { values: res.notifications, count: res.count }
    }

    const [sendUpdate, updateStatus] = useUpdateNotificationMutation()
    const [updateNotification] = usePostData(sendUpdate)

    const updateFc = async (values) => {
        const res = await updateNotification(values)
        return res
    }

    const [sendDelete, deleteStatus] = useDeleteNotificationMutation()
    const [deleteNotification] = usePostData(sendDelete)

    const deleteFc = async (id) => {
        const res = await deleteNotification({ id })
        return res
    }

    return (
        <Box sx={{ width: '100%' }}>
            <TitleWithDividers title={'اشعارات الطالب'} />

            <BtnModal
                btn={<FilledHoverBtn>ارسال اشعار</FilledHoverBtn>}
                component={<NotificationsForm user={user} resetFc={resetFc} />}
            />

            <Box sx={{ width: '100%' }}>
                <MeDatagrid
                    type={'crud'}
                    columns={columns}
                    fetchFc={fetchFc} updateFc={updateFc} deleteFc={deleteFc} reset={isReset}
                    loading={status.isLoading || updateStatus.isLoading || deleteStatus.isLoading || false}
                    editing={
                        {
                            bgcolor: 'background.alt',
                            showSlots: ["density", "filter", "columns", "export"],
                            autoHeight: true
                        }
                    }
                />
            </Box>
        </Box>
    )
}

export default UserNotifications
