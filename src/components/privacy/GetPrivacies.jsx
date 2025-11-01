import React, { useState } from 'react'
import Section from '../../style/mui/styled/Section'
import { Box, setRef } from '@mui/material'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import TitleWithDividers from '../ui/TitleWithDividers'
import { useDeletePrivacyMutation, useGetPrivaciesQuery, useLazyGetPrivaciesQuery, useUpdatePrivacyMutation } from '../../toolkit/apis/privacyApi'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'
import TabInfo from '../ui/TabInfo'
import { getFullDate } from '../../settings/constants/dateConstants'
import useLazyGetData from '../../hooks/useLazyGetData'
import usePostData from '../../hooks/usePostData'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import UpdatePrivacy from './UpdatePrivacy'
import { lang } from '../../settings/constants/arlang'

function GetPrivacies({ reset, setReset }) {


    const [getData, status] = useLazyGetPrivaciesQuery()
    const [getPrivacies] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        const res = await getPrivacies(params)
        return { values: res.privacy, count: res.count }
    }

    const [sendData, updateStatus] = useUpdatePrivacyMutation()
    const [updatePrivacy] = usePostData(sendData)
    const updateFc = async (privacy) => {
        const res = await updatePrivacy({ ...privacy, id: privacy._id })
        return res
    }

    const [deleteData, deleteStatus] = useDeletePrivacyMutation()
    const [deletePrivacy] = usePostData(deleteData)
    const deleteFc = async (id) => {
        await deletePrivacy({ id })
    }

    const [viewedPrivacy, setViewedPrivacy] = useState()
    const [showUpdate, setShowUpdate] = useState(false)

    const columns = [
        {
            field: "title",
            headerName: 'السياسه',
            width: 200,
            editable: true
        }, {
            field: 'isActive',
            headerName: lang.IS_ACTIVE,
            type: "boolean",
            editable: true,
            renderCell: (params) => {
                return (
                    <Box>
                        {params.row.isActive ? <TabInfo count={lang.ACTIVE} i={1} />
                            : <TabInfo count={lang.NOT_ACTIVE} i={3} />}
                    </Box>
                )
            }
        }, {
            field: 'createdAt',
            headerName: 'تاريخ الانشاء',
            width: 200,
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.createdAt)} i={1} />
            }
        }, {
            field: 'updatedAt',
            headerName: 'تاريخ اخر تعديل  ',
            width: 200,
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.createdAt)} i={2} />
            }
        },
    ]

    if (status.isLoading) return <LoaderSkeleton />

    return (
        <Section>
            <TitleWithDividers title={"سياسات المنصه"} />

            <Box>
                <MeDatagrid
                    type={'crud'} reset={reset}
                    columns={columns} loading={status.isLoading || updateStatus.isLoading || deleteStatus.isLoading}
                    viewFc={(privacy) => {
                        setViewedPrivacy(privacy)
                        setShowUpdate(true)
                    }} fetchFc={fetchFc} updateFc={updateFc} deleteFc={deleteFc}
                    editing={
                        {
                            bgcolor: 'background.alt',
                            showSlots: ["density", "filter", "columns", "export"],
                            autoHeight: true,
                            maxHeight: '100vh'
                        }
                    }

                />
            </Box>

            <ModalStyled open={showUpdate} setOpen={setShowUpdate}>
                <UpdatePrivacy privacy={viewedPrivacy} setReset={setReset} />
            </ModalStyled>
        </Section>
    )
}

export default GetPrivacies
