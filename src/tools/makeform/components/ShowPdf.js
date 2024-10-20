import { Button } from '@mui/material';
import React from 'react'
import { MdCancel } from 'react-icons/md';

function ShowPdf({ file, removeFile }) {
    // console.log(file)
    return (
        <div style={{ width: '100%', minHeight: '50vh' }}>
            <iframe
                src={file?.url}
                style={{ width: '100%', height: '50vh', border: 'none' }}
                title="iframe Viewer"
            />
            {removeFile && (
                <Button onClick={removeFile} sx={{ m: "12px auto" }} color='error' variant='contained' endIcon={<MdCancel style={{ color: '#fff' }} />}>ازاله الملف</Button>
            )}
        </div>
    );
}

export default ShowPdf
