import { CircularProgress } from '@mui/material'

export default function Loader({ color, sx, }) {
    return (
        <CircularProgress size={"25px"} thickness={6} sx={{ color: color || 'primary.main', ...sx }} />
    )
}
