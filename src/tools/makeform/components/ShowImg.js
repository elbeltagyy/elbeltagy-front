import { Avatar, Card, CardHeader, CardMedia, IconButton, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import ModalStyled from '../../../style/mui/styled/ModalStyled'
import { MdCancel } from 'react-icons/md'

export default function ShowImg({ file, removeFile }) {
    const theme = useTheme()
    const [open, setOpen] = useState(false)

    return (
        <Card sx={{ maxWidth: 345, backgroundColor: theme.palette.background.alt }}>
            <CardMedia
                component={"img"}
                sx={{ maxHeight: '400px' }}
                image={file?.url}
                title="Image"
            />
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        Ph
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
