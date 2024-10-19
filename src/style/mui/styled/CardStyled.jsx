import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import Separator from '../../../components/ui/Separator'
import Image from '../../../components/ui/Image'

function CardStyled({ img, title, description, children, btn1, btn2 }) {
    return (
        <Card sx={{ maxWidth: "430px", display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: '16px', pb: 0, overflow: 'hidden', textAlign: 'center' }}>
                {/* <CardMedia
                    sx={{ aspectRatio: 16 / 9, borderRadius: '16px', width: '300px' }}
                    image={img || '#'}
                    title={title || 'thumbnail'}
                /> */}
                <Image img={img} />
            </Box>
            <CardContent sx={{ flex: 1 }}>
                <Typography gutterBottom variant="h5" component="div" >
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Separator />
                {children}
            </CardContent>
            <CardActions>
                {btn1} {btn2}
            </CardActions>
        </Card>
    )
}

export default CardStyled
