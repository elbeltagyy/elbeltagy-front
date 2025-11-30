import { useEffect, useState } from 'react'

import ModalStyled from '../../style/mui/styled/ModalStyled'
import { Box, Button } from '@mui/material'
import Section from '../../style/mui/styled/Section'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import { FilledHoverBtn } from '../../style/buttonsStyles'
import TitleWithDividers from './TitleWithDividers'

function BtnModal({
    parenetSx = {}, btn, allowBackClose,
    btnName, icon, children, component, variant = 'contained', color, size = 'small', isFilledHover = false, fullWidth = true, fullScreen = false, titleInSection = false,
    close = false
}) {
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setOpen(false)
    }, [close])

    return (
        <FlexColumn sx={parenetSx}>
            {btn ?
                <Box onClick={() => setOpen(true)}>
                    {btn}
                </Box> : isFilledHover ?
                    <FilledHoverBtn endIcon={icon} size={size} onClick={() => setOpen(true)} color={color}>
                        {btnName}
                    </FilledHoverBtn>
                    :
                    <Button variant={variant} endIcon={icon} size={size} onClick={() => setOpen(true)} color={color}>
                        {btnName}
                    </Button>
            }


            <ModalStyled allowBackClose={allowBackClose} open={open} setOpen={setOpen} fullWidth={fullWidth} fullScreen={fullScreen}>
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
