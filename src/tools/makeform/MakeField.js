import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import { ErrorMessage, FastField } from 'formik'
import { memo } from 'react'


function MakeField({ input, inputName, showError }) {
    // console.log('inputName ==>', inputName)
    return (
        <FastField
            as={TextField}
            sx={{
                display: input.hidden && "none",
                width: "100%",
                direction: input.direction || 'ltr',
                '& label': {
                    top: '-6px',
                },
                ...input.sx
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
            error={showError ? true : false}
            helperText={showError ? < ErrorMessage name={inputName} /> : input.helperText || ""}

            placeholder={input.placeholder && input.placeholder}
            variant={input.variant ? input.variant : "outlined"}
            // color='success'

            required={input.required || false}
            disabled={input.disabled ? true : false}
            hidden={input.hidden && true}
            defaultValue={input.defaultValue && input.defaultValue}

            multiline={input.rows && true}
            rows={
                input.rows || undefined
            }
            InputProps={{
                endAdornment: input.endIcon && (
                    <InputAdornment position="end">
                        {input.endIcon}
                    </InputAdornment>
                ),
                startAdornment: input.startIcon && (
                    <InputAdornment position="start">
                        {input.startIcon}
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default memo(MakeField)
