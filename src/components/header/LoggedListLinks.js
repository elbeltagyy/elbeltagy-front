import { Box, Button, Divider, List, ListItem, ListItemButton, ListItemIcon, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { sidebarLinks } from '../../settings/sidebarLinks'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { RtArrow } from './Icons';
import { user_roles } from '../../settings/constants/roles';
import TabInfo from '../ui/TabInfo';


function LoggedListLinks({ user, setSidebar }) {
    const { pathname } = useLocation()
    const theme = useTheme()
    const [activeLink, setActiveLink] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
        if (pathname) {
            setActiveLink(pathname)
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

                if ((link.allowedTo?.includes(user?.role) && user) || !link.allowedTo || (link.allowedTo.includes(user_roles.NOT_USER) && !user)) { //?.allowedTo?.includes(user?.role)

                    return (
                        <ListItem key={i} sx={{ p: "0 10px" }}>
                            <ListItemButton
                                disabled={link.isDisabled}
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

                                {activeLink === link.to && (
                                    <RtArrow size='22px' style={{
                                        marginRight: "auto",
                                        color: theme.palette.primary.main,
                                        display: activeLink === link.to ? "block" : "none",
                                        transform: 'rotate(180deg)'
                                    }} />
                                )}

                                {(link.info && activeLink !== link.to) && <TabInfo sx={{
                                    m: 'auto'
                                }} count={link.info.title} i={link.info.i} />}

                            </ListItemButton>
                        </ListItem>
                    )
                }
                return
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
