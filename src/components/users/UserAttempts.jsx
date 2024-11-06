import React, { useEffect, useState } from 'react'
import { useLazyGetUserInfoQuery } from '../../toolkit/apis/attemptsApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import TabInfo from '../ui/TabInfo'
import { getDateWithTime, getFullDate } from '../../settings/constants/dateConstants'
import { Box, Button } from '@mui/material'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import ms from 'ms'
import TitleWithDividers from '../ui/TitleWithDividers'
import { totalDegree } from '../../tools/fcs/GetExamTotal'
import { Link } from 'react-router-dom'


const exportObj = {
    status: (row) => {
        if (row.status) {
            return 'ادى الاختبار'
        } else {
            return 'لم يؤدى الاختبار'
        }
    },
    mark: (row) => {
        if (row.status) {
            return row.mark + ' / ' + row.total
        } else {
            return 'لم يؤدى الاختبار'
        }
    },
    createdAt: (row) => {
        if (row.status) {
            return getDateWithTime(row.createdAt)
        }
        return 'لم يؤدى الاختبار'
    },
    tokenTime: (row) => {
        if (row.status) {
            return ms(row.tokenTime)
        }
        return 'لم يؤدى الاختبار'
    }
}


function UserAttempts({ user }) {

    const [getData] = useLazyGetUserInfoQuery()
    const [getUserInfo] = useLazyGetData(getData)

    const [rows, setRows] = useState([])

    useEffect(() => {
        const trigger = async () => {
            const res = await getUserInfo({ user: user._id })// attempts => (name, total,)mark, time, tokenTime, doneAt, lectureNotDone => name
            // let row = [{ name: '', createdAt: '', total: '', mark: '', time: '', tokenTime: '' }]
            const modifiedArray = []

            res.attempts?.forEach((attempt) => {
                // const exam = attempt.exam
                // let storedTotals = []
                const myObj = {
                    _id: attempt._id,
                    name: attempt.exam?.name,
                    createdAt: attempt.createdAt,
                    mark: attempt.mark,
                    total: totalDegree(attempt?.exam),
                    time: attempt.exam?.time,
                    tokenTime: attempt.tokenTime,
                    status: true
                }
                modifiedArray.push(myObj)
            })

            res.examsNotDid.forEach(lecture => {
                const myObj = {
                    _id: lecture._id,
                    status: false,
                    name: lecture.name,
                    createdAt: false,
                    mark: 'لم يؤدى الاختبار',
                    total: lecture.exam?.total,
                    time: lecture.exam.time,
                    tokenTime: 'لم يؤدى الاختبار',
                }
                modifiedArray.push(myObj)
            })
            setRows(modifiedArray)
        }
        trigger()
    }, [user])

    const columns = [
        {
            field: "name",//of exam
            headerName: 'الاختبار',
            width: 300,
        },
        {
            field: 'status',
            headerName: 'هل ادي الاختبار',
            type: "boolean",
            width: 200,
        },
        {
            field: 'mark',
            headerName: 'الدرجه',
            width: 200,
            type: 'number',
            renderCell: (params) => {
                if (!params.row.total) {
                    return <TabInfo count={'لم يؤدى الاختبار'} i={3} />
                }
                return (
                    <TabInfo count={params.row.mark + '/' + (params.row.total ? params.row.total : "")} i={1} />
                )
            }
        }, {
            field: 'tokenTime',
            headerName: 'الوقت الماخوذ',
            width: 200,
            renderCell: (params) => {
                return (
                    <TabInfo count={ms(params.row.tokenTime)} i={1} />
                )
            }
        },
        {
            field: 'time',
            headerName: 'وقت الاختبار الفعلى',
            width: 200
        },
        {
            field: 'createdAt',
            headerName: 'تاريخ اداء الاختبار',
            width: 200,
            renderCell: (params) => {
                if (params.row.createdAt) {
                    return <TabInfo count={getFullDate(params.row.createdAt)} i={1} />
                } else {
                    return <TabInfo count={'لم يؤدى الاختبار'} i={3} />
                }
            }
        }, {
            field: 'seeAttempt',
            headerName: 'عرض حل الطالب',
            width: 200,
            filterable: false,
            disableExport: true,
            sortable: false,
            renderCell: (params) => {
                return <Button disabled={!params.row.status} component={Link} to={'/attempts/' + params.row._id}>
                    عرض الحل
                </Button>
            }
        }

    ]


    return (
        <Box sx={{ width: '100%' }}>
            <TitleWithDividers title={'اختبارات الطالب'} />
            <MeDatagrid
                exportTitle={'اختبارات الطالب' + ' ' + user.name + (` (${user.userName})`)}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true, isPdf: true
                    }
                } exportObj={exportObj} type={'simple'} data={rows} columns={columns} />
        </Box>
    )
}

export default UserAttempts
