import { useState } from 'react'
import TabInfo from '../../components/ui/TabInfo'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import { lang } from '../../settings/constants/arlang'
import { Avatar, Box, Button } from '@mui/material'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import Image from '../../components/ui/Image'
import useLazyGetData from '../../hooks/useLazyGetData'
import { useParams } from 'react-router-dom'
import { useLazyGetUsersQuery } from '../../toolkit/apis/usersApi'
import Separator from '../../components/ui/Separator'
import { red } from '@mui/material/colors'
import { useCreateSubscriptionMutation } from '../../toolkit/apis/userCoursesApi'
import usePostData from '../../hooks/usePostData'
import { useGridApiRef } from '@mui/x-data-grid'
import Loader from '../../style/mui/loaders/Loader'
import gradeConstants from '../../settings/constants/gradeConstants'
import { convertObjToArray, makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
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
    }
}


function GetSubscriptionsNot({ grade }) {
    const [fileConfirm, setFileConfirm] = useState()
    const [openFileModal, setOpenFileModal] = useState(false)
    const [notSubCount, setNotCounts] = useState('loading ...')

    const { courseId } = useParams()

    const [getData, status] = useLazyGetUsersQuery()
    const [getNotSubscribedUsers] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        const res = await getNotSubscribedUsers({ ...params, courses: `!=_split_${courseId}` }, false)
        const data = { values: res.users, count: res.count }
        setNotCounts(res.count)
        return data
    }

    const [sendData, { isLoading }] = useCreateSubscriptionMutation()
    const [subscribeToUser] = usePostData(sendData)

    // to subscribe
    const [userIdToSubscribe, setUserIdToSubscribe] = useState(null)
    const [open, setOpen] = useState(false)

    const trigger = async () => {
        const res = await subscribeToUser({ course: courseId, user: userIdToSubscribe })
        apiRef.current.updateRows(([{ _id: res.user, _action: 'delete' }]))
    }
    const apiRef = useGridApiRef();
    const [userRoles] = convertObjToArray(user_roles)
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
            width: 200,
            type: 'singleSelect',
            valueOptions: userRoles,
        },
        {
            field: "grade",
            headerName: lang.GRADE,
            type: 'singleSelect',
            width: 200,
            filterable: false,
            valueOptions: makeArrWithValueAndLabel(gradeConstants, { value: 'index', label: 'name' }),
        }, {
            field: "addsubscribe",
            headerName: 'اضافه اشتراك',
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Button sx={{ width: '100%' }} disabled={isLoading} onClick={() => {
                        setUserIdToSubscribe(params.row._id)
                        setOpen(true)
                    }}>
                        {isLoading ? <Loader /> : 'اشترك'}
                    </Button>
                )
            }
        },
    ]


    return (
        <>
            <TabInfo count={notSubCount} title={'عدد الطلاب الغير مشتركين'} i={3} />
            <Separator sx={{ width: '200px' }} color={red[500]} />
            <MeDatagrid
                type={'crud'}
                apiRef={apiRef}
                exportObj={exportObj} exportTitle={'الطلاب الغير مشتركين'}
                columns={columns} fetchFc={fetchFc} loading={status.isLoading || isLoading}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true, isPdf: true
                    }
                }
            />

            <ModalStyled open={openFileModal} setOpen={setOpenFileModal} >
                <Image img={fileConfirm} />
            </ModalStyled>
            <ModalStyled title={'هل انت متاكد من اضافه الطالب ؟'} open={open} setOpen={setOpen} action={trigger} />
        </>
    )
}

export default GetSubscriptionsNot
