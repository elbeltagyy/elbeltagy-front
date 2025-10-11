import { Box, Typography } from '@mui/material'
import { FlexRow } from '../../style/mui/styled/Flexbox'


const lineStyle = (width) => {

    return {
        maxWidth: width || '500px', height: "20px", borderRadius: '8px', bgcolor: 'grey.300', my: 1, opacity: .2
    }
}

function TitleSection({ title, icon }) {
    return (
        <Box width={'100%'}>
            <Box>
                <FlexRow width={'100%'} bgcolor={'primary.main'} p={'16px'} borderRadius={'8px'} color={'grey.0'}>
                    <span style={{
                        marginBottom: '-10px'
                    }}>
                        {icon}
                    </span>
                    <Typography variant='h4' component={'h2'} sx={{ textIndent: '10px', textShadow: '-9px 9px 0 hsla(0, 0%, 0%, 0.1)' }} >
                        {title}
                    </Typography>
                </FlexRow>

                <Box sx={lineStyle("500px")}> </Box>
                <Box sx={lineStyle("300px")}> </Box>
            </Box>
        </Box>
    )
}

export default TitleSection
