import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

export default function ListLinks({ link, i, setActiveLink, activeLink, theme }) {
    const navigate = useNavigate()
    return (
        <ListItem key={i} sx={{ p: "0 10px" }}>
            <ListItemButton onClick={() => {
                navigate(link.to)
                setActiveLink(link.to)
            }}
                sx={{
                    backgroundColor:
                        activeLink === link.to
                            ? theme.palette.secondary[300]
                            : "transparent",
                    color:
                        activeLink === link.to
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                    "&:hover": {
                        backgroundColor: theme.palette.secondary[300],
                        color: theme.palette.primary[600],
                    }
                }}
            >
                <ListItemIcon sx={{
                    ml: "2rem",
                    color: "inherit"
                }}>
                    {link.icon}
                </ListItemIcon>
                <ListItemText primary={link.name} />
                <ChevronRightOutlinedIcon sx={{
                    ml: "auto",
                    display: activeLink === link.to ? "block" : "none",
                }} />
            </ListItemButton>
        </ListItem>
    )
}
