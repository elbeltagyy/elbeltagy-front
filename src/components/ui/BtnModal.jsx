import { useState } from 'react'

import ModalStyled from '../../style/mui/styled/ModalStyled'
import { Button } from '@mui/material'
import Section from '../../style/mui/styled/Section'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import { FilledHoverBtn } from '../../style/buttonsStyles'
import TitleWithDividers from './TitleWithDividers'

function BtnModal({
    parenetSx = {},
    btnName, icon, children, component, variant = 'contained', color, size = 'small', isFilledHover = false, fullWidth = true, fullScreen = false, titleInSection = false
}) {
    const [open, setOpen] = useState(false)
    return (
        <FlexColumn sx={parenetSx}>
            {isFilledHover ?
                <FilledHoverBtn endIcon={icon} size={size} onClick={() => setOpen(true)} color={color}>
                    {btnName}
                </FilledHoverBtn>
                :
                <Button variant={variant} endIcon={icon} size={size} onClick={() => setOpen(true)} color={color}>
                    {btnName}
                </Button>
            }


            <ModalStyled open={open} setOpen={setOpen} fullWidth={fullWidth} fullScreen={fullScreen}>
                <Section>
                    {titleInSection && (
                        <TitleWithDividers title={titleInSection} />
                    )}
                    {component}
                    {children}
                </Section>
            </ModalStyled>
        </FlexColumn >
    )
}

export default BtnModal
