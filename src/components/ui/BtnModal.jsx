import { useState } from 'react'

import ModalStyled from '../../style/mui/styled/ModalStyled'
import { Box, Button } from '@mui/material'
import Section from '../../style/mui/styled/Section'

function BtnModal({ btnName, icon, children, color }) {
    const [open, setOpen] = useState(false)
    return (
        <Box>
            <Button endIcon={icon} size='small' onClick={() => setOpen(true)} color={color}>
                {btnName}
            </Button>

            <ModalStyled open={open} setOpen={setOpen}>
                <Section>
                    {children}
                </Section>
            </ModalStyled>
        </Box>
    )
}

export default BtnModal
