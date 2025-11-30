import { Alert, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material'
import { ErrorMessage, Field } from 'formik'
import { memo } from 'react'


function MakeRadio({ inputName, input, showError }) {

    return (
        <FormControl disabled={input.disabled} fullWidth error={showError ? true : false} >
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
                    <Alert dir='ltr' sx={{ mb: "5px" }} severity='error'>يجب إضافه ماده دراسيه</Alert>
                )}

                <FormHelperText sx={{ color: showError && "error.dark" }}>
                    <ErrorMessage name={inputName} />
                </FormHelperText>

            </Field>
        </FormControl>
    )
}

export default memo(MakeRadio)
