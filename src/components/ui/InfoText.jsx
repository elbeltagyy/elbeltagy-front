import { FlexRow } from '../../style/mui/styled/Flexbox'
import { Typography } from '@mui/material'

function InfoText({ label, description, sx = {} }) {

    return (
        <FlexRow gap={'4px'} sx={sx}>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '12px', opacity: .4 }}>
                {label}:
            </Typography>

            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {description}
            </Typography>
        </FlexRow>
    )
}

export default InfoText
