import { Box, Divider, Typography, useTheme } from '@mui/material'

export default function MakeTitle(props) {
    const { children, title } = props
    const theme = useTheme()

    return (
        <Box m={"10px 0"}>
            <Divider>
                <Box sx={{ display: "flex", justifyContent: "center", }}>
                    <Typography variant='h6' sx={{ opacity: ".7", fontWeight: 700, color: theme.palette.secondary[100] }}>
                        {title}
                    </Typography>
                    <Box>
                        {children}
                    </Box>
                </Box>
            </Divider>
        </Box>
    )
}
