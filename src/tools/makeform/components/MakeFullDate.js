import { FormHelperText, useTheme } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ErrorMessage, FastField } from 'formik'

function MakeFullDate({ inputName, props, value, input }) {

    const theme = useTheme()

    const handleValue = (newValue) => {
        props.setFieldValue(inputName, newValue)
    }

    return (
        <div>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}  >
                <FastField
                    as={DateTimePicker}
                    name={inputName}
                    value={value || null}
                    color="warning"

                    onChange={(newValue) => handleValue(newValue)} label={input.label} />
                <FormHelperText sx={{ color: theme.palette.error.dark }}>
                    <ErrorMessage name={inputName} />
                </FormHelperText>
            </LocalizationProvider>
        </div>
    )
}

export default MakeFullDate
