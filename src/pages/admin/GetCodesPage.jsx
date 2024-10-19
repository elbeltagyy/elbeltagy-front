import React, { useRef, useState } from 'react'
import Section from '../../style/mui/styled/Section'
import TitleSection from '../../components/ui/TitleSection'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'

import { useDeleteCodeMutation, useLazyGetCodesQuery, useUpdateCodeMutation } from '../../toolkit/apis/codesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import usePostData from '../../hooks/usePostData'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import CreateCode from '../../components/codes/CreateCode'
import { Alert, Button } from '@mui/material'
import { FilledHoverBtn } from '../../style/buttonsStyles'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import DataWith3Items from '../../components/ui/DataWith3Items'
import Grid from '../../style/vanilla/Grid'
import TabInfo from '../../components/ui/TabInfo'
import Separator from '../../components/ui/Separator'
import { FaCopy } from 'react-icons/fa'
import { CopyToClipboard } from 'react-copy-to-clipboard';


function GetCodesPage() {

    const [reset, setReset] = useState(false)
    const btnRef = useRef(null)

    const [getData] = useLazyGetCodesQuery()
    const [getCodes] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        const res = await getCodes(params, false)
        const codes = { values: res.codes, count: res.count }
        return codes
    }

    //update
    const [updateData] = useUpdateCodeMutation()
    const [updateCode] = usePostData(updateData)

    const updateFc = async (values) => {
        const res = await updateCode(values)
        return res
    }

    //delete
    const [deleteData] = useDeleteCodeMutation()
    const [deleteCode] = usePostData(deleteData)

    const deleteFc = async (id) => {
        await deleteCode({ _id: id })
    }

    const [usedBy, setUsedby] = useState([])
    const [openUsedBy, setOpenUsedBy] = useState(false)
    const columns = [
        {
            field: 'isChecked',
            headerName: "تم استعماله",
            width: 170,
            type: 'boolean',
            editable: true
        },
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
            width: 170
        }
        , {
            field: 'usedBy',
            headerName: "used by",
            width: 170,
            renderCell: (params) => {
                return (
                    <Button onClick={() => {
                        console.log(params.row.usedBy)
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
            editable: true
        },
    ]


    const [open, setOpen] = useState(false)
    return (
        <Section>
            <TitleWithDividers title={'صفحه الاكواد'} />

            <FlexColumn>
                <FilledHoverBtn onClick={() => setOpen(true)}>انشاء كود</FilledHoverBtn>
            </FlexColumn>

            <MeDatagrid type={'crud'} columns={columns} reset={reset}
                fetchFc={fetchFc} updateFc={updateFc} deleteFc={deleteFc}
            />

            <ModalStyled open={open} setOpen={setOpen} >
                <CreateCode setReset={setReset} />
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
