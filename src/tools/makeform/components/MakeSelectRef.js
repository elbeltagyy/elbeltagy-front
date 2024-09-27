import { Alert, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { hasError } from '../constants/hasError'
import { ErrorMessage, Field } from 'formik'
import { getValues } from '../constants/getValue'

function MakeSelectRef({ props, inputName, input, value }) {

    const [filteredOptions, setOptions] = useState([])

    const ref = getValues(input.ref, props) || null

    useEffect(() => {

        const filtered = input.options.filter(option => option[input.ref] === ref)
        setOptions(filtered)
    }, [input.options, input.ref, ref])

    
    const setValue = (e) => {
        props.setFieldValue(inputName, e.target.value)
    }

    if (!filteredOptions || filteredOptions.length <= 0) return <Alert severity='warning'>{input.message}</Alert>

    return (
        <FormControl fullWidth error={hasError(props, inputName) ? true : false} color='warning'>
            <InputLabel id="demo-simple-select-label">{input.label}</InputLabel>
            <Field
                as={Select}
                name={input.name}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={input.label}
                onChange={setValue}
            >
                {filteredOptions && filteredOptions.map((option, i) => {
                    if (option.label) {
                        return (
                            <MenuItem key={i} value={option.value}>{option.label}</MenuItem>
                        )
                    }
                    return false
                })}

            </Field>
            <FormHelperText>
                <ErrorMessage name={inputName} />
            </FormHelperText>
        </FormControl>
    )
}

export default memo(MakeSelectRef)
