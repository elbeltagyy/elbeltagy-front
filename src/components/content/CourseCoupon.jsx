import usePostData from "../../hooks/usePostData"
import { useVerifyCouponMutation } from "../../toolkit/apis/couponsApi"
import MakeForm from "../../tools/makeform/MakeForm"

function CourseCoupon({ course, setCourseDetails }) {

    const [sendData, status] = useVerifyCouponMutation()
    const [verifyCoupon] = usePostData(sendData)

    const onSubmit = async (values) => {
        const res = await verifyCoupon(values)
        setCourseDetails((pre) => {
            return {
                ...pre,
                course: { ...pre.course, price: res.coursePriceAfterDiscount, coupon: res.coupon }
            }
        })
    }

    const inputs = [
        {
            name: 'course',
            hidden: true,
            disabled: true,
            value: course._id
        }, {
            name: 'coupon',
            label: 'كوبون',
        }
    ]
    return (
        <MakeForm inputs={inputs} onSubmit={onSubmit} status={status} btnWidth={'fit-content'}
            formDirection="row" btnStyle={{
                borderRadius: 1, mx: '6px'
            }} />
    )
}

export default CourseCoupon
