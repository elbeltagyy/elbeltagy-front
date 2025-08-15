import { useCreateCouponMutation } from '../../toolkit/apis/couponsApi'
import usePostData from '../../hooks/usePostData'

import CouponForm from './CouponForm'
import TitleWithDividers from '../ui/TitleWithDividers'
import Section from '../../style/mui/styled/Section'

function CreateCoupon({ course, setReset, coupon, tag = null, sectionName = 'انشاء كوبون' }) {


    const [sendData, status] = useCreateCouponMutation()
    const [createCoupon] = usePostData(sendData)

    const onSubmit = async (values, props) => {
        await createCoupon({ ...values, tag })
        if (setReset) {
            setReset(pre => !pre)
        }
        props.resetForm()
    }

    return (
        <Section>
            <TitleWithDividers title={sectionName} />
            <CouponForm onSubmit={onSubmit} status={status} course={course} coupon={coupon} />
        </Section>
    )
}

export default CreateCoupon
