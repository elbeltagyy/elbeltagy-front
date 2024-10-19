import React, { useEffect, useState } from 'react'
import { useLazyGetUserInfoQuery } from '../../toolkit/apis/attemptsApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import TabInfo from '../ui/TabInfo'
import { getFullDate } from '../../settings/constants/dateConstants'
import { Box } from '@mui/material'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import ms from 'ms'
import TitleWithDividers from '../ui/TitleWithDividers'

function UserAttempts({ user }) {

    const [getData] = useLazyGetUserInfoQuery()
    const [getUserInfo] = useLazyGetData(getData)

    const [rows, setRows] = useState([])

    useEffect(() => {
        const trigger = async () => {
            const res = await getUserInfo({ user: user._id })// attempts => (name, total,)mark, time, tokenTime, doneAt, lectureNotDone => name
            // let row = [{ name: '', createdAt: '', total: '', mark: '', time: '', tokenTime: '' }]
            console.log('res ==>', res)
            const modifiedArray = []
            res.attempts?.forEach((attempt) => {
                const myObj = {
                    _id: attempt._id,
                    name: attempt.exam?.name,
                    createdAt: attempt.createdAt,
                    mark: attempt.mark,
                    total: 'change',
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
            // disableExport: true,
            // filterable: false,
        },
        {
            field: 'status',
            headerName: 'هل ادي الاختبار',
            type: "boolean",
            width: 200,
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
        },
        {
            field: 'time',
            headerName: 'الوقت',
            width: 200
        }, {
            field: 'tokenTime',
            headerName: 'الوقت الماخوذ',
            width: 200,
            renderCell: (params) => {
                return (
                    <TabInfo count={ms(params.row.tokenTime)} i={1} />
                )
            }
        }, {
            field: 'mark',
            headerName: 'الدرجه',
            width: 200,
            renderCell: (params) => {
                return (
                    <TabInfo count={params.row.mark} i={1} />
                )
            }
        },
    ]


    return (
        <Box sx={{ width: '100%' }}>
            <TitleWithDividers title={'اختبارات الطالب'} />
            <MeDatagrid type={'simple'} data={rows} columns={columns} />
        </Box>
    )
}

export default UserAttempts
