import { useState } from 'react'
import useLazyGetData from '../../hooks/useLazyGetData'
import { lang } from '../../settings/constants/arlang'
import { Alert, Box, Button, Typography } from '@mui/material'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import TabInfo from '../../components/ui/TabInfo'
import { formatDuration, getDateWithTime, getFullDate } from '../../settings/constants/dateConstants'
import Section from '../../style/mui/styled/Section'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import usePostData from '../../hooks/usePostData'
import gradeConstants from '../../settings/constants/gradeConstants'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import { useDeleteViewMutation, useLazyGetViewsQuery, useUpdateViewMutation } from '../../toolkit/apis/videosStatisticsApi'
import Separator from '../ui/Separator'
import TitleWithDividers from '../ui/TitleWithDividers'
import DataWith3Items from '../ui/DataWith3Items'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import UserAvatar from '../users/UserAvatar'
import { user_roles } from '../../settings/constants/roles'

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
    watchedTime: (row) => {
        return formatDuration(row.watchedTime, true, true)
    },
    totalTime: (row) => {
        return formatDuration(row.totalTime, true, true)
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


function GetViewsCompo({ lectureId, courseId, role, refetchViews, userId }) {

    const [viewsCount, setViewsCount] = useState('')

    const [getData, status] = useLazyGetViewsQuery()
    const [getViews] = useLazyGetData(getData)

    //removing subscription
    const [sendData, { isLoading }] = useDeleteViewMutation()
    const [deleteView] = usePostData(sendData)
    const removeFc = async (id) => {
        await deleteView({ _id: id })
    }

    const [sendUpdate, updateStatus] = useUpdateViewMutation()
    // const [updateView] = usePostData(sendUpdate)

    // const updateFc = async (data) => {
    //     await updateView({ id: data._id, currentIndex: data.currentIndex })
    //     return data
    // }

    const fetchFc = async (params) => {
        params = {
            ...params,
            lecture: lectureId, populate: 'user course lecture video', user: userId //*_* view_role
        }
        if (role) {
            params.role = role
        }
        if (courseId) {
            params.course = courseId
        }
        const res = await getViews(params, false)
        const modifiedRes = res.views.map((view) => {
            return {
                ...view,
                avatar: view.user?.avatar, name: view.user?.name, userName: view.user?.userName, isActive: view.user?.isActive, phone: view.user?.phone, familyPhone: view.user?.familyPhone, grade: view.user?.grade,
                courseId: view.course?._id,
                courseName: view.course?.name || 'غير مشترك', price: view.course?.price,
                lectureName: view.lecture?.name,
                duration: view.video?.duration
            }
        })

        setViewsCount(res.count)
        if (refetchViews) {
            refetchViews()
        }
        const data = { values: modifiedRes, count: res.count }
        return data
    }

    const [events, setEvents] = useState([])
    const [isShowEvents, setShowEvents] = useState(false)
    const [userInEvent, setUserInEvent] = useState(false)

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
            field: 'name',
            headerName: lang.NAME,
            width: 200,
            sortable: false,
        }, {
            field: 'userName',
            headerName: lang.USERNAME,
            width: 150,
            sortable: false,

        }, {
            field: 'role',
            headerName: lang.ROLE,
            width: 150,
            type: 'singleSelect',
            valueOptions: [user_roles.ONLINE, user_roles.STUDENT, user_roles.INREVIEW],
            sortable: role ? false : true,
            filterable: role ? false : true,
        },
        {
            field: 'lectureName',
            headerName: 'المحاضره',
            width: 200,
            sortable: false,
            // filterable:  true,
        }, {
            field: 'watchedTime',
            headerName: 'الوقت الفعلى للمشاهده',
            type: 'number',
            renderCell: (params) => {
                return <TabInfo count={formatDuration(params.row.watchedTime, true, true)} i={1} />
            }
        }, {
            field: 'totalTime',
            headerName: 'الوقت الاجمالى',
            type: 'number',
            renderCell: (params) => {
                return <TabInfo count={formatDuration(params.row.totalTime, true, true)} i={2} />
            }
        }, {
            field: 'duration',
            headerName: 'وقت الفيديو',
            renderCell: (params) => {
                return <TabInfo count={params.row.duration} i={3} />
            },
            sortable: false,

        }, {
            field: 'events',
            headerName: 'عرض الاحداث',
            renderCell: (params) => {
                return <Button onClick={() => {
                    setEvents(params.row.mainEvents || [])
                    setUserInEvent({
                        userName: params.row.userName,
                        name: params.row.name,
                        avatar: params.row.avatar
                    })
                    setShowEvents(true)
                }} size='small' variant='contained'>عرض </Button>
            },
            disableExport: true,
            sortable: false,
            filterable: false,
        }, {
            field: 'createdAt',
            headerName: 'تاريخ المشاهده',
            type: 'date',
            width: 200,
            valueGetter: (params) => new Date(params),
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.createdAt)} i={1} />
            },
        }, {
            field: 'courseName',
            headerName: 'الكورس المشترك فيه',
            width: 300,
            sortable: false,
        }, {
            field: 'isActive',
            headerName: lang.IS_ACTIVE,
            type: "boolean",
            renderCell: (params) => {
                return (
                    <Box>
                        {params.row.isActive ? <TabInfo count={lang.ACTIVE} i={1} />
                            : <TabInfo count={lang.NOT_ACTIVE} i={3} />}
                    </Box>
                )
            },
            sortable: false,
            filterable: false,
        }, {
            field: 'phone',
            headerName: lang.PHONE,
            width: 200,
            sortable: false,
        }, {
            field: 'familyPhone',
            headerName: lang.FAMILY_PHONE,
            width: 200,
            sortable: false,
        }, {
            field: "grade",
            headerName: lang.GRADE,
            type: 'singleSelect',
            width: 200,
            filterable: false,
            sortable: false,
            valueOptions: makeArrWithValueAndLabel(gradeConstants, { value: 'index', label: 'name' }),
        }, {
            field: 'price',
            headerName: 'سعر الكورس الحالى',
            sortable: false,
            width: 200,
            renderCell: (params) => {
                return <TabInfo count={((params.row.price || params.row.price === 0) ? params.row.price + ' جنيه' : 'غير مشترك')} i={0} />
            }
        }, {
            field: 'updatedAt',
            headerName: 'تاريخ انتهاء المشاهده',
            type: 'date',
            width: 200,
            valueGetter: (params) => new Date(params),
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.updatedAt)} i={2} />
            },
        },
    ]


    return (
        <Section>
            <TabInfo count={viewsCount} title={'عدد المشاهدات'} i={1} />
            <MeDatagrid
                type={'crud'}
                exportObj={exportObj} exportTitle={'تفاصيل المشاهدات'}
                columns={columns}
                loading={status.isLoading || updateStatus.isLoading || isLoading}
                fetchFc={fetchFc} reset={[courseId, window.location.href]} deleteFc={removeFc} //updateFc={updateFc} 
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true, isPdf: true
                    }
                }
            />
            <ModalStyled open={isShowEvents} setOpen={setShowEvents} >
                <Section>
                    <TabInfo count={'عدد الاحداث ' + " " + events.length + " " + "حدث"} i={1} />
                    <Separator />
                    <TitleWithDividers title={'تفاصيل المشاهده للطالب' + ' : ' + userInEvent.name} avatar={userInEvent.avatar} />
                    {events.length !== 0 ? (
                        <FlexColumn gap={'12px'}>
                            {events.map((event, i) => {
                                const desc = <>
                                    <TabInfo count={event.startTime + ' : ' + event.endTime + '  '} i={1} />
                                    <span style={{
                                        margin: '0 6px'
                                    }}>
                                        لمده
                                    </span>
                                    <span>
                                        <TabInfo count={formatDuration(event.watchedTime, true, true)} i={1} />
                                    </span>
                                    <span style={{
                                        margin: '0 6px'
                                    }}>
                                        تغيير فى السرعه الي  {event.speed}X
                                    </span>
                                </>
                                return (
                                    <DataWith3Items key={i}
                                        title={<TabInfo count={getDateWithTime(event.date)} i={2} />}
                                        desc={desc}
                                        src={event?.avatar?.url || false}
                                        icon={i + 1}
                                    />
                                )
                            })}
                        </FlexColumn>
                    ) : (
                        <Alert variant='filled' severity='warning'>لم يتم المشاهده حتى الان !</Alert>
                    )}
                </Section>
            </ModalStyled>
        </Section>
    )
}

export default GetViewsCompo
