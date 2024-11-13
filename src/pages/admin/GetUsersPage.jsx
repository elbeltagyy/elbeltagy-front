import { useEffect, useState } from 'react'
import { Avatar, Box, Button, Typography } from '@mui/material'
import { useGridApiRef } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom';

import { user_roles } from '../../settings/constants/roles'
import gradeConstants from '../../settings/constants/gradeConstants'
import { lang } from '../../settings/constants/arlang'
import { getDateWithTime, getFullDate } from '../../settings/constants/dateConstants'

import Section from "../../style/mui/styled/Section"
import ModalStyled from '../../style/mui/styled/ModalStyled'
import { FilledHoverBtn } from '../../style/buttonsStyles'
import { FlexColumn } from '../../style/mui/styled/Flexbox'

import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'

import { useLazyGetUsersCountQuery } from '../../toolkit/apis/statisticsApi'
import { useDeleteUserMutation, useLazyGetUsersQuery, useUpdateUserMutation } from '../../toolkit/apis/usersApi'
import usePostData from '../../hooks/usePostData'
import useLazyGetData from '../../hooks/useLazyGetData'

import CreateUser from '../../components/users/CreateUser'
import TabInfo from '../../components/ui/TabInfo'
import TitleSection from '../../components/ui/TitleSection'
import GradesTabs from '../../components/grades/GradesTabs'
import Image from '../../components/ui/Image'
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



function GetUsersPage() {

    const navigate = useNavigate()

    const [fileConfirm, setFileConfirm] = useState()
    const [openFileModal, setOpenFileModal] = useState(false)

    const [gradesCounts, setGradeCounts] = useState({})
    const [grade, setGrade] = useState(null)
    const [open, setOpen] = useState(false)

    //get users
    const [reset, setReset] = useState(false)
    const [getData, { isLoading }] = useLazyGetUsersQuery()
    const [getUsers] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        const res = await getUsers(params, false)
        const data = { values: res.users, count: res.count }
        return data
    }

    //get users count
    const [getStatistics] = useLazyGetUsersCountQuery()
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
            width: 200,
            type: 'number',
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
            field: 'totalPoints',
            headerName: 'نقاط الطالب',
            width: 200,
            type: 'number',
        }, {
            field: "isResetPassword",
            headerName: 'اعاده ضبط كلمه السر',
            width: 200,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Button disabled={params.row.isResetPassword} onClick={() => {
                        setUserRegister(params.row)
                        setOpenReset(true)
                    }}>
                        اعاده ضبط كلمه السر
                    </Button>
                )
            }
        }, {
            field: 'devicesAllowed',
            headerName: 'عدد الاجهزه المسموح بها',
            editable: true,
            width: 200,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return <TabInfo count={params.row.devicesAllowed} i={1} />
            }
        }, {
            field: 'devicesRegistered',
            headerName: 'عدد الاجهزه المسجله',
            width: 200,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return <TabInfo count={params.row.devicesRegistered?.length} i={3} />
            }
        }, {
            field: 'filterDevices',
            headerName: "مسح الاجهزه المسجله",
            width: 200,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return <Button disabled={params.row?.devicesRegistered?.length === 0} onClick={() => {
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
            sortable: false,
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

    const viewFc = (user) => {
        navigate('/management/users/view?userName=' + user.userName)
    }

    // reset device registered
    const apiRef = useGridApiRef();
    const [userToRegister, setUserRegister] = useState()
    const [isOpenRegisterModal, setOpenRegisterModal] = useState(false)
    const resetDevicesReg = async () => {
        const user = await updateUser({ ...userToRegister, devicesRegistered: [] })
        apiRef.current.updateRows([{ ...user }])
        setUserRegister()
    }

    //reset Password
    const [openReset, setOpenReset] = useState(false)
    const resetPassword = async () => {
        const user = await updateUser({ _id: userToRegister._id, password: 'reset' })
        apiRef.current.updateRows([{ ...user }])
        setUserRegister()
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
                reset={reset}
                filterParams={{ grade: grade || 'all' }}
                type={'crud'} exportObj={exportObj} exportTitle={lang.USERS_PAGE}
                columns={columns}
                viewFc={viewFc} fetchFc={fetchFc} loading={isLoading || updateLoader || deleteLoader} updateFc={updateFc} deleteFc={deleteFc}
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

            <ModalStyled open={openFileModal} setOpen={setOpenFileModal} >
                <Image img={fileConfirm} />
            </ModalStyled>

            <ModalStyled open={isOpenRegisterModal} setOpen={setOpenRegisterModal} title={'هل انت متاكد من مسح الاجهزه المسجله لهذا المستخدم ؟'} action={resetDevicesReg} />
            <ModalStyled open={openReset} setOpen={setOpenReset} title={'هل انت متاكد من اعاده ضبط كلمه السر ؟'} action={resetPassword} />
        </Section>
    )
}


export default GetUsersPage
