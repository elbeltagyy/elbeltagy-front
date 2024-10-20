import { Badge, Box, IconButton, Menu, MenuItem, styled, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useGetUsersNotificationsCountQuery } from '../../toolkit/apis/statisticsApi';
import Loader from "../../style/mui/loaders/Loader"
import { useLazyGetNotificationsQuery, useLazyMakeSeenQuery, useUpdateNotificationMutation } from '../../toolkit/apis/notificationsApi';
import useLazyGetData from "../../hooks/useLazyGetData"
import usePostData from "../../hooks/usePostData"
import { FlexColumn } from '../../style/mui/styled/Flexbox';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));


function Notifications({ user }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const { data, isLoading, refetch } = useGetUsersNotificationsCountQuery({ user: user._id, isSeen: false })
    const [notificationsNums, setNums] = useState(0)

    const [notifications, setNotifications] = useState([])
    const [getData, status] = useLazyGetNotificationsQuery()
    const [getNotifications] = useLazyGetData(getData)

    const [makeSeen] = useLazyMakeSeenQuery()

    useEffect(() => {
        if (data?.values) {
            setNums(data?.values?.count)
        }
    }, [data])

    useEffect(() => {
        const trigger = async () => {
            const res = await getNotifications({ user: user._id })
            setNotifications(res.notifications)
        }

        if (notifications.length === 0 && open) {
            trigger()
        }
    }, [open])

    const handleClose = async () => {
        setAnchorEl(null)
        setNums(0)
        if (data?.values?.count !== 0) {
            await makeSeen({ user: user._id })
            await refetch()
        }
    };

    return (
        <div>
            <IconButton
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <StyledBadge badgeContent={notificationsNums} color="error" max={999}>
                    {isLoading ? <Loader /> : <NotificationsIcon sx={{
                        color: 'primary.main'
                    }} />}
                </StyledBadge>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{
                    maxHeight: '70vh'
                }}
            >
                {status.isLoading && (
                    <Loader />
                )}
                {notifications.length === 0 && status.isSuccess && (
                    <FlexColumn sx={{ p: '12px' }}>
                        <Typography variant='subtitle1'>لا يوجد اشعارات</Typography>
                    </FlexColumn>
                )}
                {notifications.map((notification, i) => {
                    return <Box p={'12px'} key={i}>
                        <FlexColumn key={i} sx={{ alignItems: 'flex-start' }}>
                            <Typography variant='subtitle1'>{notification.subject} </Typography>
                            <Typography variant='subtitle2'>{notification.message}</Typography>
                        </FlexColumn>
                    </Box>
                })}
            </Menu>
        </div >
    )
}

export default Notifications
