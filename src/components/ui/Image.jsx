import { Box } from '@mui/material'

function Image({ img, title, maxWidth = '100vh', sx, ratio = 'auto', saturate = false, borderRadius = '16px' }) {

    return (
        <Box sx={{
            overflow: 'hidden',
            borderRadius: borderRadius, aspectRatio: ratio, maxWidth: maxWidth, ...sx,
            transition: '.3s all ease',
        }}>
            <img
                // srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${img}`}
                alt={title || '#'}
                loading="lazy"
                style={{
                    borderRadius: borderRadius,
                    filter: saturate && 'saturate(80%)',
                    transition: '.3s all ease',
                    display: "block"
                    // pointerEvents: 'none'
                }}
            />
        </Box>
    )
}

export default Image
