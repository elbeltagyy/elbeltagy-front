import React from 'react'
import { FlexBetween, FlexColumn } from '../styled/Flexbox'
import { Box, Typography, useTheme } from '@mui/material'




function CardInfo({ icon, caption, desc }) {

    const theme = useTheme()

    return (
        <FlexBetween sx={{
            bgcolor: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px 22px', boxShadow: theme.shadows[3], mt: '10px', color: 'grey.1000', width: '150px', 
        }}>
            {/* <Box sx={{
                background: 'linear-gradient(to right, var(--palette-success-main) 0%, rgba(var(--palette-success-mainChannel) / 0) 100%)'
            }}>

            </Box> */}
            <FlexColumn m={'0 auto'}>
                <Box>{icon}</Box>
                <Typography fontSize={'.89rem'} variant='caption' noWrap>{caption}</Typography>
                <Typography variant='caption'>{desc}</Typography>
            </FlexColumn>
        </FlexBetween>
    )
}

export default CardInfo
