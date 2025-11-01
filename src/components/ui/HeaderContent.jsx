import { Box, Typography, useTheme } from '@mui/material'
import { FlexBetween, FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import CardInfo from '../../style/mui/components/CardInfo'
import Image from './Image'
import { MdArrowForward } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

function HeaderContent({ title, body, infos = [], img, sideImg, children, height = '86vh', sectionName = "العوده", sideChildren }) {

    const theme = useTheme()
    const navigate = useNavigate()
    // backgroundImage: `
    // url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='52' viewBox='0 0 52 52'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M0 17.83V0h17.83a3 3 0 0 1-5.66 2H5.9A5 5 0 0 1 2 5.9v6.27a3 3 0 0 1-2 5.66zm0 18.34a3 3 0 0 1 2 5.66v6.27A5 5 0 0 1 5.9 52h6.27a3 3 0 0 1 5.66 0H0V36.17zM36.17 52a3 3 0 0 1 5.66 0h6.27a5 5 0 0 1 3.9-3.9v-6.27a3 3 0 0 1 0-5.66V52H36.17zM0 31.93v-9.78a5 5 0 0 1 3.8.72l4.43-4.43a3 3 0 1 1 1.42 1.41L5.2 24.28a5 5 0 0 1 0 5.52l4.44 4.43a3 3 0 1 1-1.42 1.42L3.8 31.2a5 5 0 0 1-3.8.72zm52-14.1a3 3 0 0 1 0-5.66V5.9A5 5 0 0 1 48.1 2h-6.27a3 3 0 0 1-5.66-2H52v17.83zm0 14.1a4.97 4.97 0 0 1-1.72-.72l-4.43 4.44a3 3 0 1 1-1.41-1.42l4.43-4.43a5 5 0 0 1 0-5.52l-4.43-4.43a3 3 0 1 1 1.41-1.41l4.43 4.43c.53-.35 1.12-.6 1.72-.72v9.78zM22.15 0h9.78a5 5 0 0 1-.72 3.8l4.44 4.43a3 3 0 1 1-1.42 1.42L29.8 5.2a5 5 0 0 1-5.52 0l-4.43 4.44a3 3 0 1 1-1.41-1.42l4.43-4.43a5 5 0 0 1-.72-3.8zm0 52c.13-.6.37-1.19.72-1.72l-4.43-4.43a3 3 0 1 1 1.41-1.41l4.43 4.43a5 5 0 0 1 5.52 0l4.43-4.43a3 3 0 1 1 1.42 1.41l-4.44 4.43c.36.53.6 1.12.72 1.72h-9.78zm9.75-24a5 5 0 0 1-3.9 3.9v6.27a3 3 0 1 1-2 0V31.9a5 5 0 0 1-3.9-3.9h-6.27a3 3 0 1 1 0-2h6.27a5 5 0 0 1 3.9-3.9v-6.27a3 3 0 1 1 2 0v6.27a5 5 0 0 1 3.9 3.9h6.27a3 3 0 1 1 0 2H31.9z'%3E%3C/path%3E%3C/svg%3E")
    // `,
    return (
        <>
            <Box sx={{
                // clipPath: `url("#clip")`,
                // minHeight: height,
                 width: '100%', position: 'relative', p: '16px 8px', zIndex: 1,
                borderRadius: '16px', overflow: 'hidden',
                // backgroundImage: `url("/assets/remove-magic.png")`,
                // backgroundImage: `url("https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/background/background-6.webp")`,
                // backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='52' viewBox='0 0 52 52'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M0 17.83V0h17.83a3 3 0 0 1-5.66 2H5.9A5 5 0 0 1 2 5.9v6.27a3 3 0 0 1-2 5.66zm0 18.34a3 3 0 0 1 2 5.66v6.27A5 5 0 0 1 5.9 52h6.27a3 3 0 0 1 5.66 0H0V36.17zM36.17 52a3 3 0 0 1 5.66 0h6.27a5 5 0 0 1 3.9-3.9v-6.27a3 3 0 0 1 0-5.66V52H36.17zM0 31.93v-9.78a5 5 0 0 1 3.8.72l4.43-4.43a3 3 0 1 1 1.42 1.41L5.2 24.28a5 5 0 0 1 0 5.52l4.44 4.43a3 3 0 1 1-1.42 1.42L3.8 31.2a5 5 0 0 1-3.8.72zm52-14.1a3 3 0 0 1 0-5.66V5.9A5 5 0 0 1 48.1 2h-6.27a3 3 0 0 1-5.66-2H52v17.83zm0 14.1a4.97 4.97 0 0 1-1.72-.72l-4.43 4.44a3 3 0 1 1-1.41-1.42l4.43-4.43a5 5 0 0 1 0-5.52l-4.43-4.43a3 3 0 1 1 1.41-1.41l4.43 4.43c.53-.35 1.12-.6 1.72-.72v9.78zM22.15 0h9.78a5 5 0 0 1-.72 3.8l4.44 4.43a3 3 0 1 1-1.42 1.42L29.8 5.2a5 5 0 0 1-5.52 0l-4.43 4.44a3 3 0 1 1-1.41-1.42l4.43-4.43a5 5 0 0 1-.72-3.8zm0 52c.13-.6.37-1.19.72-1.72l-4.43-4.43a3 3 0 1 1 1.41-1.41l4.43 4.43a5 5 0 0 1 5.52 0l4.43-4.43a3 3 0 1 1 1.42 1.41l-4.44 4.43c.36.53.6 1.12.72 1.72h-9.78zm9.75-24a5 5 0 0 1-3.9 3.9v6.27a3 3 0 1 1-2 0V31.9a5 5 0 0 1-3.9-3.9h-6.27a3 3 0 1 1 0-2h6.27a5 5 0 0 1 3.9-3.9v-6.27a3 3 0 1 1 2 0v6.27a5 5 0 0 1 3.9 3.9h6.27a3 3 0 1 1 0 2H31.9z'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundPosition: 'top 35% right 0', backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
                bgcolor: 'primary.main',
                textAlign: 'center'
            }}>
                <Box sx={{
                    position: 'absolute', top: '0', right: '0', width: '100%', height: '100%',
                    background: `linear-gradient(to right,  ${theme.palette.primary.light}  , rgba(0,0 ,0,0) 10%)`, opacity: .9 //linear-gradient(to left, ${theme.palette.primary.light} 30%, ${theme.palette.primary.dark} 75%) `linear-gradient(45deg,transparent 42%,#9400ff 42%)`
                }} />

                <FlexRow
                    onClick={() => navigate(-1)}
                    sx={{ zIndex: 5, color: 'grey.0', position: 'relative', alignItems: 'center', cursor: 'pointer' }}>
                    <MdArrowForward size={'1.5rem'} style={{
                        marginBottom: '-5px'
                    }} />
                    <Typography sx={{ textDecoration: 'underline' }}>{sectionName}</Typography>
                </FlexRow>

                <FlexBetween>

                    <FlexColumn sx={{ zIndex: 1, p: '30px 15px', flex: 1, alignItems: 'flex-start' }}>
                        <Typography variant='h5' sx={{
                            zIndex: 1, textShadow: theme.shadows[8], bgcolor: theme.palette.grey[0],
                            p: '12px 16px', color: 'primary.main',
                            borderRadius: '50px', border: '3px solid', borderColor: theme.palette.primary.main, fontWeight: 700,
                            textAlign: 'center'
                        }}>
                            {/* {sectionName && <span style={{ textDecoration: 'underline' }}>{sectionName}</span>} */}
                            {/* :   */}
                            {title}
                        </Typography>
                        <Typography variant='body1' sx={{ color: '#fff', zIndex: 1, maxWidth: '800px', my: '16px' }}>
                            {body}
                        </Typography>

                        <FlexRow sx={{ width: '100%', position: 'relative', gap: '10px', justifyContent: 'center', mb: '200px' }}>
                            {infos.length > 0 && infos.map((info, i) => (
                                <CardInfo key={i} icon={info.icon} caption={info.caption} desc={info.desc} />
                            ))}
                        </FlexRow>

                    </FlexColumn>
                    {sideImg && (
                        <Image img={sideImg} sx={{ width: '100%', maxWidth: '100vh', zIndex: 5, m: 'auto' }} />
                    )}
                </FlexBetween>

            </Box>

            <FlexRow sx={{ flexWrap: 'wrap', flexDirection: 'row-reverse', alignItems: 'flex-start', width: "100%" }}>
                {(img || children) && (
                    <Box sx={{
                        zIndex: 5, position: 'relative',
                        border: '0px solid transparent', borderRadius: '16px', mt: '-200px',
                        // boxShadow: img ? theme.shadows[24] : 'none',
                        maxWidth: { md: '500px', lg: '550px' }, minWidth: '250px', width: '100%', p: '16px', bgcolor: 'background.default',
                        mx: 'auto',
                        "&::after": {
                            position: 'absolute',
                            content: "''",
                            width: '50px', height: '50px', bgcolor: 'transparent',
                            top: '150px',
                            borderBottomLeftRadius: '50%',
                            zIndex: 10, boxShadow: `-6px 9px ${theme.palette.background.default}`,
                            right: '100%', transform: 'rotate(90deg)'
                        }, "&::before": {
                            position: 'absolute',
                            content: "''",
                            width: '50px', height: '50px', bgcolor: 'transparent',
                            top: '150px',
                            borderBottomLeftRadius: '50%',
                            zIndex: 10, boxShadow: `-6px 9px ${theme.palette.background.default}`,
                            left: '100%'
                        },
                    }}>
                        {children || <Image img={img} />}
                    </Box>
                )}

                {sideChildren && (
                    <Box sx={{ mt: '32px', flexGrow: 1 }}>
                        {sideChildren}
                    </Box>
                )}

            </FlexRow>

        </>

    )
}
{/* <img src={img} style={{ borderRadius: '16px', maxHeight: '500px' }} /> */ }
export default HeaderContent
