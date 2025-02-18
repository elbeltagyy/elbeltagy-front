import { useState } from 'react'
import { Box, Typography } from '@mui/material'


import { user_roles } from '../../settings/constants/roles'
import governments from '../../settings/constants/governments'
import gradeConstants from '../../settings/constants/gradeConstants'
import { lang } from '../../settings/constants/arlang'
import { getDateWithTime, getFullDate } from '../../settings/constants/dateConstants'

import Section from "../../style/mui/styled/Section"
import ModalStyled from '../../style/mui/styled/ModalStyled'

import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'

import { useLazyGetUsersQuery } from '../../toolkit/apis/usersApi'
import usePostData from '../../hooks/usePostData'
import useLazyGetData from '../../hooks/useLazyGetData'

import TabInfo from '../ui/TabInfo'
import UserAvatar from '../users/UserAvatar';
import { useAddUserToGroupMutation } from '../../toolkit/apis/groupsApi';
import WrapperHandler from '../../tools/WrapperHandler';
import { FilledHoverBtn } from '../../style/buttonsStyles';
import Loader from '../../style/mui/loaders/Loader';
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



function GetGroupNotUsers({ group }) {

    const [open, setOpen] = useState(false)
    const [chosenUsers, setChosenUsers] = useState([])

    //get users
    const [reset, setReset] = useState(false)

    const [getData, { isLoading }] = useLazyGetUsersQuery()
    const [getUsers] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        const res = await getUsers({ ...params, grade: group.grade, groups: '!=_split_' + group._id }, false)
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

    //removing subscription
    const [sendData, addStatus] = useAddUserToGroupMutation()
    const [addUserToGroup] = usePostData(sendData)

    const addUser = async (user) => {
        await addUserToGroup({ users: [user._id], groupId: group._id })
        setReset(!reset)
    }

    const addManyUsers = async () => {
        await addUserToGroup({ users: chosenUsers, groupId: group._id })
        setChosenUsers([])
        setReset(!reset)
    }

    if (!group) return <></>
    return (
        <Section>
            <MeDatagrid
                reset={[reset]}
                setSelection={setChosenUsers}
                type={'crud'} exportObj={exportObj} exportTitle={lang.USERS_PAGE}
                columns={columns}
                fetchFc={fetchFc} viewFc={addUser}
                loading={isLoading || addStatus.isLoading}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true, isPdf: true
                    }
                }
            />

            {chosenUsers.length > 0 && (
                <WrapperHandler status={addStatus} showSuccess={true}>
                    <FilledHoverBtn onClick={() => setOpen(true)} disabled={addStatus.isLoading}>
                        {addStatus.isLoading ? <Loader color={'#fff'} /> : 'ايضافه المستخدمين'}
                    </FilledHoverBtn>
                    {open && <ModalStyled open={open} setOpen={setOpen} title={"هل انت متاكد من ايضافه المستخدمين ؟"} action={addManyUsers} />}
                </WrapperHandler>
            )}
        </Section>
    )
}


export default GetGroupNotUsers