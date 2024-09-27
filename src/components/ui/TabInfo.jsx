import React, { memo } from 'react'
import './tabInfo.css'
import { Box, Typography } from '@mui/material'

let m = 0
function TabInfo({ count, i, title, icon, isBold = true, sx }) {

    const colors = ["#fff", "#118D57", "#B76E00", "#B71D18"]
    const bgColors = ["#1C252E", "rgba(34 197 94 / 0.16)", "rgba(255 171 0 / 0.16)", "rgba(255 86 48 / 0.16)"]


    // console.log(++m)

    return (
        <Box
            sx={{
                display: 'inline-flex',
                alignItems: "center",
                flexDirection: 'row',
                flexWrap: 'nowrap',
                gap: '8px',
                ...sx
            }} >

            {icon}

            {title && <Typography variant={isBold ? 'subtitle1' : 'subtitle2'}>
                {title}
            </Typography>}

            {(count || count === 0) && (
                <span className='tab-icon' style={{
                    color: colors[i],
                    backgroundColor: bgColors[i]
                }}>{count}
                </span>
            )}
        </Box>
    )
}

export default memo(TabInfo)
