import { memo } from 'react'
import { useField } from 'formik'
import { Alert, Box, Radio } from '@mui/material'

import MakeInput from '../MakeInput'
import { FlexColumn } from '../../../style/mui/styled/Flexbox'

function MakeChoosed({ inputName, input, fromInputName, targetInputName, letter }) {

    const [{ value }, { error, touched }, helpers] = useField(targetInputName)
    const [{ value: fromValue }] = useField(fromInputName)

    const setValue = () => {
        helpers.setValue(fromValue)
    }

    const controlProps = () => ({
        checked: fromValue === value && value ? true : false,
        onChange: setValue,
    });

    return (
        <FlexColumn>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }} >
                <FlexColumn>
                    {letter} -
                    <Radio {...controlProps()} color="success"
                    />
                </FlexColumn>
                <MakeInput input={input} nestedInputName={inputName} />
            </Box>
            {error && touched && (
                <Alert sx={{ m: "5px" }} severity='error'>{error}</Alert>
            )}
        </FlexColumn>
    )
}

export default memo(MakeChoosed)
