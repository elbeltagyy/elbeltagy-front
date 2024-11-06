import React, { memo } from 'react'
import './tabInfo.css'
import { Box, Typography, useTheme } from '@mui/material'

let m = 0
function TabInfo({ count, i, title, icon, isBold = true, sx }) {

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

            {title && <Typography variant={isBold ? 'subtitle1' : 'subtitle2'}>
                {title}
            </Typography>}

            {(count || count === 0) && (
                <span className='tab-icon' style={{
                    color: modeColors[i],
                    backgroundColor: modeBgcolors[i]
                }}>{count}
                </span>
            )}
        </Box>
    )
}

export default memo(TabInfo)
