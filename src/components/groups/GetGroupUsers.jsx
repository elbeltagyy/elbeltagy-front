import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useGridApiRef } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom';

import { user_roles } from '../../settings/constants/roles'
import governments from '../../settings/constants/governments'
import gradeConstants from '../../settings/constants/gradeConstants'
import { lang } from '../../settings/constants/arlang'
import { getDateWithTime, getFullDate } from '../../settings/constants/dateConstants'

import Section from "../../style/mui/styled/Section"
import ModalStyled from '../../style/mui/styled/ModalStyled'

import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'

import { useDeleteUserMutation, useLazyGetUsersQuery, useUpdateUserMutation } from '../../toolkit/apis/usersApi'
import usePostData from '../../hooks/usePostData'
import useLazyGetData from '../../hooks/useLazyGetData'

import CreateUser from '../../components/users/CreateUser'
import TabInfo from '../../components/ui/TabInfo'
import UserAvatar from '../../components/users/UserAvatar';
import { useRemoveUserFromGroupMutation } from '../../toolkit/apis/groupsApi';
// import CreateUser from '../../components/users/CreateUser'


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
    wallet: (row) => {
        return row.wallet + ' ' + 'جنيه'
    },
    createdAt: (row) => {
        return getDateWithTime(row.createdAt)
    }
}



function GetGroupUsers({ setExcludedUsers, group }) {

    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    //get users
    const [reset, setReset] = useState(false)

    const [getData, { isLoading }] = useLazyGetUsersQuery()
    const [getUsers] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        const res = await getUsers({ ...params, grade: group.grade, groups: group._id }, false)
        const data = { values: res.users, count: res.count }
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
                    <UserAvatar user={params.row} />
                )
            }
        },
        {
            field: 'name',
            headerName: lang.NAME,
            width: 200,
        }, {
            field: 'email',
            headerName: lang.EMAIL,
            width: 200,
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
            type: 'singleSelect',
            width: 200,
            valueOptions: [user_roles.INREVIEW, user_roles.ONLINE, user_roles.STUDENT, user_roles.ADMIN, user_roles.SUBADMIN,],
        }, {
            field: "grade",
            headerName: lang.GRADE,
            type: 'singleSelect',
            width: 200,
            valueOptions: makeArrWithValueAndLabel(gradeConstants, { value: 'index', label: 'name' }),
            renderCell: (params) => {
                const grade = gradeConstants.filter(({ index }) => index === params.row.grade)[0]
                return (
                    <Typography>
                        {params.row.role === user_roles.ADMIN ? user_roles.ADMIN
                            : grade?.name}
                    </Typography>
                )
            }
        }, {
            field: "government",
            headerName: 'المحافظه',
            type: 'singleSelect',
            width: 200,
            valueOptions: makeArrWithValueAndLabel(governments, { value: 'id', label: 'governorate_name_ar', isNumber: true }),
            renderCell: (params) => {
                const government = governments.filter(({ id }) => Number(id) === Number(params.row.government))[0]
                return (
                    <Typography>
                        {params.row.role === user_roles.ADMIN ? user_roles.ADMIN
                            : government?.governorate_name_ar}
                    </Typography>
                )
            }
        }, {
            field: 'createdAt',
            headerName: 'تاريخ الانشاء',
            width: 200,
            type: 'date',
            valueGetter: (params) => new Date(params.row.createdAt),
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.createdAt)} i={1} />
            }
        },
    ]

    const [deleteData, { isLoading: deleteLoader }] = useRemoveUserFromGroupMutation()
    const [removeUserFromGroup] = usePostData(deleteData)

    const deleteFc = async (id) => {
        await removeUserFromGroup({ _id: id, groupId: group._id })
        setReset(!reset)
    }

    if (!group) return <></>
    return (
        <Section>
            <MeDatagrid
                reset={[reset]}
                setSelection={setExcludedUsers}
                type={'crud'} exportObj={exportObj} exportTitle={lang.USERS_PAGE}
                columns={columns}
                fetchFc={fetchFc} deleteFc={deleteFc}
                loading={isLoading || deleteLoader}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true, isPdf: true
                    }
                }
            />

            <ModalStyled open={open} setOpen={setOpen} >
                <CreateUser setReset={setReset} />
            </ModalStyled>
        </Section>
    )
}


export default GetGroupUsers
