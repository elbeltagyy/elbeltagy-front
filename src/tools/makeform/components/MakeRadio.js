import { Alert, Box, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material'
import { ErrorMessage, Field, useField } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'
import { hasError } from '../constants/hasError'

function MakeRadio({ inputName, input, props }) {

    return (
        <FormControl fullWidth error={hasError(props, inputName) ? true : false} >
            <FormLabel >{input.label}</FormLabel>
            <Field as={RadioGroup}
                name={inputName}
            >

                {input.options && input.options.map((option, i) => (
                    <FormControlLabel key={i} value={option.value} label={option.label} control={<Radio sx={{
                        " &.Mui-checked": {
                            color: "green"
                        }
                    }} />}
                    />
                ))}

                {(input.options?.length === 0 || !input.options) && (
                    <Alert dir='ltr' sx={{ mb: "5px" }} severity='error'>يجب اضافه سنه دراسيه</Alert>
                )}

                {/* {props.errors[inputName] && props.touched[inputName] && (
                    <Alert dir='ltr' sx={{ mb: "5px" }} severity='error'> </Alert>
                )} */}


                <FormHelperText sx={{ color: hasError(props, inputName) && "error.dark" }}>
                    <ErrorMessage name={inputName} />
                </FormHelperText>

            </Field>
        </FormControl>
    )
}

export default MakeRadio
