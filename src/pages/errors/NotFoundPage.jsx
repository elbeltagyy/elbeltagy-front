import React from 'react'
import HeaderContent from '../../components/ui/HeaderContent'
import Section from '../../style/mui/styled/Section'
import { Box, Typography, useTheme } from '@mui/material'
import Image from '../../components/ui/Image'
import { OutLinedHoverBtn } from '../../style/buttonsStyles'
import { RtArrow } from '../../components/icons/Icons'
import { Link, useNavigate } from 'react-router-dom'

function NotFoundPage() {
    const theme = useTheme()

    const navigate = useNavigate()

    const onCLick = (e) => {
        e.preventDefault()
        navigate('/', { replace: true })
    }


    return (
        <Section>
            <Box sx={{
                minHeight: '80vh', width: '100%', position: 'relative', p: '16px 8px', zIndex: 1,
                borderRadius: '16px',
                backgroundImage: `
                https://www.artzstudio.com/content/images/wordpress/2020/05/404-error-not-found-page-lost.png
            `, //https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/background/background-6.webp
                backgroundPosition: 'top 35% right 0', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', boxShadow: theme.shadows[8],
                bgcolor: '#9400ff', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
            }}>
                <Box sx={{
                    position: 'absolute', borderRadius: '16px', top: '0', right: '0', width: '100%', height: '100%',
                    background: `linear-gradient(to left, ${theme.palette.primary.light} 80%, ${theme.palette.primary.dark} 80%)`, zIndex: -1,
                    opacity: .9 //linear-gradient(to left, ${theme.palette.primary.light} 30%, ${theme.palette.primary.dark} 75%) `linear-gradient(45deg,transparent 42%,#9400ff 42%)`
                }} />

                <Image img={'/assets/logo.webp'} ratio={'auto'} sx={{ maxWidth: "250px" }} />

                <Typography variant='h5' sx={{ color: '#fff', my: '16px' }}>404 - هذه الصفحه غير موجوده</Typography>
                <OutLinedHoverBtn onClick={onCLick} component={Link} to="/" startIcon={<RtArrow size='1.5rem' />}>الذهاب الي الصفحه الرئيسيه</OutLinedHoverBtn>
            </Box>
        </Section>

    )
}

export default NotFoundPage
