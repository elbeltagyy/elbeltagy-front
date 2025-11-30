import { Alert, Box, Typography } from "@mui/material"
import { useGetPaymentsQuery } from "../../toolkit/apis/paymentsApi"
import ListMethods from "../../style/mui/styled/ListMethods"
import { handelObjsOfArr } from "../../tools/fcs/MakeArray"
import InfoText from "../ui/InfoText"
import { useEffect, useState } from "react"
import MakeForm from "../../tools/makeform/MakeForm"
import paymentInteg from "../../settings/constants/paymentInteg"
import Wallet from "./Wallet"
import { FlexColumn } from "../../style/mui/styled/Flexbox"
import { useMakeInvoiceMutation } from "../../toolkit/apis/invoicesApi"
import usePostData from "../../hooks/usePostData"
import ModalStyled from "../../style/mui/styled/ModalStyled"
import Section from "../../style/mui/styled/Section"
import { useDispatch } from "react-redux"
import { setUser } from "../../toolkit/globalSlice"
import TabInfo from "../ui/TabInfo"
import VerifyCoupon from "../coupons/VerifyCoupon"
import * as Yup from 'yup'
import fileValidation from "../../tools/validations/fileValidation"

function PaymentMethods({ coupon, price, handelResponse,
    course, wallet, tag, setCoupon, isUseCoupon = true, lecture,
    invoiceNameId, open, setOpen, title, subTitle, exclude = [], note }) {
    //make invoice
    const { data } = useGetPaymentsQuery({ isActive: true }) //, type: exclude.map(p => '!=' + p) 
    const [chosenPayment, setChosenPayment] = useState()

    const [sendData, status] = useMakeInvoiceMutation()
    const [makeInvoice] = usePostData(sendData)
    const dispatch = useDispatch()

    const [couponName, setCouponName] = useState(coupon)
    useEffect(() => setCouponName(coupon), [coupon])

    if (!data) return <> </>
    const payments = handelObjsOfArr(data?.values?.payments, { value: '_id', label: 'name', image: 'file.url', description: 'description', type: 'type' })
    const activePayment = (data?.values?.payments || []).length > 0 ? data?.values?.payments?.find(p => p._id === chosenPayment) : null

    const inputs = [
        {
            name: 'payment',
            label: '___',
            value: chosenPayment,
            hidden: true,
            disabled: true,
            validation: Yup.string().required()
        }, {
            name: 'sendFrom',
            label: 'رقم الهاتف او الحساب الذي تم التحويل منه',
            validation: Yup.string().required('قم بكتابه رقم الهاتف او اسم الحساب الذي قمت بتحويل الاموال من خلاله')
            // variant: 'filled'
        }, {
            name: 'note',
            label: 'ارسال ملاحظه',
            variant: 'filled'
        }, {
            name: 'file',
            type: 'file',
            label: 'صوره التحويل',
            validation: fileValidation
        }
    ]
    const onSubmit = async (values) => {
        const res = await makeInvoice({
            ...values, coupon: couponName, course, wallet, tag, lecture,
            name: invoiceNameId,
            description: subTitle + ' ' + '(السعر' + ' ' + price + 'جنيه' + ')',
        }, true)

        if (res.redirectUrl) {
            location.href = res.redirectUrl
        }
        if (res?.wallet || res?.wallet === 0) {
            dispatch(setUser({ wallet: res.wallet }))
        }

        if (handelResponse) {
            handelResponse(res)
        }
        setOpen(false)
    }

    //01222832362
    if (price || price === 0 || price === '0')
        return (
            <ModalStyled fullWidth={true} open={open} setOpen={setOpen}>
                <Box sx={{ width: '100%' }}>
                    <Section>
                        {title && (
                            <Typography variant='h5' mt={'16px'}>
                                {title}
                            </Typography>
                        )}
                        {subTitle && (
                            <Typography variant='subtitle2'>
                                {subTitle}
                            </Typography>
                        )}

                        <InfoText label={'المبلغ المطلوب'} description={price + ' جنيه'} />
                        <InfoText label={'اختر وسيله دفع'} />
                        {isUseCoupon && (
                            couponName ? (
                                <TabInfo count={couponName} i={1} title={'الكوبون: '} />
                            ) : (
                                <VerifyCoupon setCoupon={(res) => {
                                    setCoupon(res)
                                    setCouponName(res.coupon)
                                }} prevPrice={price} params={{
                                    course, tag
                                }} />
                            )
                        )}
                        {note && (
                            <Alert sx={{ maxWidth: '100%', m: '8px auto' }} variant="filled" severity="warning">
                                {note}
                            </Alert>
                        )}
                        {payments.length ? (

                            <ListMethods
                                setMethod={setChosenPayment}
                                methods={payments} activeMethod={chosenPayment}
                                disabled={exclude} excludeFc={(method) => exclude.includes(method.type)}
                            />
                        ) : (
                            <Alert sx={{ mt: '16px' }} severity="warning" variant="filled">لا يوجد وسائل دفع متاحه حاليا</Alert>
                        )}
                        <Box>
                            {chosenPayment && (
                                <InfoText label={'وسيله الدفع'} description={activePayment?.name} />
                            )}
                            {activePayment && (
                                {
                                    [paymentInteg.WALLET]: <FlexColumn>
                                        <Wallet price={price} />
                                        <MakeForm allowDirty={false} status={status} onSubmit={onSubmit} inputs={inputs.filter(i => i.type !== 'file' && i.name !== 'sendFrom')} enableReinitialize={true} />
                                    </FlexColumn>,
                                    [paymentInteg.PAYMOB]:
                                        <MakeForm allowDirty={false} status={status} onSubmit={onSubmit} inputs={inputs.filter(i => i.type !== 'file' && i.name !== 'sendFrom')} enableReinitialize={true} />
                                    ,
                                    [paymentInteg.FAWRY]:
                                        <MakeForm allowDirty={false} status={status} onSubmit={onSubmit} inputs={inputs.filter(i => i.type !== 'file' && i.name !== 'sendFrom')} enableReinitialize={true} />

                                }[activePayment.type] || <MakeForm status={status} onSubmit={onSubmit} inputs={inputs} enableReinitialize={true} />

                            )}
                        </Box>
                    </Section>

                </Box>
            </ModalStyled>
        )
}

export default PaymentMethods
