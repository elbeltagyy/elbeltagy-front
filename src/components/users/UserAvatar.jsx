import { Avatar, Button } from '@mui/material'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import Image from '../ui/Image'
import { useState } from 'react'

function UserAvatar({ user, url = false }) {
    const [fileConfirm, setFileConfirm] = useState()
    const [openFileModal, setOpenFileModal] = useState(false)

    return (
        <>
            <Button sx={{ width: '100%' }} onClick={() => {
                if (url || user?.avatar?.url) {
                    setFileConfirm(url || user?.avatar?.url)
                    setOpenFileModal(true)
                }
            }}>
                <Avatar alt={user?.name?.toUpperCase() || 'E'} src={url || user?.avatar?.url || "#"}
                    sx={{
                        objectFit: 'contain',
                        bgcolor: 'primary.main',
                        fontWeight: 600,
                        color: 'grey.0'
                    }} />
            </Button>
            <ModalStyled open={openFileModal} setOpen={setOpenFileModal} >
                <Image img={fileConfirm} />
            </ModalStyled>
        </>
    )
}

export default UserAvatar
