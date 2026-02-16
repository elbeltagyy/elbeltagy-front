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
import SEOHelmetAsync from '../../tools/SEOHelmetAsync'
import { lang } from '../../settings/constants/arlang'


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

            <SEOHelmetAsync
                title={lang.SignUp.title}
                desc={lang.SignUp.description}
                url={lang.Website + "/signup"}
                isSiteLink={true}
            />

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
