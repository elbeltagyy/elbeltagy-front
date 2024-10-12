import React from 'react'
import './home.css'
import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'

import Section from '../../style/mui/styled/Section'
import { FlexBetween, FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import Separator from '../ui/Separator'
import Image from '../ui/Image'
import { FilledHoverBtn, ScallyBtn } from '../../style/buttonsStyles'

import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import TextTyping from '../animations/Text.typing'
import { link } from 'react-router-dom'

function Hero() {
    const theme = useTheme()
    const isMobileScreen = useMediaQuery('(max-width:600px)');

    return (
        <Section>

            <FlexRow justifyContent={'center'} gap={'80px'} sx={{ minHeight: '88vh' }}>

                {/* content */}
                <FlexColumn
                    flex={1}
                    minHeight={"300px"}
                    maxWidth={"500px"}
                    gap={'.7rem'}
                    alignItems={'flex-start'}
                    sx={{
                        animation: 'getIntoRt 1s ease', my: "50px"
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
                    <Box sx={{ position: 'relative', mt: '-16px', mb: '8px' }}>

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
                    <ScallyBtn component={link} to={'/grades/1'} sx={{ minWidth: '250px', fontSize: '1.5rem', borderRadius: 1 }}>كورسات الچيولوچيا</ScallyBtn>

                    <Box display={'flex'} justifyContent={'space-around'} flexDirection={'row'} sx={{ minWidth: '250px' }}>
                        <IconButton>
                            <FaFacebook style={{
                                color: theme.palette.neutral[0],
                            }} />
                        </IconButton>

                        <IconButton>
                            <FaWhatsapp style={{
                                color: theme.palette.neutral[0],
                            }} />
                        </IconButton>

                        <IconButton>
                            <FaYoutube style={{
                                color: theme.palette.neutral[0],
                            }} />
                        </IconButton>

                        <IconButton>
                            <FaXTwitter style={{
                                color: theme.palette.neutral[0],
                            }} />
                        </IconButton>
                    </Box>

                </FlexColumn>

                {/* banner */}
                <Box sx={{ maxWidth: '500px' }}>
                    <Image img={'/assets/teacher-nobg.webp'} />
                </Box>


            </FlexRow>


        </Section>
    )
}

export default Hero
