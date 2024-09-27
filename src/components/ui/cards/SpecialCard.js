import { Box, Button, CardMedia, Divider, Typography } from '@mui/material'
import React from 'react'
import { StyledBtn } from '../../../style/buttonsStyles'

function SpecialCard({ img, title, desc }) {
    return (
        <Box maxWidth={"350px"} position={'relative'}>
            {/* media */}
            <Box >
                <CardMedia
                    component="img"
                    alt="green iguana"
                    image={img || '#'}
                    sx={{
                        height: "200px", borderRadius: '16px', padding: '6px', zIndex: '3', position: 'relative',
                    }}
                />
            </Box>
            <Box sx={{

                bgcolor: 'background.alt',
                width: '80%',
                borderRadius: '16px', p: ' 8px 8px 8px', mt: '8px',
                mx: 'auto',
                zIndex: '2',
                position: 'relative', boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                height: 'calc(100% - 200px)'
            }}>
                <Box >
                    <Typography variant='h4' m={'8px 0'}>{title}</Typography>
                    <Divider sx={{ borderColor: 'primary.main', borderWidth: '2px', borderRadius: '8px', m: '8px 0' }} />
                    <Typography variant='body1'>{desc}</Typography>
                </Box>
                <Box>
                    <StyledBtn sx={{borderRadius: '50px'}}>show more</StyledBtn>
                </Box>

            </Box>
            {/* content */}
        </Box>
    )
}

export default SpecialCard
