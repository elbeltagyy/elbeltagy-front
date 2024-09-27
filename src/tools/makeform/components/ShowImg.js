import { Avatar, Card, CardHeader, CardMedia, IconButton, useTheme } from '@mui/material'
import React, { useState } from 'react'
import ModalStyled from '../../../style/mui/styled/ModalStyled'
import { MdCancel } from 'react-icons/md'

export default function ShowImg({ file , removeFile}) {
    const theme = useTheme()
    const [open, setOpen] = useState(false)

    return (
        <Card sx={{ maxWidth: 345, backgroundColor: theme.palette.background.alt }}>
            <CardMedia
                component={"img"}
                sx={{ height: 140 }}
                image={file.url}
                title="green iguana"
            />
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        R
                    </Avatar>
                }
                title={file.original_filename}
                subheader={`size: ${file.size / 1000000} mg`}
                action={
                    <IconButton aria-label="settings" onClick={() => setOpen(true)}>
                        <MdCancel style={{ color: 'red' }} />
                    </IconButton>
                }
            />

            <ModalStyled open={open} setOpen={setOpen} action={removeFile} />

        </Card>
    )
}
