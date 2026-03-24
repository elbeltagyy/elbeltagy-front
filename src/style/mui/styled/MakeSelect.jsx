import { memo, useEffect } from 'react'
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material'
import { hasValidValue } from '../../../tools/fcs/hasValidValue';
import { GridClearIcon } from '@mui/x-data-grid';

function MakeSelect({ title, value, setValue, options, reset = [], allowClear = false, disabled = false, disableValue = [], sx = {}, variant = 'outlined' }) {

    useEffect(() => {
        if (reset.length !== 0) {
            setValue("")
        }
    }, [...reset])

    // Validate the value to ensure it exists in the options array
    const isValidValue = options?.some(option => {
        if (hasValidValue(option.value)) {
            return option.value === value;
        } else {
            return option === value;
        }
    });
    const selectValue = isValidValue ? value : "";

    return (
        <FormControl disabled={disabled} sx={{ maxWidth: '500px', minWidth: '250px', ...sx }}>
            <InputLabel id="demo-simple-select-label">{title}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectValue ?? ""}
                label={title || "اختر"}
                variant={variant}
                endAdornment={(hasValidValue(value) && allowClear) && (<InputAdornment position='end'>
                    <IconButton size='small' onClick={() => setValue("")}>
                        <GridClearIcon sx={{ width: 'inherit' }} />
                    </IconButton>
                </InputAdornment>)}
                // defaultValue={""} // Sets the default value to empty string
                onChange={(e, newValue) => { setValue(e.target.value) }}
            >
                {options?.map((option, i) => {
                    if (hasValidValue(option.value)) {
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
