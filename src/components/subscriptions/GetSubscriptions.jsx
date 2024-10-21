import React, { useEffect, useState } from 'react'
import { useDeleteSubscriptionMutation, useLazyGetCourseSubscriptionsQuery, useUpdateSubscriptionMutation } from '../../toolkit/apis/userCoursesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import { lang } from '../../settings/constants/arlang'
import { Avatar, Box, Button, Typography } from '@mui/material'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import Image from '../../components/ui/Image'
import TabInfo from '../../components/ui/TabInfo'
import { getDateWithTime, getFullDate } from '../../settings/constants/dateConstants'
import Section from '../../style/mui/styled/Section'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import usePostData from '../../hooks/usePostData'
import gradeConstants from '../../settings/constants/gradeConstants'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import { user_roles } from '../../settings/constants/roles'
import { Link, useNavigate } from 'react-router-dom'

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
    }
}


function GetSubscriptions({ courseId = '' }) {

    // const { courseId } = useParams()
    const [subscriptionsCount, setSubscriptionsCount] = useState('loading ...')

    const [fileConfirm, setFileConfirm] = useState()
    const [openFileModal, setOpenFileModal] = useState(false)

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
        const res = await getSubscriptions({ ...params, course: courseId, populate: 'user course' }, false)
        const modifiedRes = res.subscriptions.map((subscribe) => {
            return { ...subscribe.user, courseId: subscribe.course._id, courseName: subscribe.course.name, _id: subscribe._id, createdAt: subscribe.createdAt, currentIndex: subscribe.currentIndex, updatedAt: subscribe.updatedAt }
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
                return (
                    <Button sx={{ width: '100%' }} onClick={() => {
                        if (params.row?.avatar?.url) {
                            setFileConfirm(params.row?.avatar?.url)
                            setOpenFileModal(true)
                        }
                    }}>
                        <Avatar alt={params.row?.name?.toUpperCase() || 'E'} src={params.row?.avatar?.url || "#"}
                            sx={{
                                objectFit: 'contain',
                                bgcolor: 'primary.main',
                                fontWeight: 600,
                                color: 'grey.0'
                            }} />
                    </Button>
                )
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
                        {grade.name}
                    </Typography>
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
        }, {
            field: 'gotoCourse',
            headerName: 'احصائيات الكورس',
            width: 200,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return <Button disabled={courseId ? true : false} to={`${params.row?.courseId}`} component={Link}>
                    احصائيات الكورس
                </Button>
            }
        },
    ]

    return (
        <Section>
            <TabInfo count={subscriptionsCount} title={'عدد الطلاب المشتركين'} i={1} />
            <MeDatagrid
                type={'crud'}
                exportObj={exportObj} exportTitle={'الاشتراكات'}
                columns={columns} fetchFc={fetchFc} updateFc={updateFc} loading={status.isLoading || updateStatus.isLoading || isLoading} deleteFc={removeFc}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true, isPdf: true
                    }
                }
            />

            <ModalStyled open={openFileModal} setOpen={setOpenFileModal} >
                <Image img={fileConfirm} />
            </ModalStyled>
        </Section>
    )
}

export default GetSubscriptions
