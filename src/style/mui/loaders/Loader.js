import { CircularProgress, Stack, Typography } from '@mui/material';

export default function Loader({ color, sx, label }) {
    return (
        <Stack direction="row" alignItems="center" gap={1} sx={sx}>
            {label && (
                <Typography variant="body2">
                    {label}
                </Typography>
            )}
            <CircularProgress
                size={25}
                thickness={6}
                sx={{ color: color || 'primary.main' }}
            />


        </Stack>
    );
}