import { Box, Typography } from '@mui/material'
import React from 'react'
import { lang } from '../../settings/constants/arlang'

const link = 'url(https://clipground.com/images/pattern-png-transparent-4.png)'
function BannerAuth({ img, title }) {
    return (
        <Box sx={{
            flexGrow: 1,
             minHeight: { xs: '40vh', md: '80vh' },
            width: '100%', maxWidth: { xs: '100%', md: '450px' },
            bgcolor: 'orange', borderRadius: '16px',
            backgroundImage: `url(${img})`, backgroundPosition: 'top 35% right 0', backgroundSize: 'cover',
            display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'clip'
        }}>
            <Box sx={{ width: '100%', height: '100%', bgcolor: 'black', position: 'absolute', opacity: '.4' }}></Box>
            <Typography variant='h2' sx={{ color: 'primary.main', letterSpacing: '4px', bgcolor: '#fff', p: '5px', borderRadius: '16px', textAlign: 'center' }}>
                {title}
            </Typography>
        </Box>
    )
}

export default BannerAuth
