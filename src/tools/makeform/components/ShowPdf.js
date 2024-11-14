import { Button } from '@mui/material';
import React, { useState } from 'react'
import { MdCancel } from 'react-icons/md';
import ModalStyled from '../../../style/mui/styled/ModalStyled';

function ShowPdf({ file, removeFile }) {
    const [open, setOpen] = useState(false)

    return (
        <div style={{ width: '100%', minHeight: '50vh' }}>
            <iframe
                src={file?.url}
                style={{ width: '100%', height: '50vh', border: 'none' }}
                title="iframe Viewer"
            />
            {removeFile && (
                <Button onClick={() => setOpen(true)} sx={{ m: "12px auto" }} color='error' variant='contained' endIcon={<MdCancel style={{ color: '#fff' }} />}>ازاله الملف</Button>
            )}
            {removeFile &&
                <ModalStyled open={open} setOpen={setOpen} action={removeFile} />
            }
        </div>
    );
}

export default ShowPdf
