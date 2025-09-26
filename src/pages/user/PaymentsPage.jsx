import { FaWallet } from "react-icons/fa"
import RowInfo from "../../components/ui/RowInfo"
import { FlexColumn, FlexRow } from "../../style/mui/styled/Flexbox"
import Section from "../../style/mui/styled/Section"
import { useDispatch, useSelector } from "react-redux"
import { Button, IconButton, TextField } from "@mui/material"
import { useLazyIsLoggedQuery } from "../../toolkit/apis/usersApi"
import PaymentMethods from "../../components/payment/PaymentMethods"
import { useState } from "react"
import { setUser } from "../../toolkit/globalSlice"
import { HiOutlineRefresh } from "react-icons/hi"
import Separator from "../../components/ui/Separator"
import paymentInteg from "../../settings/constants/paymentInteg"
import TitleSection from "../../components/ui/TitleSection"
import TitleWithDividers from "../../components/ui/TitleWithDividers"
import Invoices from "../../components/all/Invoices"

function PaymentsPage() {
    const [price, setPrice] = useState("")
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    const [getUserData, statusRefresh] = useLazyIsLoggedQuery()
    const refreshUser = async () => {
        const { data } = await getUserData()
        const userData = data?.values
        dispatch(setUser({ ...user, ...userData }))
    }

    const user = useSelector(s => s.global.user)

    return (
        <Section>
            <TitleSection title={'المحفظه و المدفوعات'} />

            <FlexColumn sx={{ width: '100%' }}>
                <FlexRow>
                    <RowInfo icon={<FaWallet size={'1.5rem'} />} title={'رصيد محفظتك '} fromStart={false} desc={user.wallet + ' جنيها'} />
                    <IconButton disabled={statusRefresh.isFetching} onClick={() => {
                        refreshUser()
                    }}>
                        <HiOutlineRefresh style={{ animation: (statusRefresh.isFetching) && 'rotate .5s linear 0s infinite' }} />
                    </IconButton>
                </FlexRow>

                <FlexRow m={'16px 0'}>
                    <TextField placeholder='limit is between 0 : 2000' variant='standard' type='number' value={price} onChange={(e) => setPrice(e.target.value)} label="قم بادخال مبلغ لشحنه" />
                    <Button disabled={price <= 0 || !price || price > 2000} onClick={() => setOpen(true)} variant='outlined' sx={{ mx: '16px' }} endIcon={<FaWallet />}>
                        اضغط لشحن المحفظه
                    </Button>
                </FlexRow>
                <Separator sx={{ maxWidth: '500px' }} />
            </FlexColumn>

            <TitleWithDividers title={'المدفوعات'} />
            <Invoices />
            <PaymentMethods
                title={'شحن محفظه !'}
                subTitle={'سيتم ايضافه مبلغ ' + price + ' الي محفظتك'}
                open={open} setOpen={setOpen}
                invoiceNameId={'wallet'}
                wallet={price} price={price}
                exclude={paymentInteg.WALLET}
                isUseCoupon={false}
            // handelResponse={}
            />
        </Section>
    )
}

export default PaymentsPage
