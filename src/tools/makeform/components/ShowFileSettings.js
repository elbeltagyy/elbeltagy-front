import * as React from 'react';
import ShowVid from './ShowVid';
import ShowImg from './ShowImg';
import { Alert, Button } from '@mui/material';
import ShowPdf from './ShowPdf';
import { FlexColumn } from '../../../style/mui/styled/Flexbox';


export default function ShowFileSettings({ file, removeFile }) {
    const fileType = file?.resource_type?.split("/")[0] || file?.type?.split("/")[0] || null

    const [realFile, setFile] = React.useState({})

    // original_filename secure_url url  size resource_type
    React.useEffect(() => {
        if (file?.resource_type) {
            setFile(file)
        } else if (file?.type) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFile({
                    original_filename: file.name,
                    url: reader.result,
                    size: file.size,
                    format: file.type.split("/")[1]
                })
            }
            reader.readAsDataURL(file)
        }
    }, [file])

    if (fileType === "video") {
        return <ShowVid file={realFile} removeFile={removeFile} />
    }

    if (fileType === "image") {
        return <ShowImg file={realFile} removeFile={removeFile} />
    }

    if (fileType === 'application') {
        return <ShowPdf file={realFile} removeFile={removeFile} />
    }
    return (
        <FlexColumn>
            <Alert severity='error'>sorry, un supported file</Alert>
            <Button variant='outlined' color='error' onClick={removeFile}>ازاله الملف</Button>
        </FlexColumn>
    );
}