import { Alert, Box, Button, FormControlLabel, Radio } from '@mui/material'
import React from 'react'
import MakeInput from './MakeInput'
import MakeChoosed from './components/MakeChoosed'
import { hasError } from './constants/hasError'


export default function NestedInput({ inputName, input, props, index }) {

    return (
        <Box>
            {input.array && input.array.map((nestedInput, i) => {

                const nestedInputName = `${inputName}.${index}.${nestedInput.name}`

                if (nestedInput.choose) {
                    const fromName = `${inputName}.${index}.${nestedInput.from}`
                    const fromValue = props.getFieldMeta(fromName).value
                    const nameArr = inputName.split('.')
                    const targetInputName = `${nameArr[0]}.${nameArr[1]}.${nestedInput.choose}`


                    return <MakeChoosed
                        key={i}
                        input={nestedInput}
                        props={props} inputName={nestedInputName} targetInputName={targetInputName} fromValue={fromValue} />
                }

                return (
                    <Box key={i} sx={{ my: '16px' }}>
                        <MakeInput input={nestedInput} props={props} nestedInputName={nestedInputName} />

                        {hasError(props, nestedInputName) && (
                            <Alert sx={{ m: "5px" }} severity='error'>{props.getFieldMeta(nestedInputName).error}</Alert>
                        )}
                    </Box>
                )
            })}
        </Box >
    )
}
