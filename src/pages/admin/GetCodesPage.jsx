import { useState } from 'react'
import { Alert, Button } from '@mui/material'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'

import { useDeleteCodeMutation, useLazyGetCodesQuery, useUpdateCodeMutation } from '../../toolkit/apis/codesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import usePostData from '../../hooks/usePostData'

import Section from '../../style/mui/styled/Section'
import { FilledHoverBtn } from '../../style/buttonsStyles'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import Grid from '../../style/vanilla/Grid'

import TitleWithDividers from '../../components/ui/TitleWithDividers'
import CreateCode from '../../components/codes/CreateCode'
import DataWith3Items from '../../components/ui/DataWith3Items'
import TabInfo from '../../components/ui/TabInfo'
import Separator from '../../components/ui/Separator'

import { FaCopy } from 'react-icons/fa'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getFullDate } from '../../settings/constants/dateConstants'
import { codeConstants } from '../../settings/constants/codeConstants'
import BtnModal from '../../components/ui/BtnModal'
import { FaSchoolCircleCheck, FaSchoolCircleXmark } from 'react-icons/fa6'
import { green } from '@mui/material/colors'
import GetGroupLectures from '../../components/groups/GetGroupLectures'
import GetGroupLecturesNot from '../../components/groups/GetGroupLecturesNot'
import { useSearchParams } from 'react-router-dom'

import { useGetOneLectureQuery } from '../../toolkit/apis/lecturesApi'



const exportObj = {
    isActive: (row) => {
        if (row.isActive) {
            return 'فعال'
        } else {
            return 'غير فعال'
        }
    },
    isChecked: (row) => {
        if (row.isChecked) {
            return 'تم تعليمه'
        } else {
            return 'لم يتم تعليمه'
        }
    },
    createdAt: (row) => {
        return getFullDate(row.createdAt)
    },
    price: (row) => {
        return row.price + ' جنيه'
    },
}


function GetCodesPage() {

    const [searchParams] = useSearchParams()
    const lecture = searchParams.get('lecture')

    const [reset, setReset] = useState(false)

    const [getData, { isLoading: getLoading }] = useLazyGetCodesQuery()
    const [getCodes] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        if (lecture) {
            params.lecture = lecture
        }
        const res = await getCodes(params, false)
        const codes = { values: res.codes, count: res.count }
        return codes
    }

    const { data } = useGetOneLectureQuery({ id: lecture, select: 'name' }, { skip: lecture ? false : true })
    //update
    const [updateData, { isLoading: updateLoading }] = useUpdateCodeMutation()
    const [updateCode] = usePostData(updateData)

    const updateFc = async (values) => {
        const res = await updateCode(values)
        return res
    }

    //delete
    const [deleteData, { isLoading: deleteLoading }] = useDeleteCodeMutation()
    const [deleteCode] = usePostData(deleteData)

    const deleteFc = async (id) => {
        await deleteCode({ _id: id })
    }

    const [usedBy, setUsedby] = useState([])
    const [openUsedBy, setOpenUsedBy] = useState(false)
    const columns = [
        {
            field: 'code',
            headerName: "الكود",
            width: 200,
            renderCell: (params) => {
                return <CopyToClipboard text={params.row.code} onCopy={() => alert("تم النسخ بنجاح")}>
                    <Button startIcon={<FaCopy size={'1.5rem'} />} sx={{ color: 'neutral.0' }} onClick={() => {
                    }}>
                        {params.row.code}
                    </Button >
                </CopyToClipboard>

            }
        },
        {
            field: 'isChecked',
            headerName: "تعليم كتم استعماله",
            width: 170,
            type: 'boolean',
            editable: true
        }, {
            field: 'price',
            headerName: "السعر",
            width: 170,
            type: 'number',
            editable: true
        }, {
            field: 'type',
            headerName: 'نوع الكود',
            type: 'singleSelect',
            width: 170,
            valueOptions: [codeConstants.ACTIVATE, codeConstants.CENTER, codeConstants.WALLET, codeConstants.LECTURES]
        }, {
            field: 'lectures',
            headerName: "المحاضرات",
            width: 170,
            disableExport: true,
            sortable: false,
            filterable: false,
            renderCell: (params) => {
                return params.row.type === codeConstants.LECTURES && <BtnModal btnName={'عرض المحاضرات'} icon={<FaSchoolCircleCheck size={'1.2rem'} color={green[500]} />}>
                    <TitleWithDividers title={'عرض المحاضرات ' + params.row?.code} />
                    <GetGroupLectures code={params.row} />
                </BtnModal>
            }
        }, {
            field: 'lectureNot',
            headerName: 'محاضرات غير مضافه',
            width: 150,
            disableExport: true,
            sortable: false,
            filterable: false,
            renderCell: (params) => {// code
                return params.row.type === codeConstants.LECTURES && (<BtnModal btnName={' الغير مضافه'} color={'error'} icon={<FaSchoolCircleXmark size={'1.2rem'} />}>
                    <TitleWithDividers title={' الغير مضافه ' + params.row.code} />
                    <GetGroupLecturesNot code={params.row} />
                </BtnModal>)
            }
        }, {
            field: 'usedBy',
            headerName: "المستخدمين",
            width: 170,
            disableExport: true,
            sortable: false,
            filterable: false,
            renderCell: (params) => {
                return (
                    <Button onClick={() => {
                        setUsedby(params.row.usedBy)
                        setOpenUsedBy(true)
                    }}>
                        عرض المستخدمين
                    </Button >
                )
            }
        }, {
            field: 'isActive',
            headerName: "الحاله",
            type: "boolean",
            width: 170,
            editable: true

        }, {
            field: 'numbers',
            headerName: "عدد مرات الاستخدام الباقيه",
            width: 170,
            type: 'number',
            editable: true
        }, {
            field: 'createdAt',
            headerName: 'تم انشاءه فى',
            width: 170,
            // type: 'number',
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params?.row?.createdAt)} i={0} />
            }
        },
    ]


    const [open, setOpen] = useState(false)
    return (
        <Section>
            <TitleWithDividers title={lecture ? 'محاضره: ' + data?.values?.name : 'صفحه الاكواد'} />

            <FlexColumn>
                <FilledHoverBtn onClick={() => setOpen(true)}>انشاء كود</FilledHoverBtn>
            </FlexColumn>

            <MeDatagrid
                type={'crud'} columns={columns} reset={reset}
                exportTitle={'اكواد'} exportObj={exportObj}
                fetchFc={fetchFc} updateFc={updateFc} deleteFc={deleteFc}
                loading={getLoading || updateLoading || deleteLoading}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true, isPdf: true
                    }
                }
            />

            <ModalStyled open={open} setOpen={setOpen} >
                <CreateCode setReset={setReset} lecture={data?.values?.name ? data?.values : false} />
            </ModalStyled>

            <ModalStyled open={openUsedBy} setOpen={setOpenUsedBy}>
                <Section>
                    <TabInfo count={'عدد مرات الاستخدام' + " " + usedBy.length + " " + "مرات"} i={1} />
                    <Separator />
                    <TitleWithDividers title={'المستخدمون'} />
                    {usedBy.length !== 0 ? (
                        <Grid>
                            {usedBy.map((user, i) => (
                                <DataWith3Items key={i} title={user?.userName} desc={user?.name} src={user?.avatar?.url || false} />
                            ))}
                        </Grid>
                    ) : (
                        <Alert variant='filled' severity='warning'>لم يتم استخدامه حتى الان !</Alert>
                    )}
                </Section>
            </ModalStyled>
        </Section>
    )
}

export default GetCodesPage
