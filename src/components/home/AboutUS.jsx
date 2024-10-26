import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'

import { FlexColumn } from '../../style/mui/styled/Flexbox'
import Image from '../ui/Image'
import VideoYoutube from '../content/VideoYoutube'
const SERVICES_HEADER1 = 'كيفية تحقيق اقصى'
const ServicesHeader2 = 'استفاده من'
const ServicesHeader3 = 'منصتنا'



function LogosYoutubeIcon({ size, ...props }) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width={size || "1.43em"} height={size || '1rem'} viewBox="0 0 256 180" {...props}><path fill="#f00" d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134"></path><path fill="#fff" d="m102.421 128.06l66.328-38.418l-66.328-38.418z"></path></svg>);
}

function AboutUS() {

    const theme = useTheme()
    return (
        <Box sx={{
            // minHeight: '100vh',
            // background: 'linear-gradient(to left, #fdc830, #f37335)',
            background: '#ffd549',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: '26px 12px',
            width: '100%',
            position: 'relative'
        }}>
            <Box sx={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                position: 'absolute', top: 0, left: '0',
                width: '100%', height: '100%', zIndex: 1
            }} />

            <FlexColumn sx={{ zIndex: 2, width: '100%' }}>

                <FlexColumn sx={{ position: 'relative' }}>
                    <Image ratio={'auto'} img={'/assets/quote.png'} sx={{ zIndex: 0, filter: 'drop-shadow(4px 5px 4px rgba(100,100,100,.1))' }} />

                    <Typography variant='h6' component={'h5'} sx={{
                        color: '#16264c',
                        fontFamily: 'Lemonada,sans-serif',
                        zIndex: 1, position: 'absolute', top: '50%', transform: 'translateY(-50%)', fontSize: '1.8rem',//{ xs: '.9rem', sm: '1.5rem' }
                    }}>
                        شد حيلك يا بطل
                        <span style={{ color: '' }}> متضيعش وقت</span>
                        <span style={{ color: '' }}> مستقبلك بين ايديك</span>
                    </Typography>
                </FlexColumn>


                <Box sx={{
                    width: '100%', maxWidth: '800px', bgcolor: '#ddd', borderRadius: '16px', boxShadow: theme.shadows[20], mt: '16px'
                }}>
                    <VideoYoutube url={'https://youtu.be/ywGV4VT0gKU?si=0924vSlwBPf6-ILU'} />
                    {/* <LogosYoutubeIcon size={'3rem'} />  aspectRatio: '2/1',*/}
                </Box>
            </FlexColumn>

        </Box>
    )
}

export default AboutUS
