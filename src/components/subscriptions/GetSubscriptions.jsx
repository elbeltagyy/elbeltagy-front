import { useState } from 'react'
import { useDeleteSubscriptionMutation, useLazyGetCourseSubscriptionsQuery, useUpdateSubscriptionMutation } from '../../toolkit/apis/userCoursesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import { lang } from '../../settings/constants/arlang'
import { Box, Button, Typography } from '@mui/material'

import TabInfo from '../../components/ui/TabInfo'
import { getDateWithTime, getFullDate } from '../../settings/constants/dateConstants'
import Section from '../../style/mui/styled/Section'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import usePostData from '../../hooks/usePostData'
import gradeConstants from '../../settings/constants/gradeConstants'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import { Link } from 'react-router-dom'
import UserAvatar from '../users/UserAvatar'
import TitleWithDividers from '../ui/TitleWithDividers'
import { useLazyAnalysisSubscriptionsQuery } from '../../toolkit/apis/statisticsApi'
import DynamicBarChart from '../../tools/charts/BarChart'

const exportObj = {
    grade: (row) => {
        return gradeConstants.find(grade => grade.index === row.grade)?.name
    },
    isActive: (row) => {
        if (row.isActive) {
            return 'فعال'
        } else {
            return 'غير فعال'
        }
    },
    createdAt: (row) => {
        return getDateWithTime(row.createdAt)
    },
    updatedAt: (row) => {
        return getDateWithTime(row.updatedAt)
    },
    payment: (row) => {
        return row.payment + ' جنيه'
    },
    price: (row) => {
        return row.price + ' جنيه'
    },
}


function GetSubscriptions({ courseId = '', user = '', isShowTitle = false, userName }) {

    // const { courseId } = useParams()
    const [subscriptionsCount, setSubscriptionsCount] = useState('loading ...')

    const [getData, status] = useLazyGetCourseSubscriptionsQuery()
    const [getSubscriptions] = useLazyGetData(getData)

    //removing subscription
    const [sendData, { isLoading }] = useDeleteSubscriptionMutation()
    const [deleteSubscription] = usePostData(sendData)
    const removeFc = async (id) => {
        await deleteSubscription({ _id: id })
    }

    const [sendUpdate, updateStatus] = useUpdateSubscriptionMutation()
    const [updateSubscription] = usePostData(sendUpdate)

    const updateFc = async (data) => {
        await updateSubscription({ id: data._id, currentIndex: data.currentIndex })
        return data
    }

    const fetchFc = async (params) => {
        user ? params.user = user : ''

        const res = await getSubscriptions({ ...params, course: courseId, populate: 'user course' }, false)
        const modifiedRes = res.subscriptions.map((subscribe) => {
            return {
                ...subscribe.user,
                courseId: subscribe.course._id,
                courseName: subscribe.course.name, price: subscribe.course.price,
                _id: subscribe._id, createdAt: subscribe.createdAt, currentIndex: subscribe.currentIndex, updatedAt: subscribe.updatedAt, payment: subscribe.payment
            }
        })
        setSubscriptionsCount(res.count)
        const data = { values: modifiedRes, count: res.count }
        return data
    }

    const columns = [
        {
            field: "avatar",
            headerName: lang.IMAGE,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return <UserAvatar user={params.row} />
            }
        },
        {
            field: 'courseName',
            headerName: 'الكورس',
            width: 300,
            // sortable: courseId ? false : true,
            // filterable: courseId ? false : true,
        }, {
            field: 'name',
            headerName: lang.NAME,
            width: 200
        }, {
            field: 'userName',
            headerName: lang.USERNAME,
            width: 150

        }, {
            field: 'currentIndex',
            headerName: 'اخر محاضره',
            editable: true,
            width: 150,
            type: 'number',
            renderCell: (params) => {
                return (
                    <Box>
                        <TabInfo count={params.row.currentIndex} i={1} />
                    </Box>
                )
            }
        }, {
            field: 'isActive',
            headerName: lang.IS_ACTIVE,
            type: "boolean",
            valueGetter: (params) => params.row?.isActive,
            renderCell: (params) => {
                return (
                    <Box>
                        {params.row.isActive ? <TabInfo count={lang.ACTIVE} i={1} />
                            : <TabInfo count={lang.NOT_ACTIVE} i={3} />}
                    </Box>
                )
            }
        }, {
            field: 'phone',
            headerName: lang.PHONE,
            width: 200
        }, {
            field: 'familyPhone',
            headerName: lang.FAMILY_PHONE,
            width: 200
        }, {
            field: 'role',
            headerName: lang.ROLE,
            width: 200,
            filterable: false,
            sortable: false
        }, {
            field: "grade",
            headerName: lang.GRADE,
            type: 'singleSelect',
            width: 200,
            filterable: false,
            valueOptions: makeArrWithValueAndLabel(gradeConstants, { value: 'index', label: 'name' }),
            renderCell: (params) => {
                const grade = gradeConstants.filter(({ index }) => index === params.row.grade)[0]
                return (
                    <Typography>
                        {grade?.name}
                    </Typography>
                )
            }
        }, {
            field: 'payment',
            headerName: 'المبلغ المدفوع',
            width: 200,
            renderCell: (params) => {
                return <TabInfo count={(params.row.payment)} i={0} />
            }
        }, {
            field: 'price',
            headerName: 'سعر الكورس الحالى',
            filterable: false,
            sortable: false,
            width: 200,
            renderCell: (params) => {
                return <TabInfo count={(params.row.price) + ' جنيه'} i={0} />
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
                return <TabInfo count={getFullDate(params.row.updatedAt)} i={2} />
            }
        }, {
            field: 'gotoCourse',
            headerName: 'احصائيات الكورس',
            width: 200,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return <Button disabled={courseId ? true : false} to={`/statistics/courses/${params.row?.courseId}`} component={Link}>
                    احصائيات الكورس
                </Button>
            }
        }
    ]


    const [analysisSubscriptions] = useLazyAnalysisSubscriptionsQuery()
    const [analysisFc] = useLazyGetData(analysisSubscriptions)

    return (
        <Box sx={{ width: '100%' }}>

            {isShowTitle && (
                <TitleWithDividers title={userName || 'الاشتراكات'} desc={userName ? 'اشتراكات الطالب' : ''} />
            )}
            <TabInfo count={subscriptionsCount} title={'عدد الاشتراكات'} i={1} />
            <MeDatagrid
                type={'crud'}
                exportObj={exportObj} exportTitle={'الاشتراكات'} filterParams={{ user }}
                columns={columns} fetchFc={fetchFc} analysisFc={analysisFc}
                updateFc={updateFc} loading={status.isLoading || updateStatus.isLoading || isLoading} deleteFc={removeFc}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true, isPdf: true
                    }
                }
            />
        </Box>
    )
}

export default GetSubscriptions
