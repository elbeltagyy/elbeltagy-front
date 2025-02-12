import { useState } from 'react'

import TabInfo from '../../components/ui/TabInfo'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import { lang } from '../../settings/constants/arlang'
import { Box, } from '@mui/material'

import useLazyGetData from '../../hooks/useLazyGetData'

import { useLazyGetUsersQuery } from '../../toolkit/apis/usersApi'
import Separator from '../../components/ui/Separator'
import { red } from '@mui/material/colors'
import { user_roles } from '../../settings/constants/roles'
import UserAvatar from '../../components/users/UserAvatar'



const exportObj = {
    isActive: (row) => {
        if (row.isActive) {
            return 'فعال'
        } else {
            return 'غير فعال'
        }
    }
}



function GetAttemptsNot({ grade, exam, course, lecture, courseType = '' }) {

    const [notDoExamCounts, setNotDoExamCounts] = useState('loading ...')

    const [getData, status] = useLazyGetUsersQuery()
    const [getNotDoExam] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        let res = []
        if (courseType === user_roles.STUDENT) {
            res = await getNotDoExam({ ...params, exams: `!=_split_${exam}`, grade, role: user_roles.STUDENT }, false)
        } else {
            res = await getNotDoExam({ ...params, exams: `!=_split_${exam}`, grade, courses: course }, false)
        }

        const data = { values: res.users, count: res.count }
        setNotDoExamCounts(res.count)
        return data
    }

    const columns = [
        {
            field: "avatar",
            headerName: lang.IMAGE,
            disableExport: true,
            filterable: false,
            renderCell: (params) => {
                return <UserAvatar user={params.row} />
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
            width: 200
        },
    ]


    return (
        <>
            <TabInfo count={notDoExamCounts} title={'عدد الطلاب الذين لم يؤدوا الاختبار'} i={3} />
            <Separator sx={{ width: '200px' }} color={red[500]} />
            <MeDatagrid
                type={'crud'}
                exportObj={exportObj} exportTitle={"الطلاب الذين لم يؤدوا " + ' ' + lecture.name}
                columns={columns} fetchFc={fetchFc} loading={status.isLoading}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true, isPdf: true
                    }
                }
            />
        </>
    )
}

export default GetAttemptsNot
