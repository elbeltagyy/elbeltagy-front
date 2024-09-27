import { Avatar, CardHeader, useTheme } from '@mui/material'
import React from 'react'

function DataWith3Items({ icon, title, desc, src }) {
    const theme = useTheme()
    return (
        <CardHeader
            sx={{
                borderRadius: '14px', bgcolor: theme.palette.primary.main + 20, width: '100%'
            }}
            avatar={
                <>
                    {
                        src ? (
                            <Avatar src={src} sx={{ bgcolor: 'primary.main', color: 'grey.0' }}>

                            </Avatar>
                        ) : (
                            <Avatar sx={{ bgcolor: 'primary.main', color: 'grey.0' }}>
                                {icon}
                            </Avatar>
                        )
                    }
                </>
            }
            title={title}
            subheader={desc}
        />
    )
}

export default DataWith3Items
