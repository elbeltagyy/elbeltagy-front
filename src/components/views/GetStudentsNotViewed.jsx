import { useState } from 'react'
import TabInfo from '../../components/ui/TabInfo'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import { lang } from '../../settings/constants/arlang'
import { Avatar, Box, Button, Typography } from '@mui/material'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import Image from '../../components/ui/Image'
import useLazyGetData from '../../hooks/useLazyGetData'
import { useLazyGetUsersQuery } from '../../toolkit/apis/usersApi'
import Separator from '../../components/ui/Separator'
import { red } from '@mui/material/colors'
import gradeConstants from '../../settings/constants/gradeConstants'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
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


function GetStudentsNotViewed({ grade, lectureId, lectureName }) {
    const [fileConfirm, setFileConfirm] = useState()
    const [openFileModal, setOpenFileModal] = useState(false)
    const [notViewedCount, setNotViewedCount] = useState('loading ...')

    const [getData, status] = useLazyGetUsersQuery()
    const [getNotViewedUsers] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        const res = await getNotViewedUsers({ ...params, lectures: `!=_split_${lectureId}`, grade }, false)
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
            valueOptions: [user_roles.ONLINE, user_roles.STUDENT],
        },
        {
            field: "grade",
            headerName: lang.GRADE,
            type: 'singleSelect',
            width: 200,
            filterable: false,
            valueOptions: makeArrWithValueAndLabel(gradeConstants, { value: 'index', label: 'name' }),
            renderCell: (params) => {
                const grade = gradeConstants.filter(({ index }) => index === params.row.grade)[0]
                return (
                    <Typography>
                        {grade.name}
                    </Typography>
                )
            }
        },
    ]

    return (
        <>
            <TabInfo count={notViewedCount} title={' عدد الطلاب الذين لم يشاهدوا المحاضره' + " : " + lectureName} i={3} />
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

            <ModalStyled open={openFileModal} setOpen={setOpenFileModal} >
                <Image img={fileConfirm} />
            </ModalStyled>
        </>
    )
}

export default GetStudentsNotViewed
