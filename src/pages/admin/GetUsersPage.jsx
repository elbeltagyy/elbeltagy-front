import { Avatar, Box, Button, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'

import { user_roles } from '../../settings/constants/roles'
import gradeConstants from '../../settings/constants/gradeConstants'
import { lang } from '../../settings/constants/arlang'

import Section from "../../style/mui/styled/Section"
import ModalStyled from '../../style/mui/styled/ModalStyled'
import { FilledHoverBtn } from '../../style/buttonsStyles'
import { FlexColumn } from '../../style/mui/styled/Flexbox'

import TabInfo from '../../components/ui/TabInfo'
import TitleSection from '../../components/ui/TitleSection'
import GradesTabs from '../../components/grades/GradesTabs'
// import CreateUser from '../../components/users/CreateUser'

import { filterArrWithValue, makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'

import usePostData from '../../hooks/usePostData'
import { useLazyGetUsersCountQuery } from '../../toolkit/apis/statisticsApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import { useDeleteUserMutation, useLazyGetUsersQuery, useUpdateUserMutation } from '../../toolkit/apis/usersApi'
import Image from '../../components/ui/Image'
import CreateUser from '../../components/users/CreateUser'
import { useGridApiRef } from '@mui/x-data-grid'
import { getFullDate } from '../../settings/constants/dateConstants'


function GetUsersPage() {

    const [fileConfirm, setFileConfirm] = useState()
    const [openFileModal, setOpenFileModal] = useState(false)

    const [gradesCounts, setGradeCounts] = useState({})
    const [grade, setGrade] = useState(null)
    const [open, setOpen] = useState(false)

    //get users
    const [getData, { isLoading, data }] = useLazyGetUsersQuery()
    const [getUsers] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        const res = await getUsers(params, false)
        const data = { values: res.users, count: res.count }
        return data
    }

    //get users count
    const [getStatistics, status] = useLazyGetUsersCountQuery()
    const [getUsersCount] = useLazyGetData(getStatistics)

    useEffect(() => {
        const trigger = async () => {
            const allGrades = await getUsersCount({ grade: 'all' })
            const grade1 = await getUsersCount({ grade: 1, })
            const grade2 = await getUsersCount({ grade: 2 })

            setGradeCounts({
                allGrades, grade1, grade2
            })
        }

        trigger()
    }, [])


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
            field: 'email',
            headerName: lang.EMAIL,
            width: 200
        }, {
            field: 'userName',
            headerName: lang.USERNAME,
            width: 150

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
            field: 'wallet',
            headerName: lang.WALLET,
            width: 200
        }, {
            field: 'role',
            headerName: lang.ROLE,
            type: 'singleSelect',
            valueOptions: [user_roles.INREVIEW, user_roles.ONLINE, user_roles.STUDENT, user_roles.ADMIN, user_roles.SUBADMIN,],
            editable: true
        }, {
            field: "grade",
            headerName: lang.GRADE,
            type: 'singleSelect',
            width: 200,
            editable: true,
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
            field: 'devicesAllowed',
            headerName: 'عدد الاجهزه المسموح بها',
            editable: true,
            width: 200,
            renderCell: (params) => {
                return <TabInfo count={params.row.devicesAllowed} i={1} />
            }
        }, {
            field: 'devicesRegistered',
            headerName: 'عدد الاجهزه المسجله',
            width: 200,
            editable: false,
            filterable: false,
            renderCell: (params) => {
                return <TabInfo count={params.row.devicesRegistered.length} i={3} />
            }
        }, {
            field: 'filterDevices',
            headerName: "مسح الاجهزه المسجله",
            width: 200,
            filterable: false,
            disableExport: true,
            renderCell: (params) => {
                return <Button disabled={params.row.devicesRegistered.length === 0} onClick={() => {
                    setUserRegister(params.row)
                    setOpenRegisterModal(true)
                }}>
                    مسح الاجهزه المسجله
                </Button>
            }
        }, {
            field: 'fileConfirm',
            headerName: 'صوره التاكيد',
            width: 200,
            disableExport: true,
            filterable: false,
            renderCell: (params) => {
                return (
                    <Button sx={{ width: '100%' }} onClick={() => {
                        if (params.row?.fileConfirm?.url) {
                            setFileConfirm(params.row?.fileConfirm?.url)
                            setOpenFileModal(true)
                        }
                    }}>
                        <Avatar alt={params.row?.name?.toUpperCase()} src={params.row?.fileConfirm?.url || "#"}
                            sx={{
                                objectFit: 'contain',
                                bgcolor: 'primary.main',
                                fontWeight: 600,
                                color: 'grey.0'
                            }} />
                    </Button>
                )
            }
        }, {
            field: 'createdAt',
            headerName: 'تاريخ الانشاء',
            width: 200,
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.createdAt)} i={1} />
            }
        },
    ]

    const [sendData, { isLoading: updateLoader }] = useUpdateUserMutation()
    const [updateUser] = usePostData(sendData)

    const updateFc = async (values) => {

        const user = await updateUser(values)
        return user
    }

    const [deleteData, { isLoading: deleteLoader }] = useDeleteUserMutation()
    const [deleteUser] = usePostData(deleteData)

    const deleteFc = async (id) => {
        await deleteUser({ _id: id })
    }


    // reset device registered
    const apiRef = useGridApiRef();
    const [userToRegister, setUserRegister] = useState()
    const [isOpenRegisterModal, setOpenRegisterModal] = useState(false)
    const resetDevicesReg = async () => {
        const user = await updateUser({ ...userToRegister, devicesRegistered: [] })
        apiRef.current.updateRows([{ ...user }])
    }
    return (
        <Section>
            <TitleSection title={lang.USERS_PAGE} />
            <FlexColumn sx={{ width: '100%' }}>
                <FilledHoverBtn onClick={() => setOpen(true)} >{lang.CREATE_USER}</FilledHoverBtn>
            </FlexColumn>

            <GradesTabs setGrade={setGrade} counts={gradesCounts} />

            <MeDatagrid
                apiRef={apiRef}
                filterParams={{ grade: grade || 'all' }}
                type={'crud'}
                columns={columns} fetchFc={fetchFc} loading={isLoading || updateLoader || deleteLoader} updateFc={updateFc} deleteFc={deleteFc}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true
                    }
                }
            />

            <ModalStyled open={open} setOpen={setOpen} >
                <CreateUser />
            </ModalStyled>

            <ModalStyled open={openFileModal} setOpen={setOpenFileModal} >
                <Image img={fileConfirm} />
            </ModalStyled>

            <ModalStyled open={isOpenRegisterModal} setOpen={setOpenRegisterModal} title={'هل انت متاكد من مسح الاجهزه المسجله لهذا المستخدم ؟'} action={resetDevicesReg} />
        </Section>
    )
}


export default GetUsersPage
