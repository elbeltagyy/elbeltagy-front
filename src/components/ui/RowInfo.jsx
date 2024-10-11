import React from 'react'
import { FlexRow } from '../../style/mui/styled/Flexbox'
import { Box, Typography, useTheme } from '@mui/material'




function RowInfo({ title, desc, icon, bgcolor = "orange", color = "#fff", fromStart = true }) {

    const theme = useTheme()

    return (
        <FlexRow sx={{ justifyContent: 'space-between', flexWrap: 'nowrap' }} mr={fromStart && 'auto'} bgcolor={bgcolor} p={"8px 12px"} borderRadius={'12px'} mt={'4px'} color={color} >
            <Typography mx={"8px"} variant='subtitle1' borderRadius={'4px'}>{title} : </Typography>
            <FlexRow justifyContent="center" gap={'6px'} bgcolor={'#fff'} color={'#000'} p={'6px 8px'} borderRadius={'6px'} >
                <Typography variant='subtitle2' borderRadius={'4px'} borderBottom={'4px solid '} borderColor={'primary.main'}>{desc}</Typography>
                {icon}
            </FlexRow>
        </FlexRow>
    )
}

{/* <FlexRow>
<Box sx={{
    borderRadius: '16px', border: '1px solid transparent', textAlign: 'center', p: '6px 17px', pr: '30px',
    bgcolor: 'rgb(37 99 235)', color: '#fff'
}}>
    <Typography variant='subtitle2' color={'#fff'} > price </Typography>
</Box>

<FlexRow sx={{ borderRadius: '16px', border: '1px solid orange', textAlign: 'center', ml: '-25px', p: '4px 8px', bgcolor: 'orange' }}>
    <Box mx={'8px'}>
        <Typography variant='subtitle1' color={'#fff'} > + 20 + </Typography>
    </Box>
</FlexRow>

</FlexRow> */}
export default RowInfo
