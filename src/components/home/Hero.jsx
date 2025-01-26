import './home.css'
import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'

import Section from '../../style/mui/styled/Section'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import Separator from '../ui/Separator'
import Image from '../ui/Image'
import { ScallyBtn } from '../../style/buttonsStyles'

import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import TextTyping from '../animations/Text.typing'
import { Link } from 'react-router-dom'
import { PiTelegramLogoFill } from "react-icons/pi";

function Hero() {
    const theme = useTheme()
    const isMobileScreen = useMediaQuery('(max-width:600px)');

    return (
        <Section>

            <FlexRow justifyContent={'center'} >

                {/* content */}
                <FlexColumn
                    flex={1}
                    minHeight={"80vh"}
                    maxWidth={"500px"}
                    gap={'.7rem'}
                    alignItems={'flex-start'}
                    sx={{
                        animation: 'getIntoRt 1s ease',
                    }} >
                    <Box sx={{ position: 'relative' }} >

                        <Typography variant='h2' component={'h1'}
                            sx={{ WebkitTextStroke: "4px  cyan", color: 'transparent', opacity: '.2', position: 'absolute', left: 0, top: '-80px', minWidth: "200px" }}  >
                            الجيولوجيا فى شوال
                        </Typography>

                        <Typography variant='banner' component={'h1'} sx={{ scale: isMobileScreen ? '1.1' : '1' }}  >
                            مع م/ <br /> <span style={{ color: 'orange', }}>البلتاجى</span> جيو
                        </Typography>

                    </Box>

                    <Separator sx={{ maxWidth: '300px' }} />
                    <Box sx={{ position: 'relative', mb: '8px' }}>

                        <Box sx={{
                            bgcolor: 'cyan',
                            width: '100px',
                            height: '60px',
                            position: 'absolute',
                            top: 0,
                            right: 10,
                            zIndex: 0, transform: 'skew(10deg)'
                        }}></Box>

                        <Typography variant='h5' component={'h6'} lineHeight={'2.5rem'} sx={{ fontWeight: 700, fontSize: "2.5rem", color: 'orange', zIndex: 5, minWidth: '100px', position: 'relative' }} >
                            <TextTyping texts={["إفهم", 'طبّق', 'حِل']} cursorColor={theme.palette.primary.main} duration={2} />
                        </Typography>
                    </Box>

                    {/* <Typography variant='h6'>إحنا نغيب  غبتنا و نرجع بهيبتنا</Typography> */}
                    <ScallyBtn endIcon={<img style={{ width: '30px' }} alt='كورسات الچيولوچيا' src='/assets/earth-icon.svg' />} component={Link} to={'/grades/2'} sx={{ minWidth: '250px', fontSize: '1.5rem', borderRadius: 1 }}>كورسات الچيولوچيا</ScallyBtn>

                    <Box display={'flex'} justifyContent={'space-around'} flexDirection={'row'} sx={{ minWidth: '250px' }}>
                        <IconButton component={Link} to={'https://www.facebook.com/Elbeltagy.Geo?mibextid'}>
                            <FaFacebook style={{
                                color: theme.palette.neutral[0],
                            }} />
                        </IconButton>

                        <IconButton component={Link} to={"https://api.whatsapp.com/send?phone=2001553251467&text="}>
                            <FaWhatsapp style={{
                                color: theme.palette.neutral[0],
                            }} />
                        </IconButton>

                        <IconButton component={Link} to={'https://youtube.com/@mohammedelbltagy?si=iGiK5HHUyvo8Uyye'}>
                            <FaYoutube style={{
                                color: theme.palette.neutral[0],
                            }} />
                        </IconButton>

                        <IconButton component={Link} to={'https://t.me/mrmoelbeltagy'}>
                            <PiTelegramLogoFill style={{
                                color: theme.palette.neutral[0],
                            }} />
                        </IconButton>
                    </Box>

                </FlexColumn>

                {/* banner */}
                <FlexColumn>
                    <img style={{ maxWidth: '600px', marginTop: '-50px', minWidth: '450px' }} alt='logo' src="/assets/hero-geo.png" />
                </FlexColumn>
                {/* <Image maxWidth='500px' ratio={'auto'} img={'/assets/hero-geo.png'} /> */}

            </FlexRow>


        </Section>
    )
}

export default Hero
