import { useState } from "react"

import { Alert, Box, Button, Grid } from "@mui/material"

import { useDeleteCouponMutation, useLazyGetCouponsQuery, useUpdateCouponMutation } from "../../toolkit/apis/couponsApi"
import useLazyGetData from "../../hooks/useLazyGetData"
import usePostData from "../../hooks/usePostData"
import MeDatagrid from "../../tools/datagrid/MeDatagrid"

import ModalStyled from "../../style/mui/styled/ModalStyled"
import Section from "../../style/mui/styled/Section"

import TabInfo from "../ui/TabInfo"
import Separator from "../ui/Separator"
import TitleWithDividers from "../ui/TitleWithDividers"
import DataWith3Items from "../ui/DataWith3Items"

import { getFullDate } from "../../settings/constants/dateConstants"
import { codeConstants } from "../../settings/constants/codeConstants"
import BtnModal from "../ui/BtnModal"
import CreateCoupon from "./CreateCoupon"

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
    name: (row) => {
        return row.course?.name || codeConstants.GLOBAL
    },
    discount: (row) => {
        return row.discount + ' %'
    }
}

function GetCoupons({ course, tag, createBtnName = 'انشاء كوبون' }) {

    const [reset, setReset] = useState(false)

    const [getData, { isLoading: getLoading }] = useLazyGetCouponsQuery()
    const [getCouponsFc] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        const res = await getCouponsFc({ ...params, course, tag, populate: 'usedBy course tag' }, false) //edit it
        const coupons = { values: res.coupons, count: res.count }
        return coupons
    }

    //update
    const [updateData, { isLoading: updateLoading }] = useUpdateCouponMutation()
    const [updateCoupon] = usePostData(updateData)

    const updateFc = async (values) => {
        const res = await updateCoupon(values)
        return res
    }

    //delete
    const [deleteData, { isLoading: deleteLoading }] = useDeleteCouponMutation()
    const [deleteCoupon] = usePostData(deleteData)

    const deleteFc = async (id) => {
        await deleteCoupon({ _id: id })
    }

    const [usedBy, setUsedby] = useState([])
    const [openUsedBy, setOpenUsedBy] = useState(false)
    const columns = [
        {
            field: 'coupon',
            headerName: "الكوبون",
            width: 200,
        },
        {
            field: 'isChecked',
            headerName: "تعليم كتم استعماله",
            width: 170,
            type: 'boolean',
            editable: true
        }, {
            field: 'name',
            headerName: "اسم الكورس",
            width: 300,
            valueGetter: (name) => name || codeConstants.GLOBAL,
        }, {
            field: 'type',
            headerName: "نوع الكوبون",
            width: 200,
        }, {
            field: 'discount',
            headerName: "نسبه الخصم",
            width: 170,
            type: 'number',
            editable: true
        }, {
            field: 'usedBy',
            headerName: "عرض المستخدمين",
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
            type: 'number',
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.createdAt)} i={0} />
            }
        },
    ]

    return (
        <Box>
            <BtnModal
                btnName={createBtnName}
                component={<CreateCoupon
                    setReset={setReset} sectionName={createBtnName} course={course} tag={tag}
                    coupon={{ type: (tag || course) ? codeConstants.PRIVATE : codeConstants.GLOBAL }}
                />}
                isFilledHover={true}
            />

            <MeDatagrid
                type={'crud'} columns={columns} reset={reset}
                exportTitle={'كوبونات'} exportObj={exportObj}
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

        </Box>
    )
}

export default GetCoupons
