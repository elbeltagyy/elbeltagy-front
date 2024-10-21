import { CircularProgress } from '@mui/material'
import React from 'react'

export default function Loader({ color, sx, }) {
    return (

        <CircularProgress size={"25px"} thickness={6} sx={{ color: color || 'primary.main', ...sx }} />
    )
}
