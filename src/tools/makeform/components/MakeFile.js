import { Alert, Box, Button } from '@mui/material'
import { memo, useRef } from 'react'
// import { buttonStyle } from '../../../../styles/buttonsStyles'
import ShowFileSettings from './ShowFileSettings'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { useDeleteFileMutation } from '../../../toolkit/apis/filesApi';
import usePostData from '../../../hooks/usePostData'
import WrapperHandler from '../../WrapperHandler';

function MakeFile({ inputName, input, value, setValue, showError, error }) {
    const fileRef = useRef(null)
    const [sendData, status] = useDeleteFileMutation()
    const [deleteFile] = usePostData(sendData)

    if (input.disabled) return <></>
    const removeFile = async () => {
        if (value?.url) {
            await deleteFile({ ...value })
        }
        setValue('')
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
                    // props.setFieldTouched(inputName, true)
                    setValue(e.target.files[0])
                }}
            />
            <Button
                disabled={input.disabled || status.isLoading || value ? true : false}
                style={{ width: "auto" }}
                onClick={() => fileRef.current.click()}>
                {value ? 'امسح الصوره اولا للتعديل' : input.label}
                <AddCircleOutlineIcon sx={{ m: '0 8px' }} /> </Button>

            {value && (
                <>
                    <ShowFileSettings file={value} removeFile={removeFile} />
                    <WrapperHandler status={status} />
                </>
            )}
            {showError && (
                <Alert sx={{ my: "5px" }} severity='error'>{error}</Alert>
            )}
        </Box>
    )
}

export default memo(MakeFile)
