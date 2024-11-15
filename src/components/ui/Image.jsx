import { Box } from '@mui/material'

function Image({ img, title, maxWidth = '100vh', sx, ratio = 16 / 9, saturate = false }) {

    return (
        <Box sx={{
            overflow: 'hidden',
            borderRadius: '16px', aspectRatio: ratio, maxWidth: maxWidth, ...sx,
            transition: '.3s all ease',
        }}>
            <img
                // srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${img}`}
                alt={title || '#'}
                loading="lazy"
                style={{
                    // borderRadius: '16px',
                    filter: saturate && 'saturate(80%)',
                    transition: '.3s all ease',
                    // pointerEvents: 'none'
                }}
            />
        </Box>
    )
}

export default Image
