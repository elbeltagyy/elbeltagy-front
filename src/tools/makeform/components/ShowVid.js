import { Avatar, Card, CardHeader, CardMedia, IconButton, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import ReactPlayer from 'react-player'

import { MdCancel } from "react-icons/md";
import ModalStyled from '../../../style/mui/styled/ModalStyled';


export default function ShowVid({ file, removeFile }) {
    const theme = useTheme()

    const [open, setOpen] = useState(false)

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
                title={<Typography variant='body2' sx={{maxWidth: '100px'}}>
                    {file?.original_filename || file?.name || "لم يتم العثور عليه"}
                </Typography>}
                subheader={removeFile && file.size && `size: ${file.size / 1000000} mg`}
                action={
                    <IconButton  aria-label="settings" onClick={() => setOpen(true)}>
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
