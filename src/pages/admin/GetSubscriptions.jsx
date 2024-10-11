import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDeleteSubscriptionMutation, useLazyGetCourseSubscriptionsQuery } from '../../toolkit/apis/userCoursesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import { lang } from '../../settings/constants/arlang'
import { Avatar, Box, Button } from '@mui/material'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import Image from '../../components/ui/Image'
import TabInfo from '../../components/ui/TabInfo'
import { getFullDate } from '../../settings/constants/dateConstants'
import Section from '../../style/mui/styled/Section'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import { useGetOneCourseQuery } from '../../toolkit/apis/coursesApi'
import Separator from '../../components/ui/Separator'
import GetSubscriptionsNot from './GetSubscriptionsNot'
import { red } from '@mui/material/colors'
import usePostData from '../../hooks/usePostData'

function GetSubscriptions() {

    const { courseId } = useParams()
    const { data, isLoading: isLoadingCourse } = useGetOneCourseQuery({ _id: courseId })
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

    if (!courseId || isLoadingCourse) return <LoaderSkeleton />

    const fetchFc = async (params) => {
        const res = await getSubscriptions({ ...params, course: courseId }, false)
        const modifiedRes = res.subscriptions.map((subscribe) => {
            return { ...subscribe.user, _id: subscribe._id, createdAt: subscribe.createdAt, currentIndex: subscribe.currentIndex, updatedAt: subscribe.updatedAt }
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
        <Section>
            <TitleWithDividers title={'اسم الكورس : ' + data?.values?.name} />
            <TabInfo count={subscriptionsCount} title={'عدد الطلاب المشتركين'} i={1} />
            <MeDatagrid
                type={'crud'}

                columns={columns} fetchFc={fetchFc} loading={status.isLoading || isLoading} deleteFc={removeFc}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true
                    }
                }
            />

            <Separator color={red[500]} sx={{ width: '300px' }} />
            <GetSubscriptionsNot grade={data?.values?.grade} />

            <ModalStyled open={openFileModal} setOpen={setOpenFileModal} >
                <Image img={fileConfirm} />
            </ModalStyled>
        </Section>
    )
}

export default GetSubscriptions
