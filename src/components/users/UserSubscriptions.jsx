import { useEffect, useState } from 'react'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import { lang } from '../../settings/constants/arlang'
import { Avatar, Box } from '@mui/material'
import TabInfo from '../ui/TabInfo'
import { getDateWithTime, getFullDate } from '../../settings/constants/dateConstants'
import { useLazyGetCourseSubscriptionsQuery } from '../../toolkit/apis/userCoursesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import TitleWithDividers from '../ui/TitleWithDividers'


const exportObj = {
    createdAt: (row) => {
        return getDateWithTime(row.createdAt)
    },
    updatedAt: (row) => {
        return getDateWithTime(row.updatedAt)
    },
}

function UserSubscriptions({ user }) {

    const [getData, status] = useLazyGetCourseSubscriptionsQuery()
    const [getSubscriptions] = useLazyGetData(getData)

    const [subscriptionsCount, setSubscriptionsCount] = useState('loading ...')
    const [row, setRow] = useState([])

    const fetchFc = async (params) => {
        const res = await getSubscriptions({ ...params, user: user._id, populate: 'course' }, false)

        const modifiedRes = res.subscriptions.map((subscribe) => {
            return { ...subscribe.course, courseName: subscribe.course?.name, _id: subscribe._id, createdAt: subscribe.createdAt, currentIndex: subscribe.currentIndex, updatedAt: subscribe.updatedAt }
        })
        setSubscriptionsCount(res.count)
        const data = { values: modifiedRes, count: res.count }
        setRow(data.values)
        // return data
    }

    useEffect(() => {
        fetchFc()
    }, [user])

    const columns = [
        {
            field: "thumbnail",
            headerName: lang.IMAGE,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Avatar alt={params.row?.name?.toUpperCase() || 'E'} src={params.row?.thumbnail?.url || "#"}
                        sx={{
                            objectFit: 'contain',
                            bgcolor: 'primary.main',
                            fontWeight: 600,
                            color: 'grey.0'
                        }} />
                )
            }
        },
        {
            field: 'courseName',
            headerName: 'اسم الكورس',
            width: 300
        }, {
            field: 'currentIndex',
            headerName: 'اخر محاضره',
            renderCell: (params) => {
                return (
                    <Box>
                        <TabInfo count={params.row.currentIndex} i={1} />
                    </Box>
                )
            }
        }, {
            field: 'createdAt',
            headerName: 'تاريخ الاشتراك',
            width: 200,
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.createdAt)} i={1} />
            }
        }, {
            field: 'updatedAt',
            headerName: 'تاريخ اخر محاضره تم انهائها',
            width: 200,
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.createdAt)} i={2} />
            }
        },
    ]

    return (
        <Box width={'100%'}>
            <TitleWithDividers title={'الكورسات المشترك فيها '} />
            <TabInfo count={subscriptionsCount} title={'عدد الاشتراكات'} i={1} />
            <MeDatagrid
                type={'simple'}
                exportObj={exportObj}
                exportTitle={'الكورسات المشترك فيها ' + ' ' + user.name + (` (${user.userName})`)}

                columns={columns} data={row} loading={status.isLoading}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true,
                        isPdf: true, maxHeight: '100vh'
                    }
                }
            />
        </Box>
    )
}

export default UserSubscriptions
