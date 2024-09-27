import { Box } from '@mui/material'
import React from 'react'


const paddingX = {
    xs: '10px',
    sm: '30px',
    // md: '82px',
    // lg: '82px',
}

const paddingY = {
    xs: '16px',
    sm: '16px',
    md: '16px',
    lg: '16px',
}


function Section({ children, sx }) {
    return (
        <Box sx={{ px: paddingX, py: paddingY, ...sx }} as={'section'}>
            {children}
        </Box>
    )
}

export default Section
