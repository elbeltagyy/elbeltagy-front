import { useState } from 'react'
import TabInfo from '../../components/ui/TabInfo'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import { lang } from '../../settings/constants/arlang'
import { Box, Typography } from '@mui/material'

import useLazyGetData from '../../hooks/useLazyGetData'
import { useLazyGetUsersQuery } from '../../toolkit/apis/usersApi'
import Separator from '../../components/ui/Separator'
import { red } from '@mui/material/colors'
import gradeConstants from '../../settings/constants/gradeConstants'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import { user_roles } from '../../settings/constants/roles'
import UserAvatar from '../users/UserAvatar'


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
    }
}


function GetStudentsNotViewed({  lectureId, lectureName, course, role }) { //grade,

    const [notViewedCount, setNotViewedCount] = useState('loading ...')

    const [getData, status] = useLazyGetUsersQuery()
    const [getNotViewedUsers] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        params = {
            ...params,
            lectures: `!=_split_${lectureId}`,  courses: course //grade,
        }

        if (role) {
            params.role = role
        }
        const res = await getNotViewedUsers(params, false) // modify role
        // console.log(res)
        const data = { values: res.users, count: res.count }
        setNotViewedCount(res.count)
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
            type: 'singleSelect',
            width: 200,
            valueOptions: [user_roles.ONLINE, user_roles.STUDENT, user_roles.INREVIEW],
            sortable: role ? false : true,
            filterable: role ? false : true,
        }, {
            field: "grade",
            headerName: lang.GRADE,
            type: 'singleSelect',
            width: 200,
            filterable: false,
            valueOptions: makeArrWithValueAndLabel(gradeConstants, { value: 'index', label: 'name' }),
        },
    ]

    return (
        <>
            <TabInfo count={notViewedCount} title={' عدد الطلاب الذين لم يشاهدوا المحاضره' + (role === user_roles.STUDENT ? ' ' + 'من طلاب السنتر فقط' + ' ' : ' فى الكورس فقط ') + " : " + lectureName} i={3} />
            <Separator sx={{ width: '200px' }} color={red[500]} />
            <MeDatagrid
                type={'crud'}
                exportObj={exportObj} exportTitle={'عدد الطلاب الذين لم يشاهدوا المحاضره' + " : " + lectureName}
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

export default GetStudentsNotViewed
