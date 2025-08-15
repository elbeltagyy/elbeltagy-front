import GetCoupons from '../../components/coupons/GetCoupons'
import TitleWithDividers from '../../components/ui/TitleWithDividers'

import Section from '../../style/mui/styled/Section'

function GetCouponsPage() {

    return (
        <Section>
            <TitleWithDividers title={'صفحه الكوبونات'} />
            {/* <FlexColumn>
                <FilledHoverBtn onClick={() => setOpen(true)}>انشاء كوبون عام</FilledHoverBtn>
            </FlexColumn> */}


            <GetCoupons />

            {/* <ModalStyled open={open} setOpen={setOpen} >
                <CreateCoupon setReset={setReset} coupon={{ type: codeConstants.GLOBAL }} />
            </ModalStyled> */}
        </Section>
    )
}

export default GetCouponsPage
