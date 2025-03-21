import Section from '../../style/mui/styled/Section'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import { FilledHoverBtn } from '../../style/buttonsStyles'
import { Link } from 'react-router-dom'


function HeroScience() {
    const isMobileScreen = useMediaQuery('(max-width:600px)');


    return (
        <Section sx={{
            backgroundColor: 'darkslategray', position: 'relative',
            minHeight: '100vh',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}>
            {/* Hero Title */}
            <FlexColumn>
                <Box sx={{
                    bgcolor: 'orange',
                    width: '300px',
                    mt: "16px",
                    height: '60px',
                    position: 'absolute',
                    zIndex: 0, transform: ' skew(10deg)'
                }}></Box>

                <Typography variant='h2' textAlign={'center'} sx={{ zIndex: 1, color: 'grey.0', fontSize: { xs: '1.5rem', sm: '2.5rem' } }}>أنت فاكرنا هنسيبك ولا إي</Typography>
            </FlexColumn>

            <FlexColumn gap={'40px'} sx={{ minHeight: '88vh', flexDirection: { xs: 'column-reverse', md: 'row' }, }} >

                {/* banner */}
                <img style={{ maxWidth: '600px', marginTop: '-50px', minWidth: '450px' }} alt='Science' src="/assets/hero-science.png" />

                {/* <Box sx={{
                    maxWidth: '500px'
                }}>
                    <Image ratio={'auto'} img={'/assets/hero-science.png'} />
                </Box> */}

                {/* content */}
                <FlexColumn sx={{
                    minHeight: "300px",
                    maxWidth: "500px",
                    alignItems: 'flex-start',
                    mt: '2rem'
                }}>
                    <Typography variant='banner' component={'h1'} sx={{ scale: isMobileScreen ? '1.1' : '1' }}  >
                        م/ <span style={{ color: 'orange', }}>محمد البلتاجى</span>
                    </Typography>
                    <Typography variant='subBanner' color={'grey.0'}>منصتك فى العلوم المتكامله</Typography>
                    {/* <Typography variant='subBanner' color={'grey.0'}> شرفتنا</Typography> */}
                    <FlexRow sx={{ width: '100%', justifyContent: 'center', mt: '16px' }}>
                        <FilledHoverBtn startIcon={<img style={{ width: '30px' }} alt='Science Courses' src='/assets/cell-icon.svg' />} component={Link} to={'/grades/1'} sx={{ minWidth: '250px', fontSize: '1.5rem', borderRadius: 0 }}>كورسات العلوم المتكامله</FilledHoverBtn>
                    </FlexRow>

                </FlexColumn>
            </FlexColumn>

        </Section >
    )
}
//seagreen
// background - color: #DFDBE5;
{/* <Box sx={{
    bgcolor: 'transparent',
    width: '300px',
    mt: "16px",
    height: '60px',
    position: 'absolute',
    zIndex: 0, clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
    border: '6px solid #fff',
}}></Box> */}
export default HeroScience
