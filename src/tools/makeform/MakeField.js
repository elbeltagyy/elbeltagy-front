import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import { ErrorMessage, Field, FastField } from 'formik'

import { hasError } from './constants/hasError'

function MakeField({ input, inputName, props }) {
    return (
        <Field
            as={TextField}
            sx={{
                display: input.hidden && "none",
                width: "100%",
                direction: input.direction || 'ltr',
                '& label': {
                    top: '-6px',
                }
            }}

            name={inputName}
            type={input.type ? input.type : "text"}
            label={
                <Box display={"flex"} alignItems={"center"} gap={".3rem"} sx={{
                    direction: 'ltr'
                }}>
                    {input.icon && input.icon}
                    <Typography variant='overline'>
                        {input.label}
                    </Typography>
                </Box>}
            error={hasError(props, inputName) ? true : false}
            helperText={hasError(props, inputName) ? < ErrorMessage name={inputName} /> : input.helperText || ""}

            placeholder={input.placeholder && input.placeholder}
            variant={input.variant ? input.variant : "outlined"}
            color='success'

            required={input.required || false}
            disabled={input.disabled ? true : false}
            hidden={input.hidden && true}
            defaultValue={input.defaultValue && input.defaultValue}

            multiline={input.rows && true}
            rows={
                input.rows || undefined
            }
            InputProps={input.endIcon && {
                endAdornment: (
                    <InputAdornment position="end">
                        {input.endIcon}
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default MakeField
