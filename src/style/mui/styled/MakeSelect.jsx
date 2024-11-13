import { memo, useEffect } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

function MakeSelect({ title, value, setValue, options, reset = [], disabled = false, disableValue = [] }) {

    useEffect(() => {
        if (reset.length !== 0) {
            setValue("")
        }
    }, [...reset])

    return (
        <FormControl disabled={disabled} sx={{ maxWidth: '500px', minWidth: '250px' }}>
            <InputLabel id="demo-simple-select-label">{title}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value || ""}
                label={title || "اختر"}
                // defaultValue={""} // Sets the default value to empty string
                onChange={(e, newValue) => { setValue(e.target.value) }}
            >
                {options?.map((option, i) => {
                    if (option.value) {
                        return <MenuItem key={i} value={option.value} disabled={disableValue.includes(option.value)}>{option.label}</MenuItem>
                    } else {
                        return (
                            <MenuItem key={i} value={option} disabled={disableValue.includes(option) ? true : false}>{option}</MenuItem>
                        )
                    }
                })}
            </Select>
        </FormControl>
    )
}

export default memo(MakeSelect)
