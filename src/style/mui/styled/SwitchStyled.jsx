import { FormControlLabel, Switch } from '@mui/material'

import Loader from '../loaders/Loader'
import { red } from '@mui/material/colors'

function SwitchStyled({ label, checked, onChange, isLoading, disabled = false }) {
    return (
        <FormControlLabel
            // sx={{ display: 'block' }}
            control={<Switch color='success' sx={{
                '& .MuiSwitch-thumb': {
                    color: checked ? null : red[500], // Red color when unchecked
                },
                '& .MuiSwitch-track': {
                    backgroundColor: checked ? null : 'red', // Red color when unchecked
                },
            }} checked={checked} disabled={isLoading || disabled} onChange={(e, v) => onChange(v)} />}
            label={isLoading ? <Loader /> : label} />
    )
}

export default SwitchStyled
