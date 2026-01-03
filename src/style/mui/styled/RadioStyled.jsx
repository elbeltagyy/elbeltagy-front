import { Alert, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { memo } from 'react'


function RadioStyled({ disabled, label, options, value, setValue, row = false, sx }) {

    return (
        <FormControl disabled={disabled} sx={sx}  >
            <FormLabel >{label}</FormLabel>
            <RadioGroup
                value={value}
                onChange={(e, v) => {
                    setValue(v)
                }}
                row={row}
            >
                {options && options.map((option, i) => (
                    <FormControlLabel key={i} value={option.value} label={option.label} control={<Radio sx={{
                        " &.Mui-checked": {
                            color: "secondary.main"
                        }
                    }} />}
                    />
                ))}

                {(options?.length === 0 || !options) && (
                    <Alert dir='ltr' sx={{ mb: "5px" }} severity='error'>لا يوجد خيارات متاحه</Alert>
                )}
            </RadioGroup>
        </FormControl>
    )
}

export default memo(RadioStyled)
