import { FormControlLabel, FormGroup, FormLabel, Switch } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getValues } from '../constants/getValue'
import { Field } from 'formik'
import { hasError } from '../constants/hasError'

function MakeSwitch({ input, props, inputName }) {


    const value = getValues(inputName, props) || false

    return <FormGroup error={hasError(props, inputName) ? true : undefined} >
        <FormLabel >{input.label}</FormLabel>
        <Field as={Switch} name={inputName} label={input.label} checked={Boolean(value)} onChange={() => props.setFieldValue(inputName, !value)} />
    </FormGroup>
}

export default MakeSwitch
