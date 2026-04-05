import './home.css'
import { Box, IconButton, Typography, useTheme } from '@mui/material'

import Section from '../../style/mui/styled/Section'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
// import Image from '../ui/Image'
import { ScallyBtn } from '../../style/buttonsStyles'

import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import TextTyping from '../animations/Text.typing'
import { Link } from 'react-router-dom'
import { PiTelegramLogoFill } from "react-icons/pi";
import AnimatedCell from './AnimatedCell'
import TabInfo from '../ui/TabInfo'
import DnaAnimation from '../animations/dna/DnaAnimation'
import CardInfo from '../../style/mui/components/CardInfo'
//Hero
//Latest Course
//Services
//About Elbeltagy
//Testimonials
//Contact Us

function Hero() {
    const theme = useTheme()
    return (
        <Section>
            <FlexRow justifyContent={'space-around'} >
                {/* content */}
                <FlexColumn
                    minHeight={"80vh"}
                    maxWidth={"500px"}
                    gap={1}
                    alignItems={'flex-start'} >

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, position: 'relative', zIndex: 1 }}>
                        <FlexRow gap={1} alignItems={'center'}>
                            <span className='eyebrow-dot' />
                            <TabInfo i={1} count={'اكثر من 25 سنة فى التدريس'} />
                            <Typography variant='h5'
                                sx={{
                                    fontWeight: 700, zIndex: 5, fontFamily: 'second', mt: '-20px',
                                }} >
                                <TextTyping texts={["إفهم", 'طبّق', 'حِل']} cursorColor={theme.palette.primary.main} duration={2} />
                            </Typography>
                        </FlexRow>

                        <Typography fontSize={'2rem'} fontWeight={800} mb={{ sm: 0, md: '-50px' }}>مستر/</Typography>

                        <Typography variant='banner' color={'primary.light'} fontSize={'6rem'}>
                            <span style={{ textWrap: 'nowrap' }}>محمد البلتاجى</span>
                        </Typography>

                        <Typography fontSize={'1.1rem'} fontWeight={800} >معلم الاحياء و الجيولوجيا و العلوم المتكاملة لصفوف الثانوية و الثانوية العامة</Typography>

                    </Box>

                    <ScallyBtn endIcon={<img style={{ width: '30px' }} alt='كورسات الاحياء' src='/assets/bacteria.svg' />}
                        component={Link} to={'/grades/3'}
                        sx={{ minWidth: '250px', fontSize: '1.5rem', borderRadius: 1, fontWeight: 800 }}>كورسات الاحياء</ScallyBtn>

                    <Box display={'flex'} justifyContent={'space-around'} flexDirection={'row'} sx={{ minWidth: '250px' }}>
                        <IconButton component={Link} to={'https://www.facebook.com/Elbeltagy.Geo?mibextid'}>
                            <FaFacebook style={{
                                color: theme.palette.neutral[0],
                            }} />
                        </IconButton>

                        <IconButton component={Link} to={"https://api.whatsapp.com/send?phone=2001127078234&text=" + 'from Elbeltagy Platform'}>
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

                    <FlexRow gap={2} sx={{ justifyContent: 'center' }}>
                        <CardInfo icon={<img src='/assets/facebook.webp' style={{ width: '20px' }} />} desc={<Typography fontFamily={'second'} fontSize={'1.1rem'}>70K</Typography>} caption={'Facebook'} />
                        <CardInfo icon={<img src='/assets/youtube.png' style={{ width: '20px' }} />} desc={<Typography fontFamily={'second'} fontSize={'1.1rem'}>65K</Typography>} caption={'Youtube'} />
                        <CardInfo icon={<img src='/assets/honor.svg' style={{ width: '20px' }} />} desc={<Typography fontFamily={'second'} fontSize={'1.1rem'}>+99 </Typography>} caption={'اوائل جمهوريه'} />
                    </FlexRow>
                </FlexColumn>

                <Box sx={{ position: 'absolute', top: '100%', right: '115%', maxWidth: '500px', maxHeight: '500px', zIndex: -1 }}>
                    <AnimatedCell />
                </Box>

                {/* banner */}
                <FlexColumn position={'relative'} >

                    <Box sx={{
                        borderRadius: '8px',
                    }}>
                        <Typography component={'span'} id='earth' sx={{
                            width: 'clamp(60px, 10vw, 90px)',
                            height: 'clamp(60px, 10vw, 90px)',
                            display: 'inline-block',
                        }} />
                    </Box>

                    <Box sx={{
                        position: 'absolute',
                        right: '80%', top: '60%',
                        transform: 'rotate(-20deg) scale(.2)',
                    }}>
                        <DnaAnimation circleColor={theme.palette.primary.main} />
                    </Box>

                    <img style={{ maxWidth: '600px' }} alt='logo' src="/assets/baltg-hero.png" />
                </FlexColumn>
                {/* <Image maxWidth='500px' ratio={'auto'} img={'/assets/hero-geo.png'} /> */}
  
            </FlexRow> 


        </Section >
    )
}

export default Hero
