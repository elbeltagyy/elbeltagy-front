import { Box, Card, CardActionArea, CardContent, CardMedia, Divider, Typography, useTheme } from '@mui/material'
import React from 'react'
// import { DeviconUnity, UnitIcon } from '../grades/Icons'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import { Link } from 'react-router-dom'

function CardHover({ img, title, desc, to, children, secure = false }) {

    const theme = useTheme()

    return (

        <Card sx={{
            bgcolor: 'transparent', boxShadow: theme.shadows[8], maxWidth: '400px'
        }}>
            <CardActionArea sx={{
                p: '16px', bgcolor: 'none',
                "&::before": {
                    content: "''",
                    position: "absolute",
                    top: 0,
                    left: "-180%",
                    height: "100%",
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.1)", //rgba(255, 255, 255, 0.1)
                    zIndex: 10,
                    transform: "skew(45deg)",
                    opacity: 1,
                    pointerEvents: "none",
                    transition: " 0.5s",
                    display: 'block'
                },
                '&:hover:before': {
                    left: " 180%"
                }
            }} component={Link} to={to} onClick={(e) => {
                if (secure) {
                    e.preventDefault()
                }
            }}>
                <CardMedia
                    component="img"
                    image={img || '#'}
                    alt="green iguana"
                    sx={{
                        position: 'relative',
                        zIndex: 8,
                        borderRadius: '16px', bgcolor: 'none', minWidth: '250px', maxHeight: '250px'
                    }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div" fontWeight={'700'} >
                        {title}
                    </Typography>
                    <Divider sx={{ borderColor: 'primary.main', borderWidth: '2px', my: '16px', borderRadius: '16px' }} />
                    <FlexRow flexWrap={'nowrap !important'} gap={1}>
                        {/* <DeviconUnity size={'2rem'} color={theme.palette.primary.main} /> */}
                        <Typography variant="body2" color="text.secondary">
                            {desc}
                        </Typography>
                    </FlexRow>
                    {children}
                </CardContent>
            </CardActionArea>
        </Card >
    )
}

export default CardHover
