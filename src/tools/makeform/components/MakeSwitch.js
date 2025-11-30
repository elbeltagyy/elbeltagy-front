import { FormGroup, FormLabel, Switch } from '@mui/material'
import { Field } from 'formik'
import { memo } from 'react'

function MakeSwitch({ input, inputName, value, setValue, showError }) {

    return <FormGroup error={showError ? true : undefined} >
        <FormLabel >{input.label}</FormLabel>
        <Field disabled={input.disabled ?? false} as={Switch} name={inputName} label={input.label} checked={Boolean(value)} onChange={() => setValue(!value)} />
    </FormGroup>
}

export default memo(MakeSwitch)
