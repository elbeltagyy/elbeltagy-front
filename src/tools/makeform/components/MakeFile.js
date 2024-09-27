import { Alert, Box, Button } from '@mui/material'
import React, { useRef } from 'react'
// import { buttonStyle } from '../../../../styles/buttonsStyles'
import ShowFileSettings from './ShowFileSettings'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { hasError } from '../constants/hasError';

function MakeFile({ inputName, input, props, value }) {
    const fileRef = useRef(null)

    const removeFile = () => {
        props.setFieldValue(inputName, '')
    }
    return (
        <Box m={"6px 0"} width={'100%'}>
            <input
                ref={fileRef}
                type="file"
                label="file"
                hidden
                name={inputName}
                onChange={(e) => {
                    props.setFieldTouched(inputName, true)
                    props.setFieldValue(inputName, e.target.files[0])
                }}
            />
            <Button
                disabled={input.disabled || false}
                style={{ width: "auto" }} onClick={() => fileRef.current.click()}>{input.label} <AddCircleOutlineIcon sx={{m: '0 8px'}} /> </Button>


            {value && (
                <ShowFileSettings file={value} removeFile={removeFile} />
            )}

            {hasError(props, inputName) && (
                <Alert sx={{ my: "5px" }} severity='error'>{props.errors[inputName]}</Alert>
            )}
        </Box>
    )
}

export default MakeFile
