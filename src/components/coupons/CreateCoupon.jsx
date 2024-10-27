import React from 'react'
import { useCreateCouponMutation } from '../../toolkit/apis/couponsApi'
import usePostData from '../../hooks/usePostData'

import CouponForm from './CouponForm'
import TitleWithDividers from '../ui/TitleWithDividers'
import Section from '../../style/mui/styled/Section'

function CreateCoupon({ course, setReset }) {


    const [sendData, status] = useCreateCouponMutation()
    const [createCoupon] = usePostData(sendData)

    const onSubmit = async (values, props) => {
        await createCoupon(values)
        if (setReset) {
            setReset()
        }
        props.resetForm()
    }

    return (
        <Section>
            <TitleWithDividers title={'انشاء كوبون'} />
            <CouponForm onSubmit={onSubmit} status={status} course={course} />
        </Section>
    )
}

export default CreateCoupon
