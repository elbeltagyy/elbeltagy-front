import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import CardInfo from '../../style/mui/components/CardInfo'
import Separator from './Separator'
import Image from './Image'

const iiinn = ["icon, caption, desc"]

function HeaderContent({ title, body, infos = [], img, children, height = '86vh' }) {

    const theme = useTheme()

    return (
        <>
            <Box sx={{
                minHeight: height, width: '100%', position: 'relative', p: '16px 8px', zIndex: 1,
                borderRadius: '16px',
                backgroundImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='52' viewBox='0 0 52 52'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M0 17.83V0h17.83a3 3 0 0 1-5.66 2H5.9A5 5 0 0 1 2 5.9v6.27a3 3 0 0 1-2 5.66zm0 18.34a3 3 0 0 1 2 5.66v6.27A5 5 0 0 1 5.9 52h6.27a3 3 0 0 1 5.66 0H0V36.17zM36.17 52a3 3 0 0 1 5.66 0h6.27a5 5 0 0 1 3.9-3.9v-6.27a3 3 0 0 1 0-5.66V52H36.17zM0 31.93v-9.78a5 5 0 0 1 3.8.72l4.43-4.43a3 3 0 1 1 1.42 1.41L5.2 24.28a5 5 0 0 1 0 5.52l4.44 4.43a3 3 0 1 1-1.42 1.42L3.8 31.2a5 5 0 0 1-3.8.72zm52-14.1a3 3 0 0 1 0-5.66V5.9A5 5 0 0 1 48.1 2h-6.27a3 3 0 0 1-5.66-2H52v17.83zm0 14.1a4.97 4.97 0 0 1-1.72-.72l-4.43 4.44a3 3 0 1 1-1.41-1.42l4.43-4.43a5 5 0 0 1 0-5.52l-4.43-4.43a3 3 0 1 1 1.41-1.41l4.43 4.43c.53-.35 1.12-.6 1.72-.72v9.78zM22.15 0h9.78a5 5 0 0 1-.72 3.8l4.44 4.43a3 3 0 1 1-1.42 1.42L29.8 5.2a5 5 0 0 1-5.52 0l-4.43 4.44a3 3 0 1 1-1.41-1.42l4.43-4.43a5 5 0 0 1-.72-3.8zm0 52c.13-.6.37-1.19.72-1.72l-4.43-4.43a3 3 0 1 1 1.41-1.41l4.43 4.43a5 5 0 0 1 5.52 0l4.43-4.43a3 3 0 1 1 1.42 1.41l-4.44 4.43c.36.53.6 1.12.72 1.72h-9.78zm9.75-24a5 5 0 0 1-3.9 3.9v6.27a3 3 0 1 1-2 0V31.9a5 5 0 0 1-3.9-3.9h-6.27a3 3 0 1 1 0-2h6.27a5 5 0 0 1 3.9-3.9v-6.27a3 3 0 1 1 2 0v6.27a5 5 0 0 1 3.9 3.9h6.27a3 3 0 1 1 0 2H31.9z'%3E%3C/path%3E%3C/svg%3E")
            `, //https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/background/background-6.webp
                backgroundPosition: 'top 35% right 0', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', boxShadow: theme.shadows[8],
                bgcolor: '#9400ff'
            }}>
                <Box sx={{
                    position: 'absolute', borderRadius: '16px', top: '0', right: '0', width: '100%', height: '100%',
                    background: `linear-gradient(to left, ${theme.palette.primary.light} 80%, ${theme.palette.primary.dark} 80%)`, opacity: .9 //linear-gradient(to left, ${theme.palette.primary.light} 30%, ${theme.palette.primary.dark} 75%) `linear-gradient(45deg,transparent 42%,#9400ff 42%)`
                }} />
                <FlexColumn sx={{ zIndex: 1, p: '30px 15px' }}>


                    <Typography mr={'auto'} variant='h5' sx={{ color: 'grey.0', zIndex: 1, textShadow: theme.shadows[8] }}>{title} </Typography>

                    <Typography mr={'auto'} variant='body1' sx={{ color: '#fff', zIndex: 1, maxWidth: '800px', my: '16px' }}>
                        {body} <br />
                    </Typography>

                    <FlexRow sx={{ width: '100%', position: 'relative', gap: '10px', justifyContent: 'center', mb: '200px', mt: '40px' }}>
                        {infos.length > 0 && infos.map((info, i) => (
                            <CardInfo key={i} icon={info.icon} caption={info.caption} desc={info.desc} />
                        ))}
                    </FlexRow>

                </FlexColumn>

            </Box>
            <Box sx={{
                zIndex: 5, position: 'relative',
                border: '0px solid transparent', borderRadius: '16px', mt: '-150px',
                mx: 'auto',// boxShadow: img ? theme.shadows[24] : 'none',
                maxWidth: '100vh', minWidth: '250px', width: '100%', p: '16px', bgcolor: 'background.default'
            }}>
                {img ?
                    <Image img={img} />
                    : children}
            </Box>
        </>

    )
}
{/* <img src={img} style={{ borderRadius: '16px', maxHeight: '500px' }} /> */ }
export default HeaderContent
