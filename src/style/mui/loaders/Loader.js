import { Box, CircularProgress, useTheme } from '@mui/material'
import React from 'react'

export default function Loader({ color, sx, }) {
    const theme = useTheme()

    return (

        <CircularProgress size={"25px"} thickness={6} sx={{ color: color || 'grey.0', ...sx }} />
    )
}
