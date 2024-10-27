import { useState } from 'react'
import Section from '../../style/mui/styled/Section'
import GetCoupons from '../../components/coupons/GetCoupons'
import TitleWithDividers from '../../components/ui/TitleWithDividers'


function GetCouponsPage() {

    return (
        <Section>
            <TitleWithDividers title={'صفحه الكوبونات'} />
            <GetCoupons />
        </Section>
    )
}

export default GetCouponsPage
