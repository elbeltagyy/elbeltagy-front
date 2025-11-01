import { useState } from 'react'
import useLazyGetData from '../../hooks/useLazyGetData'
import { lang } from '../../settings/constants/arlang'
import { Box, Typography } from '@mui/material'

import TabInfo from '../../components/ui/TabInfo'
import { formatDuration } from '../../settings/constants/dateConstants'
import Section from '../../style/mui/styled/Section'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import gradeConstants from '../../settings/constants/gradeConstants'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import { useLazyGetByUserViewsQuery } from '../../toolkit/apis/videosStatisticsApi'
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
    }
}


function GetEveryUserViews({ lectureId, courseId, role, refetchUsers, userId }) {

    const [usersCount, setUsersCount] = useState('')

    const [getData, status] = useLazyGetByUserViewsQuery()
    const [getViews] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        params = {
            ...params,
            lecture: lectureId, course: courseId, user: userId //view_role:
        }
        if (role) {
            params.role = role
        }
        const res = await getViews(params, false)
        const modifiedRes = res.views.map((view) => {
            return {
                ...view,
                role: view.user?.role,
                avatar: view.user?.avatar, name: view.user?.name, userName: view.user?.userName, isActive: view.user?.isActive, phone: view.user?.phone, familyPhone: view.user?.familyPhone, grade: view.user?.grade,
            }
        })
        setUsersCount(res.count)
        if (refetchUsers) {
            refetchUsers()
        }
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
            field: 'watches',
            headerName: 'عدد المشاهدات',
            type: 'number',
            renderCell: (params) => {
                return <TabInfo count={params.row.watches} i={0} />
            }
        }, {
            field: 'watchedTime',
            headerName: 'الوقت الفعلى للمشاهدات',
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
        },
        {
            field: 'role',
            headerName: lang.ROLE,
            width: 150,
            type: 'singleSelect',
            valueOptions: [user_roles.ONLINE, user_roles.STUDENT, user_roles.INREVIEW],
            sortable: role ? false : true,
            filterable: role ? false : true,
        },
        {
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
            renderCell: (params) => {
                const grade = gradeConstants.filter(({ index }) => index === params.row.grade)[0]
                return (
                    <Typography>
                        {grade?.name}
                    </Typography>
                )
            }
        },
    ]


    return (
        <Section>
            <TabInfo count={usersCount} title={'عدد الطلاب'} i={1} />
            <MeDatagrid
                type={'crud'}
                exportObj={exportObj} exportTitle={'تفاصيل الطلاب'}
                columns={columns}
                loading={status.isLoading}
                fetchFc={fetchFc} reset={[courseId, window.location.href]}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true, isPdf: true
                    }
                }
            />
        </Section>
    )
}

export default GetEveryUserViews
