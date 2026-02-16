import GetCoupons from '../../components/coupons/GetCoupons'
import TitleWithDividers from '../../components/ui/TitleWithDividers'

import Section from '../../style/mui/styled/Section'

function GetCouponsPage() {

    return (
        <Section>
            <TitleWithDividers title={'صفحه الكوبونات'} />
            <GetCoupons />
        </Section>
    )
}

export default GetCouponsPage
