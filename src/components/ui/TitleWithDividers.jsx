import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

function TitleWithDividers({ title, color, variant = 'h5' }) {
    return (
        <Box sx={{ my: '16px' }}>
            <Divider sx={{ border: '4px solid', borderColor: color || 'primary.main', borderRadius: '16px', opacity: '.7', width: '150px' }} />
            <Divider sx={{ border: '4px solid', borderColor: color || 'primary.main', borderRadius: '16px', opacity: '.7', width: '75px', my: '12px' }} />
            <Typography variant={variant} color={'neutral.0'}>{title}</Typography>
            <Divider sx={{ border: '4px solid', borderColor: color || 'primary.main', borderRadius: '16px', opacity: '.7', width: '200px', my: '12px' }} />
        </Box>
    )
}

export default TitleWithDividers
