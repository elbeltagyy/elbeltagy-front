import React from 'react'
import './home.css'
import Section from '../../style/mui/styled/Section'
import Grid from '../../style/vanilla/Grid'
import { Box, Typography } from '@mui/material'
import Battery from '../animations/battery/Battery'
import { FlexBetween, FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import Image from '../ui/Image'
import TitleWithDividers from '../ui/TitleWithDividers'
import Nucleus from '../animations/nucleus/Nucleus'


function Services() {
    return (
        <Section>
            <TitleWithDividers title={'مع عمو البلتاجى'} />
            <FlexRow width={"100%"} justifyContent={'center'}>
                <Typography variant='banner' textAlign={'center'} ><span style={{ color: 'orange', }}>المنهج عندنا</span> و المذاكره عليك </Typography>
            </FlexRow>
            <Grid>
                <Box width={'100%'} position={'relative'} sx={{ maxWidth: '450px' }}>
                    <Battery delay='delay-1'>
                        <FlexColumn sx={{ zIndex: 3, position: 'relative', color: 'grey.1000' }}>

                            <Box sx={{
                                width: '150px',
                                borderRadius: '8px',
                                p: '40px',
                                backgroundImage: 'url("data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3CclipPath id=%22a%22%3E%3Cpath fill=%22currentColor%22 d=%22M869.5 716.5Q750 933 528.5 883.5T185.5 667Q64 500 199.5 357T500 214q165 0 327 143t42.5 359.5Z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path=%22url(%23a)%22%3E%3Cpath fill=%22%23444cf7%22 d=%22M869.5 716.5Q750 933 528.5 883.5T185.5 667Q64 500 199.5 357T500 214q165 0 327 143t42.5 359.5Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");'
                            }}>
                                <div id='earth'></div>
                            </Box>

                            <Typography variant='subtitle1' mt={'-10px'} sx={{ p: '0 6px', textAlign: 'center' }}>
                                خبره <span style={{ color: 'orange' }}>24</span> سنه فى <span style={{ color: 'green' }}>الجيولوجيا</span>
                            </Typography>
                        </FlexColumn>
                    </Battery>
                </Box>

                <Box width={'100%'} position={'relative'} sx={{ maxWidth: '450px' }}>
                    <Battery delay='delay-1'>
                        <FlexColumn sx={{ zIndex: 3, position: 'relative', color: 'grey.1000' }}>

                            <FlexBetween sx={{ position: 'relative', my: '16px' }}>
                                <div className="cell-container pos-absolute">
                                    <div className="cell">
                                        <div className="nucleus">
                                            <img src="/assets/chromosome.svg" className="chromosome" />
                                            <img src="/assets/chromosome.svg" className="chromosome reverse" />
                                        </div>
                                        <img src="/assets/mitochondria.svg" className="organelle" />
                                        <img src="/assets/golgi.svg" className="organelle" />
                                        <img src="/assets/lysosome.svg" className="organelle" />

                                    </div>
                                </div>

                                <div className="cell-container reverse">
                                    <div className="cell">
                                        <div className="nucleus">
                                            <img src="/assets/chromosome.svg" className="chromosome" />
                                            <img src="/assets/chromosome.svg" className="chromosome reverse" />
                                        </div>
                                        <img src="/assets/mitochondria.svg" className="organelle" />
                                        <img src="/assets/golgi.svg" className="organelle" />
                                        <img src="/assets/lysosome.svg" className="organelle" />
                                    </div>
                                </div>

                            </FlexBetween>

                            {/* <Box sx={{
                                width: '150px',
                                borderRadius: '8px',
                                p: '40px',
                                backgroundImage: 'url("data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3CclipPath id=%22a%22%3E%3Cpath fill=%22currentColor%22 d=%22M869.5 716.5Q750 933 528.5 883.5T185.5 667Q64 500 199.5 357T500 214q165 0 327 143t42.5 359.5Z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path=%22url(%23a)%22%3E%3Cpath fill=%22%23444cf7%22 d=%22M869.5 716.5Q750 933 528.5 883.5T185.5 667Q64 500 199.5 357T500 214q165 0 327 143t42.5 359.5Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");'
                            }}>
                                <Image ratio={'auto'} img={'/assets/earth-service.webp'} />
                            </Box>

                             */}
                            <Typography variant='subtitle1' m={'auto'} sx={{ p: '0 6px', textAlign: 'center' }}>
                                هنفهمك <span style={{ color: 'orangered' }}>الاحياء</span> بشياكه <span style={{ color: 'green' }}>بشرح</span> و <span style={{ color: 'green' }}>اسئله</span>  هتسهل عليك الماده
                            </Typography>
                        </FlexColumn>
                    </Battery>
                </Box>

                <Box width={'100%'} position={'relative'} sx={{ maxWidth: '450px' }}>
                    <Battery delay='delay-1'>
                        <FlexColumn sx={{ zIndex: 3, position: 'relative', color: 'grey.1000' }}>

                            <Box sx={{
                                width: '150px',
                                borderRadius: '8px',
                                p: '40px',
                                backgroundImage: 'url("data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3CclipPath id=%22a%22%3E%3Cpath fill=%22currentColor%22 d=%22M869.5 716.5Q750 933 528.5 883.5T185.5 667Q64 500 199.5 357T500 214q165 0 327 143t42.5 359.5Z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path=%22url(%23a)%22%3E%3Cpath fill=%22%23444cf7%22 d=%22M869.5 716.5Q750 933 528.5 883.5T185.5 667Q64 500 199.5 357T500 214q165 0 327 143t42.5 359.5Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");'
                            }}>
                                <Nucleus />
                            </Box>

                            <Typography variant='subtitle1' mt={'-10px'} sx={{ p: '0 6px', textAlign: 'center' }}>
                                إن شاء الله <span style={{ color: 'red' }}>العلوم المتكامله</span> معانا غير اى حد
                            </Typography>
                        </FlexColumn>
                    </Battery>
                </Box>

            </Grid>
        </Section >
    )
}
//textDecorationLine: 'underline', textDecorationStyle: 'solid', textDecorationColor: 'red'
export default Services
