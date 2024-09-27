import { Box, IconButton, Paper, Typography } from '@mui/material'
import React from 'react'
import { FlexColumn } from '../../style/mui/styled/Flexbox'

function CardService({ icon, dir = 'vert', desc, color = 'inherit' }) {
    return (
        <Paper elevation={24} sx={{
            maxWidth: '500px', p: '30px', color: 'orange', m: '12px',
            borderBottom: `4px solid ${dir === "vert" ? 'transparent' : color}`,
            borderTop: `4px solid ${dir === "vert" ? 'transparent' : color}`,
            borderRight: `4px solid ${dir === "hori" ? 'transparent' : color}`,
            borderLeft: `4px solid ${dir === "hori" ? 'transparent' : color}`,
            minWidth: '250px'
        }}>
            <FlexColumn>
                <Box my={'8px'} borderRadius={"16px"}>
                    <Box color={color}>{icon}</Box>
                </Box>

                <Box sx={{ bgcolor: `${color}`, borderRadius: '14px', textAlign: 'center', px: '8px' }}>
                    <Typography  variant='body1' my={'14px'} color={"grey.0"}>{desc}</Typography>
                </Box>
            </FlexColumn>
        </Paper>
    )
}

export default CardService
