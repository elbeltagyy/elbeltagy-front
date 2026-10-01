import { Avatar, CardHeader, Typography, useTheme} from '@mui/material'

function DataWith3Items({ icon, title, desc, src, sx = {}, action }) {
    const theme = useTheme()

    return (
        <CardHeader
            sx={{
                borderRadius: '14px',
                bgcolor: theme.palette.primary.main + 20,
                width: '100%',
                ...sx,

                '& .MuiCardHeader-content': {
                    minWidth: 0,
                    flex: '1 1 auto',
                },
                '& .MuiCardHeader-action': {
                    flexShrink: 0,
                    alignSelf: 'center',
                },
                '& .MuiCardHeader-avatar': {
                    flexShrink: 0,
                },
            }}
            avatar={
                src ? (
                    <Avatar src={src} sx={{ bgcolor: 'primary.main', color: 'grey.0' }} />
                ) : (
                    <Avatar sx={{ bgcolor: 'primary.main', color: 'grey.0' }}>
                        {icon}
                    </Avatar>
                )
            }
            title={
                <Typography
                    sx={{
                        minWidth: 0,
                        whiteSpace: 'normal',
                        overflowWrap: 'anywhere',
                    }}
                >
                    {title}
                </Typography>
            }
            subheader={
                <Typography
                    variant='body2'
                    component="div"
                    sx={{
                        minWidth: 0,
                        whiteSpace: 'normal',
                        overflowWrap: 'anywhere',
                    }}
                >
                    {desc}
                </Typography>
            }
            action={action}
        />
    )
}

export default DataWith3Items