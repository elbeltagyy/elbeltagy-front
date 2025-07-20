import { Alert, Avatar, Card, CardHeader, IconButton, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import ReactPlayer from 'react-player'

import { MdCancel } from "react-icons/md";
import ModalStyled from '../../../style/mui/styled/ModalStyled';

const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/|shorts\/|.+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(\?.*)?$/;

export default function ShowVid({ file, removeFile }) {
    const theme = useTheme()

    const [open, setOpen] = useState(false)
    if (!youtubeRegex.test(file?.url)) {
        return <Alert sx={{ m: "5px" }} severity='error'>Invalid Youtube URL .</Alert>
    }
    
    return (
        <Card sx={{ maxWidth: 345, backgroundColor: theme.palette.background.alt }}>
            <ReactPlayer
                url={file?.url}
                width="100%"
                height="200px"
                muted={true}
                controls
            />

            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" sx={{ bgcolor: 'primary.main' }}>
                        v
                    </Avatar>
                }
                title={
                    file?.original_filename || file?.name && (
                        <Typography variant='body2' sx={{ maxWidth: '100px' }}>
                            {file?.original_filename || file?.name}
                        </Typography>
                    )}
                subheader={removeFile && file.size && `size: ${file.size / 1000000} mg`}
                action={
                    <IconButton aria-label="settings" onClick={() => setOpen(true)}>
                        {removeFile && <MdCancel style={{ color: 'red' }} />}
                    </IconButton>
                }
            />
            {removeFile ?
                <ModalStyled open={open} setOpen={setOpen} action={removeFile} />
                :
                <ModalStyled open={open} setOpen={setOpen} />
            }
        </Card>
    )
}
