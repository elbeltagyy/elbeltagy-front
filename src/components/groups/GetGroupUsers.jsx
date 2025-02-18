import { useState } from 'react'
import { Box, Typography } from '@mui/material'


import { user_roles } from '../../settings/constants/roles'
import governments from '../../settings/constants/governments'
import gradeConstants from '../../settings/constants/gradeConstants'
import { lang } from '../../settings/constants/arlang'
import { getDateWithTime, getFullDate } from '../../settings/constants/dateConstants'

import Section from "../../style/mui/styled/Section"

import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'

import { useLazyGetUsersQuery, } from '../../toolkit/apis/usersApi'
import usePostData from '../../hooks/usePostData'
import useLazyGetData from '../../hooks/useLazyGetData'

import TabInfo from '../../components/ui/TabInfo'
import UserAvatar from '../../components/users/UserAvatar';
import { useRemoveUserFromGroupMutation } from '../../toolkit/apis/groupsApi';
import WrapperHandler from '../../tools/WrapperHandler'
import { ErrorBtn } from '../../style/buttonsStyles'
import Loader from '../../style/mui/loaders/Loader'
import ModalStyled from '../../style/mui/styled/ModalStyled'
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



function GetGroupUsers({ group }) {

    //get users
    const [reset, setReset] = useState(false)
    const [open, setOpen] = useState(false)
    const [chosenUsers, setChosenUsers] = useState([])

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

    const [deleteData, removeStatus] = useRemoveUserFromGroupMutation()
    const [removeUserFromGroup] = usePostData(deleteData)

    const deleteFc = async (id) => {
        await removeUserFromGroup({ users: [id], groupId: group._id })
        setReset(!reset)
    }

    const deleteMany = async () => {
        await removeUserFromGroup({ users: chosenUsers, groupId: group._id })
        setChosenUsers([])
        setReset(!reset)
    }

    if (!group) return <></>
    return (
        <Section>
            <MeDatagrid
                reset={[reset]}
                setSelection={setChosenUsers}
                type={'crud'} exportObj={exportObj} exportTitle={'اعضاء ' + group.name}
                columns={columns}
                fetchFc={fetchFc} deleteFc={deleteFc}
                loading={isLoading || removeStatus.isLoading}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true, isPdf: true
                    }
                }
            />

            {chosenUsers.length > 0 && (
                <WrapperHandler status={removeStatus} showSuccess={true}>
                    <ErrorBtn onClick={() => setOpen(true)} disabled={removeStatus.isLoading}>
                        {removeStatus.isLoading ? <Loader color={'#fff'} /> : 'ازاله المستخدمين'}
                    </ErrorBtn>
                    {open && <ModalStyled open={open} setOpen={setOpen} title={"هل انت متاكد من ازاله المستخدمين ؟"} action={deleteMany} />}
                </WrapperHandler>
            )}
        </Section>
    )
}


export default GetGroupUsers
