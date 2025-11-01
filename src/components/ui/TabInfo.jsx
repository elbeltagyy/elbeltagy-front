import { memo } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import './tabInfo.css'

function TabInfo({ count, i, title, icon, isBold = true, sx, fontSize }) {

    const theme = useTheme()
    let modeColors = []
    let modeBgcolors = []

    const colors = ["#fff", "#118D57", "#B76E00", "#B71D18"] //white, green, orange, red
    const bgColors = ["#1C252E", "rgba(34 197 94 / 0.16)", "rgba(255 171 0 / 0.16)", "rgba(255 86 48 / 0.16)"]

    const darkColors = ['#1C252E', '#77ED8B', '#FFD666', '#FFAC82']
    const darkBgColors = ['#FFFFFF', 'rgba(34 197 94 / 0.16 )', 'rgba(255 171 0 / 0.16)', 'rgba(255 86 48 / 0.16)']

    modeColors = theme.palette.mode === 'dark' ? darkColors : colors
    modeBgcolors = theme.palette.mode === 'dark' ? darkBgColors : bgColors

    return (
        <Box
            component={'span'}
            sx={{
                display: 'inline-flex',
                alignItems: "center",
                flexDirection: 'row',
                flexWrap: 'nowrap',
                my: '2px',
                gap: '8px',
                ...sx
            }} >

            {icon}

            {title && <Typography variant={isBold ? 'subtitle1' : 'subtitle2'} sx={{ fontSize }}>
                {title}
            </Typography>}

            {(count || count === 0) && (
                <span className='tab-icon' style={{
                    color: modeColors[i],
                    backgroundColor: modeBgcolors[i], fontSize
                }}>{count}
                </span>
            )}
        </Box>
    )
}

export default memo(TabInfo)
