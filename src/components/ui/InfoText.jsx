import { FlexRow } from '../../style/mui/styled/Flexbox'
import { Typography } from '@mui/material'

function InfoText({ label, description, sx = {} }) {

    return (
        <FlexRow gap={'4px'} sx={{ alignItems: 'flex-start', ...sx }}>
            <Typography component={'div'} variant="body1" sx={{ color: 'text.secondary', fontSize: '12px', opacity: .4 }}>
                {label}:
            </Typography>

            <Typography component={'div'} variant="body1" whiteSpace={'pre-wrap'} sx={{ color: 'text.secondary' }}>
                {description}
            </Typography>
        </FlexRow>
    )
}

export default InfoText
