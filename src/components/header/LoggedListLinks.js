import { Box, Button, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { sidebarLinks } from '../../settings/sidebarLinks'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { RtArrow } from './Icons';
import { FlexRow } from '../../style/mui/styled/Flexbox';
import { transform } from 'framer-motion';

function LoggedListLinks({ user, setSidebar }) {
    const { pathname } = useLocation()
    const theme = useTheme()
    const [activeLink, setActiveLink] = useState('/test')
    const navigate = useNavigate()


    useEffect(() => {
        if (pathname) {
            const link = pathname.split("/")
            if (link[1] === "management") {
                setActiveLink(`/${link[1]}/${link[2]}`)
            } else {
                setActiveLink(`/${link[1]}`)
            }
        }
    }, [pathname])


    return (

        <List sx={{ height: '100%' }}>
            {sidebarLinks.map((link, i) => {

                if (!link.to && link.allowedTo?.includes(user?.role)) {
                    return (
                        <Divider key={i}>
                            <LinksHeader link={link} />
                        </Divider>
                    )
                }

                if ((link.allowedTo?.includes(user?.role) && user) || (!user && !link.allowedTo)) { //?.allowedTo?.includes(user?.role)

                    return (
                        <ListItem key={i} sx={{ p: "0 10px" }}>
                            <ListItemButton
                                disabled={link.disabled}
                                component={Link}
                                to={link.to}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setSidebar(false)
                                    navigate(link.to)
                                }}
                                sx={{
                                    my: '4px',
                                    borderRadius: '16px',
                                    border: '2px solid transparent',
                                    backgroundColor:
                                        activeLink === link.to
                                            ? "rgba( 0 167 111 / 0.08)"
                                            : 'transparent',
                                    color:
                                        activeLink === link.to
                                            ? 'primary.main'
                                            : 'neutral.100',
                                    // "&:hover": {
                                    // borderColor: theme.palette.primary[500],
                                    // backgroundColor: theme.palette.primary.main,
                                    // color: theme.palette.text.hover,
                                    // }
                                }}
                            >
                                <ListItemIcon sx={{
                                    color: "primary.main", minWidth: '40px'
                                }}>
                                    {link.icon}
                                </ListItemIcon>

                                <Typography variant='subtitle2'>
                                    {link.name}
                                </Typography>

                                <RtArrow size='22px' style={{
                                    marginRight: "auto",
                                    color: theme.palette.primary.main,
                                    display: activeLink === link.to ? "block" : "none",
                                    transform: 'rotate(180deg)'
                                }} />
                            </ListItemButton>
                        </ListItem>
                    )
                }
                return false
            })}
        </List>
    )
}

const LinksHeader = ({ link }) => <Box
    sx={{ display: "flex", justifyContent: "center", alignItems: 'center', flexWrap: 'nowrap', gap: '8px', opacity: ".4" }}>
    <Typography variant='subtitle1' >
        {link.name}
    </Typography>
    {link.icon}
</Box >

export default LoggedListLinks
