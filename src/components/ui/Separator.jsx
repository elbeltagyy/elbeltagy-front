import { Divider } from '@mui/material'
import React from 'react'

function Separator({ color = 'primary.main', sx }) {
    return (
        <Divider sx={{ border: '4px solid', borderColor: color, borderRadius: '16px', my: '16px', width: '100%', ...sx, }} />
    )
}

export default Separator
