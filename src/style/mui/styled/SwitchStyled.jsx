import { FormControlLabel, Switch } from '@mui/material'
import React from 'react'
import Loader from '../loaders/Loader'

function SwitchStyled({ label, checked, onChange, isLoading }) {
    return (
        <FormControlLabel
            control={<Switch checked={checked} disabled={isLoading} onChange={(e, v) => onChange(v)} />}
            label={isLoading ? <Loader /> : label} />
    )
}

export default SwitchStyled
