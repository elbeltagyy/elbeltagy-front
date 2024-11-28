import { Box, FormControlLabel, Radio } from '@mui/material'
import React from 'react'
import MakeInput from '../MakeInput'

function MakeChoosed({ props, inputName, input, fromValue, targetInputName }) {


    const setValue = (e) => {
        // console.log(fromValue)
        // console.log(targetValue)
        props.setFieldValue(targetInputName, fromValue)
    }

    const targetValue = props.getFieldMeta(targetInputName).value

    const controlProps = () => ({
        checked: fromValue === targetValue && targetValue ? true : false,
        onChange: setValue,
    });

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }} >
            <Box>
                <Radio {...controlProps()} color="success" />
            </Box>
            <MakeInput input={input} props={props} nestedInputName={inputName} />
        </Box>
    )
}

export default MakeChoosed
