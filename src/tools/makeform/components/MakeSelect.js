import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { memo } from 'react'
import { ErrorMessage, Field, } from 'formik'

// {option, value}
function MakeSelect({ showError, inputName, input, value, setValue }) {

    const handelValue = (e) => {
        setValue(e.target.value)
    }
    const disabledValues = input.disabledValues || []

    return (
        <FormControl disabled={input.disabled ?? false} fullWidth error={showError ? true : false} color='warning'>
            <InputLabel id="demo-simple-select-label">
                <Box display={"flex"} alignItems={"center"} gap={".5rem"} sx={{
                    direction: 'ltr'
                }}>
                    {input.icon && input.icon}
                    <Typography variant='overline'>
                        {input.label}
                    </Typography>
                </Box>
            </InputLabel>
            <Field
                as={Select}
                name={inputName}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value ?? ''} //value === 0 ? 0 : value ?? ""
                label={input.label + "    --"}
                onChange={handelValue}
            >
                {input.options && input.options.map((option, i) => {
                    if (option?.label) {
                        return (
                            <MenuItem key={i} disabled={disabledValues.includes(option.value)} value={option.value}>{option.label}</MenuItem>
                        )
                    }

                    if (option) {
                        return <MenuItem key={i} disabled={disabledValues.includes(option)} value={option}>{option}</MenuItem>
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

export default memo(MakeSelect)
