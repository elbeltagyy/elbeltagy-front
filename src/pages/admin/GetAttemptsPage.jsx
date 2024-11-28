import React, { useMemo, useState } from 'react'
import Section from '../../style/mui/styled/Section'
import { Link, useParams } from 'react-router-dom'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import { lang } from '../../settings/constants/arlang'
import { Avatar, Box, Button } from '@mui/material'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import Image from '../../components/ui/Image'
import TabInfo from '../../components/ui/TabInfo'
import { formatDuration, getDateWithTime, getFullDate } from '../../settings/constants/dateConstants'
import { useLazyGetAttemptsQuery } from '../../toolkit/apis/attemptsApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import ms from 'ms'
import { useGetOneLectureQuery } from '../../toolkit/apis/lecturesApi'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'
import { red } from '@mui/material/colors'
import Separator from '../../components/ui/Separator'
import GetAttemptsNot from './GetAttemptsNot'
import ExamInfo from '../../components/exam/ExamInfo'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import { getPercentage, totalDegree } from '../../tools/fcs/GetExamTotal'
import SwitchStyled from '../../style/mui/styled/SwitchStyled'
import { user_roles } from '../../settings/constants/roles'


const exportObj = {
    createdAt: (row) => {
        return getDateWithTime(row.createdAt)
    },
    percentage: (row) => {
        let { percentage, rating } = getPercentage(row.mark, row.total)
        return percentage + '%' + '-' + rating
    },
    isActive: (row) => {
        if (row.isActive) {
            return 'فعال'
        } else {
            return 'غير فعال'
        }
    },
    mark: (row) => {
        return row.mark + ' / ' + row.total
    }
}


function GetAttemptsPage() {
    const { lectureId, courseId } = useParams()

    const { data: lecture, isLoading } = useGetOneLectureQuery({ id: lectureId, populate: 'exam' })

    const [fileConfirm, setFileConfirm] = useState()
    const [openFileModal, setOpenFileModal] = useState(false)
    const [attemptsNums, setAttemptsNums] = useState('loading ...')

    const [getData, status] = useLazyGetAttemptsQuery()
    const [getAttempts] = useLazyGetData(getData)

    const [courseType, setCourseType] = useState(courseId)

    if (isLoading || !lectureId || !lecture) return <LoaderSkeleton />

    const fetchFc = async (params) => {
        const res = await getAttempts(
            {
                ...params,
                exam: lecture?.values?.exam?._id,
                course: courseType !== user_roles.STUDENT ? courseType : 'all',
                attemptRole: courseId === user_roles.STUDENT ? user_roles.STUDENT : 'all'
            })

        let total = totalDegree(lecture?.values?.exam)
        const modifiedRes = res.attempts.map((attempt) => {
            return {
                ...attempt.user,
                _id: attempt._id,
                createdAt: attempt.createdAt,
                mark: attempt.mark, tokenTime: ms(attempt.tokenTime), total
            }
        })
        setAttemptsNums(res.count)
        // console.log('filteredValues ==>', modifiedRes)
        const data = { values: modifiedRes, count: res.count }
        return data
    }

    //get attempts
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
            field: 'name',
            headerName: lang.NAME,
            width: 200
        }, {
            field: 'userName',
            headerName: lang.USERNAME,
            width: 150

        }, {
            field: 'mark',
            headerName: 'الدرجه',
            width: 150,
            type: 'number',
            renderCell: (params) => {
                return <TabInfo count={(params.row.mark)} i={0} />
            }
        }, {
            field: 'percentage',
            headerName: 'النسبه',
            width: 200,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                let { percentage, rating, ratingColor } = getPercentage(params.row.mark, params.row.total)
                return <TabInfo count={(percentage + '%' + '-' + rating)} i={ratingColor} />
            }
        }, {
            field: 'tokenTime',
            headerName: 'الوقت الماخوذ',
            width: 150,
            renderCell: (params) => {
                return <TabInfo count={(params.row.tokenTime)} i={2} />
            }
        }, {
            field: 'isActive',
            headerName: lang.IS_ACTIVE,
            type: "boolean",
            editable: true,
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
            headerName: 'تاريخ اداء الاختبار',
            width: 200,
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.createdAt)} i={1} />
            }
        }, {
            field: 'seeAttempt',
            headerName: 'عرض حل الطالب',
            width: 200,
            filterable: false,
            disableExport: true,
            sortable: false,
            renderCell: (params) => {
                return <Button component={Link} to={'/attempts/' + params.row._id}>
                    عرض الحل
                </Button>
            }
        }
    ]

    return (
        <Section>
            <TitleWithDividers title={'الاختبار : ' + lecture?.values?.name} />

            {courseType !== user_roles.STUDENT && (
                <SwitchStyled isLoading={status.isLoading} label={'عرض المحاولات الخاصه بالكورس فقط'} checked={courseType === courseId ? true : false}
                    onChange={() => {
                        if (courseType === courseId) {
                            setCourseType('all')
                        } else {
                            setCourseType(courseId)
                        }
                    }} />
            )}

            <FlexColumn gap={'16px'} sx={{ alignItems: 'flex-start' }}>
                <TabInfo count={attemptsNums} title={'عدد من ادو الاختبار'} i={1} />

                {lecture.values?.exam && (
                    <ExamInfo exam={lecture.values?.exam} />
                )}
            </FlexColumn>
            <MeDatagrid
                type={'crud'}
                exportObj={exportObj} exportTitle={'عدد من ادو الاختبار'}
                columns={columns} fetchFc={fetchFc} loading={status.isLoading} reset={courseType}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true, isPdf: true
                    }
                }
            />
            <Separator color={red[500]} sx={{ width: '300px' }} />
            <GetAttemptsNot grade={lecture?.values?.grade} lecture={lecture?.values} course={courseId} courseType={courseType} exam={lecture?.values?.exam?._id} />

            <ModalStyled open={openFileModal} setOpen={setOpenFileModal} >
                <Image img={fileConfirm} />
            </ModalStyled>
            {/* {examId} */}
        </Section>
    )
}

export default GetAttemptsPage
