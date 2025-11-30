import { FormHelperText, useTheme } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ErrorMessage, FastField } from 'formik'
import { memo } from 'react'

function MakeFullDate({ inputName,  value, input, setValue }) {

    const theme = useTheme()

    return (
        <div>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}  >
                <FastField
                    disabled={input.disabled}
                    as={DateTimePicker}
                    name={inputName}
                    value={value || null}
                    color="warning"

                    onChange={(newValue) => setValue(newValue)} label={input.label} />
                <FormHelperText sx={{ color: theme.palette.error.dark }}>
                    <ErrorMessage name={inputName} />
                </FormHelperText>
            </LocalizationProvider>
        </div>
    )
}

export default memo(MakeFullDate)
