import * as React from 'react';
import ShowVid from './ShowVid';
import ShowImg from './ShowImg';
import { Alert } from '@mui/material';
import ShowPdf from './ShowPdf';


export default function ShowFileSettings({ file, removeFile }) {
    // console.log(file)
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
        <Alert severity='error'>sorry, un supported file</Alert>
    );
}