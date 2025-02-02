import { Avatar, Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'

function TitleWithDividers({ title, desc = '', descVar = 'body1', color, variant = 'h5', avatar = false, isIcon, sx = {} }) {
    return (
        <Box sx={{ my: '16px', ...sx }}>
            <Divider sx={{ border: '4px solid', borderColor: color || 'primary.main', borderRadius: '16px', opacity: '.7', width: '150px' }} />
            <Divider sx={{ border: '4px solid', borderColor: color || 'primary.main', borderRadius: '16px', opacity: '.7', width: '75px', my: '12px' }} />
            <FlexRow gap={'12px'} sx={{ flexWrap: 'nowrap' }}>
                {isIcon && (
                    <Avatar sx={{ bgcolor: 'primary.main', color: 'grey.0' }} src={avatar || false} />
                )}
                <FlexColumn sx={{alignItems: 'flex-start'}}>
                    <Typography variant={variant} color={'neutral.0'}>{title}</Typography>
                    <Typography variant={descVar} color={'neutral.0'}>{desc}</Typography>
                </FlexColumn>
            </FlexRow>
            <Divider sx={{ border: '4px solid', borderColor: color || 'primary.main', borderRadius: '16px', opacity: '.7', width: '200px', my: '12px' }} />
        </Box>
    )
}

export default TitleWithDividers
