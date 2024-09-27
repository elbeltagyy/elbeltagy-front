import { ImageListItem } from '@mui/material'
import React from 'react'

function Image({ img, title, width, sx, }) {
    return (
        <ImageListItem sx={{
            overflow: 'hidden',
            borderRadius: '16px', width: width || '100%', ...sx,
        }}>
            <img
                srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${img}`}
                alt={title}
                loading="lazy"
                style={{
                    borderRadius: '16px',
                    filter: 'saturate(70%)',
                }}
            />
        </ImageListItem>
    )
}

export default Image
