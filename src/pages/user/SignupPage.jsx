import { Box, Typography, useTheme, Link as MuiLink } from '@mui/material'
import { useEffect } from 'react'
import Section from '../../style/mui/styled/Section'
import BannerAuth from '../../components/ui/BannerAuth'
import { FlexRow } from '../../style/mui/styled/Flexbox'
import TextBorderAround from '../../components/ui/TextBorderAround'

import { FaFileSignature } from "react-icons/fa6";
import SignupForm from '../../components/auth/SignupForm'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'


const BUILD = "انشاء"
const ACCOUNT = 'حساب'


function SignupPage() {

    const theme = useTheme()
    const navigate = useNavigate()
    const user = useSelector(s => s.global.user)

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user, navigate])


    return (
        <Section sx={{ minHeight: '86vh' }}>

            <Helmet>
                <title>Sign up - انشئ حسابك الان على منصه البلتاجى</title>
                <meta name="description" content="انشئ حسابك الان, وابدا رحلتك فى منصه البلتاجى" />
                <meta property="og:title" content="انشئ حسابك الان على منصه البلتاجى" />
                <meta property="og:description" content="انشئ حسابك الان, وابدا رحلتك فى منصه البلتاجى" />
                <meta property="og:url" content="https://www.mrelbeltagy.com/signup" />
                <meta property="og:image" content="/assets/logo.webp" />
                <meta property="og:site_name" content="Elbeltagy Platform" />
            </Helmet>


            <FlexRow height={'100%'} justifyContent={'space-evenly'}>

                {/* banner */}
                <BannerAuth img={'/assets/signup.webp'} title={BUILD + ' ' + ACCOUNT} />

                {/* signup form */}
                <Box sx={{
                    maxWidth: { xs: "400px", lg: '600px' }
                }}>
                    {/* signup title */}
                    <FlexRow sx={{ justifyContent: 'center', my: '2rem' }}>

                        <TextBorderAround>

                            <span style={{ color: theme.palette.neutral[0] }}> {BUILD} </span>
                            <span style={{ marginRight: '10px', marginLeft: '10px' }}> {ACCOUNT}</span>

                            <FaFileSignature size='2rem' />
                        </TextBorderAround>

                    </FlexRow>

                    {/* signup form */}
                    <SignupForm />
                    <FlexRow gap={1}>
                        <Typography variant='body1'>
                            لديك حساب ؟
                        </Typography>
                        <MuiLink component={Link} to="/login" underline='hover' sx={{ cursor: 'pointer' }}> سجل دخولك الان !</MuiLink>
                    </FlexRow>
                </Box>

            </FlexRow>

            {/* form */}
        </Section >
    )
}

export default SignupPage
