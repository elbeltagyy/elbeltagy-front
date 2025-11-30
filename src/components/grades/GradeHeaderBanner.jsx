import { Box, Typography, useTheme } from '@mui/material'
import { FlexBetween, FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import CardInfo from '../../style/mui/components/CardInfo'

function GradeHeaderBanner({ grade, infos }) {
    const theme = useTheme()

    return (
        <Box sx={{ width: '100%', minHeight: '70vh', backgroundColor: 'primary.dark' }}>
            <FlexBetween sx={{ height: '100%', width: '100%' }}>
                <FlexColumn sx={{ height: '100%', flexGrow: 1, minWidth: '300px', p: '32px 16px' }}>
                    <Typography variant='h5' sx={{
                        zIndex: 1, textShadow: theme.shadows[8], bgcolor: theme.palette.grey[0],
                        p: '12px 16px', color: 'primary.dark',
                        borderRadius: '50px', border: '3px solid', borderColor: theme.palette.primary.main
                    }}>{grade.name} </Typography>
                    <Typography variant='body1' sx={{ color: '#fff', zIndex: 1, maxWidth: '800px', my: '16px' }}>
                        {grade.description} <br />
                    </Typography>
                    <FlexRow sx={{ width: '100%', position: 'relative', gap: '10px', justifyContent: 'center', }}>
                        {infos.length > 0 && infos.map((info, i) => (
                            <CardInfo key={i} icon={info.icon} caption={info.caption} desc={info.desc} />
                        ))}
                    </FlexRow>

                </FlexColumn>

                <FlexColumn sx={{  }}>
                    <img src={grade.image.url} style={{
                        objectFit: 'cover', maxWidth: '400px'
                    }} />
                </FlexColumn>
            </FlexBetween>
        </Box>
    )
}

export default GradeHeaderBanner
