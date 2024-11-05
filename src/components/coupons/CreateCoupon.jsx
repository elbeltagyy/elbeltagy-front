import { useCreateCouponMutation } from '../../toolkit/apis/couponsApi'
import usePostData from '../../hooks/usePostData'

import CouponForm from './CouponForm'
import TitleWithDividers from '../ui/TitleWithDividers'
import Section from '../../style/mui/styled/Section'

function CreateCoupon({ course, setReset, coupon }) {


    const [sendData, status] = useCreateCouponMutation()
    const [createCoupon] = usePostData(sendData)

    const onSubmit = async (values, props) => {
        if (!values.course) {
            delete values.course
        }
        await createCoupon(values)
        if (setReset) {
            setReset(pre => !pre)
        }
        props.resetForm()
    }

    return (
        <Section>
            <TitleWithDividers title={'انشاء كوبون'} />
            <CouponForm onSubmit={onSubmit} status={status} course={course} coupon={coupon} />
        </Section>
    )
}

export default CreateCoupon
