import { useSelector } from "react-redux"
import usePostData from "../../hooks/usePostData"
import { useVerifyCouponMutation } from "../../toolkit/apis/couponsApi"
import MakeForm from "../../tools/makeform/MakeForm"
import BtnModal from "../ui/BtnModal"
import { Button, Typography } from "@mui/material"
import WrapperHandler from "../../tools/WrapperHandler"
import { useMemo } from "react"

function VerifyCoupon({ setCoupon, params, prevPrice }) {

    const user = useSelector(s => s.global.user)
    const originalPrice = useMemo(() => prevPrice, [])

    const [sendData, status] = useVerifyCouponMutation()
    const [verifyCoupon] = usePostData(sendData)

    const onSubmit = async (values) => {
        // console.log(values)
        const res = await verifyCoupon({ ...values, ...params })

        setCoupon({
            price: res.price,
            coupon: res.coupon,
            couponId: res._id
        })
    }

    const removeCoupon = () => {
        setCoupon({
            price: originalPrice,
            coupon: null,
            couponId: null

        })
        status.reset()
    }

    const inputs = [
        {
            name: 'coupon',
            label: 'كوبون',
        }
    ]

    if (!user) {
        return <></>
    }
    return (
        <>
            {/* <Button onClick={() => removeCoupon()}>remove</Button> */}
            <WrapperHandler status={status} showSuccess={true} />
            <BtnModal
                parenetSx={{
                    alignItems: 'flex-start',
                    width: '100%'
                }}
                btn={<Typography component={'span'} sx={{
                    color: 'primary.main', cursor: 'pointer', '&:hover': {
                        color: 'primary.300',
                        textDecoration: 'underline',
                    }
                }} mr={'auto'} >
                    لديك كوبون ؟
                </Typography>}
                titleInSection={'لديك كوبون ؟'}
                component={<MakeForm inputs={inputs} onSubmit={onSubmit} status={status} btnWidth={'fit-content'}
                    formDirection="row" btnStyle={{
                        borderRadius: 1, mx: '6px'
                    }} />}
            />
        </>
    )
}

export default VerifyCoupon
