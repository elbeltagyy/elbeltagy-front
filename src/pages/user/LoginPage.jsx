import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';

import Section from "../../style/mui/styled/Section"
import { LoginAnimatedIcon, ReactLoginIcon } from '../../components/ui/svg/Registers'
import LoginForm from '../../components/auth/LoginForm'
import { Box, Typography, useTheme, Link as MuiLink } from '@mui/material'
import { FlexRow } from '../../style/mui/styled/Flexbox'

import BannerAuth from '../../components/ui/BannerAuth'
import TextBorderAround from '../../components/ui/TextBorderAround'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { lang } from '../../settings/constants/arlang'
import ModalStyled from '../../style/mui/styled/ModalStyled'

function LoginPage() {

    const theme = useTheme()
    const navigate = useNavigate()
    const user = useSelector(s => s.global.user)
    const location = useLocation()
    const isPrev = location.state

    useEffect(() => {
        if (user && isPrev) {
            navigate(-1)
        }
        if (user) {
            navigate('/')
        }
    }, [user, navigate])
    const [open, setOpen] = useState(false)

    return (
        <Section sx={{ minHeight: '86vh' }}>

            <Helmet>
                <title>Login - تسجيل الدخول لمنصه البلتاجى</title>
                <meta name="description" content="سجل دخولك الان, وابدا رحلتك فى منصه البلتاجى" />
                <meta property="og:title" content="تسجيل الدخول لمنصه البلتاجى" />
                <meta property="og:description" content="سجل دخولك الان, وابدا رحلتك فى منصه البلتاجى" />
                <meta property="og:url" content="https://mrelbeltagy.com/login" />
                <meta property="og:image" content="/assets/logo.webp" />
                <meta property="og:site_name" content="Elbeltagy Platform" />
            </Helmet>


            <FlexRow height={'100%'} justifyContent={'space-evenly'}>

                {/* banner */}
                <BannerAuth title={lang.LOGIN_ENTRY} img={'/assets/login.jpg'} />

                {/* Login form */}
                <Box sx={{
                    maxWidth: { xs: "400px", lg: '600px' }
                }}>
                    {/* login title */}
                    <FlexRow sx={{ justifyContent: 'center', my: '2rem' }}>

                        <TextBorderAround>

                            <ReactLoginIcon style={{ margin: '0 10px' }} size={'2rem'} />
                            <span style={{ color: theme.palette.neutral[0] }}> {lang.LOGIN} </span>
                            <span style={{ marginRight: '10px' }}> {lang.ENTRY}</span>
                            <div style={{
                                transform: 'rotate(180deg)'
                            }}>
                                <LoginAnimatedIcon size='2rem' />
                            </div>
                        </TextBorderAround>

                    </FlexRow>

                    {/* login form */}
                    <Box sx={{}}>
                        <LoginForm />
                        <FlexRow gap={1}>
                            <Typography variant='body1'>
                                ليس لديك حساب ؟
                            </Typography>
                            <MuiLink component={Link} to="/signup" underline='hover' sx={{ cursor: 'pointer' }}>انشئ حساب الان !</MuiLink>
                        </FlexRow>
                        <MuiLink component={Link} to="/signup" onClick={(e) => {
                            e.preventDefault()
                            setOpen(true)
                        }} underline='always' sx={{ cursor: 'pointer', mt: '4px' }}> هل نسيت كلمه السر ؟</MuiLink>
                    </Box>

                </Box>
            </FlexRow>

            {/* form */}
            <ModalStyled
                title={'هل نسيت كلمه السر ؟'}
                desc={'إذا كنت قد نسيت كلمه السر, او تواجه مشكله فى تسجيل الدخول تواصل مع الدعم من الرقم المسجل به لاعاده ضبط الحساب'}
                open={open}
                setOpen={setOpen}
                agree='التوصل مع الدعم'
                action={() => {
                    window.location.href = "https://api.whatsapp.com/send?phone=" + '2001553251467' + "&text=" + 'لقد نسيت كلمه السر';
                }}
            />
        </Section >
    )
}

export default LoginPage
