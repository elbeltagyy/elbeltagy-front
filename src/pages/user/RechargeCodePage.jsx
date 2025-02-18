import React from 'react'
import Section from '../../style/mui/styled/Section'
import TitleSection from '../../components/ui/TitleSection'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import { Typography } from '@mui/material'
import MakeForm from '../../tools/makeform/MakeForm'
import { useGetCodesQuery, useGetUserCodesQuery, useVerifyCodeMutation } from '../../toolkit/apis/codesApi'

import usePostData from "../../hooks/usePostData"
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../toolkit/globalSlice'
import { lang } from '../../settings/constants/arlang'
import { CiBarcode } from 'react-icons/ci'
import * as Yup from 'yup'
import RowInfo from '../../components/ui/RowInfo'
import { FaWallet } from "react-icons/fa";
import MeDatagrid from '../../tools/datagrid/MeDatagrid'

function RechargeCodePage() {

    const { user } = useSelector(s => s.global)
    const dispatch = useDispatch()

    const [sendData, status] = useVerifyCodeMutation()
    const [verifyCode] = usePostData(sendData)

    const { data: usedCodes, isLoading, refetch } = useGetUserCodesQuery()
    // wal5-8121-2228-8865
    const inputs = [
        {
            name: 'code',
            label: lang.CODE,
            icon: <CiBarcode color='green' />,
            validation: Yup.string()
                .matches(/^(act|wal|cen|grp|lec)\d{1}-\d{4}-\d{4}-\d{4}$/, {
                    message: 'Code must start with "act", "wal", "cen", "grp", or "lec", followed by a number, and be in the format wal0-0000-0000-0000',
                    excludeEmptyString: true,
                })
                .required('Code is required'),
        },
    ]

    const onSubmit = async (values, props) => {
        const res = await verifyCode(values)
        props.resetForm()
        dispatch(setUser({ ...user, ...res }))
        refetch()
    }

    const columns = [
        {
            field: 'code',
            headerName: "الكود",
            width: 180
        }, {
            field: 'price',
            headerName: "السعر",
            width: 170,
            type: 'number',
        }, {
            field: 'type',
            headerName: 'نوع الكود',
            width: 170
        }
    ]
    return (
        <Section>
            <TitleSection title={'شحن كود'} />
            <FlexColumn sx={{ width: '100%' }}>
                <RowInfo icon={<FaWallet size={'1.5rem'} />} title={'رصيد محفظتك '} fromStart={false} desc={user.wallet + ' جنيها'} />
            </FlexColumn>
            <FlexRow>
                <Typography variant='subtitle1'>اكتب الكود المكون من 16 رقم هنا</Typography>
                <MakeForm inputs={inputs} onSubmit={onSubmit} status={status} />
            </FlexRow>
            <MeDatagrid type={'simple'} columns={columns} data={usedCodes?.values || []} loading={isLoading || false} />
        </Section>
    )
}

export default RechargeCodePage
