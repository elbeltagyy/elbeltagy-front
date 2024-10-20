import React, { useState } from 'react'
import Section from '../../style/mui/styled/Section'
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



const exportObj = {
    isActive: (row) => {
        if (row.isActive) {
            return 'فعال'
        } else {
            return 'غير فعال'
        }
    }
}



function GetAttemptsNot({ grade, exam, course, lecture }) {

    const [fileConfirm, setFileConfirm] = useState()
    const [openFileModal, setOpenFileModal] = useState(false)
    const [notDoExamCounts, setNotDoExamCounts] = useState('loading ...')

    const [getData, status] = useLazyGetUsersQuery()
    const [getNotDoExam] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        const res = await getNotDoExam({ ...params, exams: `!=_split_${exam}`, grade, courses: course }, false)

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

            <ModalStyled open={openFileModal} setOpen={setOpenFileModal} >
                <Image img={fileConfirm} />
            </ModalStyled>
        </>
    )
}

export default GetAttemptsNot
