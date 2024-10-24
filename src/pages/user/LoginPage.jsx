import React, { useEffect } from 'react'
import HeaderContent from '../../components/ui/HeaderContent'

import Section from "../../style/mui/styled/Section"
import TitleSection from '../../components/ui/TitleSection'
import { LoginAnimatedIcon, ReactLoginIcon } from '../../components/ui/svg/Registers'
import LoginForm from '../../components/auth/LoginForm'
import { Box, Typography, useTheme, Link as MuiLink } from '@mui/material'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import DnaAnimation from '../../components/animations/dna/DnaAnimation'
import { RtArrow } from '../../components/header/Icons'
import BannerAuth from '../../components/ui/BannerAuth'
import TextBorderAround from '../../components/ui/TextBorderAround'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { lang } from '../../settings/constants/arlang'



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


    return (
        <Section sx={{ minHeight: '86vh' }}>

            <FlexRow height={'100%'} justifyContent={'space-evenly'}>

                {/* banner */}
                <BannerAuth title={lang.LOGIN_ENTRY} img={'https://wallpaperaccess.com/full/17598.jpg'} />

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
                    </Box>

                </Box>
            </FlexRow>

            {/* form */}
        </Section >
    )
}

export default LoginPage
