import { useState } from 'react'
import Section from '../../style/mui/styled/Section'
import GetCoupons from '../../components/coupons/GetCoupons'
import { useParams } from 'react-router-dom'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import CreateCoupon from '../../components/coupons/CreateCoupon'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import { FilledHoverBtn } from '../../style/buttonsStyles'

function GetCourseCoupons() {
    const { courseId } = useParams()
    const [reset, setReset] = useState(false)

    const [open, setOpen] = useState(false)

    return (
        <Section>
            <TitleWithDividers title={'صفحه كوبونات كورس'} />
            <FlexColumn>
                <FilledHoverBtn onClick={() => setOpen(true)}>انشاء كوبون</FilledHoverBtn>
            </FlexColumn>

            <GetCoupons course={courseId} reset={reset} />

            <ModalStyled open={open} setOpen={setOpen} >
                <CreateCoupon setReset={setReset} course={{ _id: courseId }} />
            </ModalStyled>
        </Section>
    )
}

export default GetCourseCoupons
