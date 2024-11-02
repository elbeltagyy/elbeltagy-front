import { useState } from 'react'

import GetCoupons from '../../components/coupons/GetCoupons'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import CreateCoupon from '../../components/coupons/CreateCoupon'

import Section from '../../style/mui/styled/Section'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import { FilledHoverBtn } from '../../style/buttonsStyles'

import { codeConstants } from '../../settings/constants/codeConstants'

function GetCouponsPage() {

    const [reset, setReset] = useState(false)

    const [open, setOpen] = useState(false)

    return (
        <Section>
            <TitleWithDividers title={'صفحه الكوبونات'} />
            <FlexColumn>
                <FilledHoverBtn onClick={() => setOpen(true)}>انشاء كوبون عام</FilledHoverBtn>
            </FlexColumn>


            <GetCoupons reset={reset} />

            <ModalStyled open={open} setOpen={setOpen} >
                <CreateCoupon setReset={setReset} coupon={{ type: codeConstants.GLOBAL }} />
            </ModalStyled>
        </Section>
    )
}

export default GetCouponsPage
