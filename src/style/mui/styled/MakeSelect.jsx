import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { memo, useEffect } from 'react'

function MakeSelect({ title, value, setValue, options, reset = [] }) {


    useEffect(() => {
        if (reset.length !== 0) {
            setValue("")
        }
    }, [...reset])

    return (
        <FormControl sx={{ maxWidth: '500px', minWidth: '250px' }}>
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
                        return <MenuItem key={i} value={option.value}>{option.label}</MenuItem>

                    } else {
                        return (
                            <MenuItem key={i} value={option}>{option}</MenuItem>
                        )
                    }
                })}
            </Select>
        </FormControl>
    )
}

export default memo(MakeSelect)
