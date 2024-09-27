import React from 'react'
import { FlexRow } from '../../style/mui/styled/Flexbox'
import { Box, Typography } from '@mui/material'

function InfoInCircle({ title, desc, icon }) {
    return (
        <FlexRow>
            <FlexRow sx={{
                borderRadius: '16px', border: '1px solid transparent', textAlign: 'center', p: '6px 17px', pr: '30px',
                bgcolor: 'rgb(37 99 235)', color: '#fff', flexWrap: 'nowrap', justifyContent: 'center'
            }}>
                <Box mr={"8px"}>
                    {icon}
                </Box>
                <Typography variant='subtitle2' color={'#fff'} > {title} </Typography>
            </FlexRow>

            <FlexRow sx={{ borderRadius: '16px', border: '1px solid orange', textAlign: 'center', ml: '-25px', p: '4px 8px', bgcolor: 'orange' }}>
                <Box mx={'8px'}>
                    <Typography variant='subtitle1' color={'#fff'} > + {desc} + </Typography>
                </Box>
            </FlexRow>

        </FlexRow>
    )
}

export default InfoInCircle
