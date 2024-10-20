import { alpha, AppBar, Avatar, Badge, Box, Button, IconButton, Toolbar, Tooltip, Typography, useTheme } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../../toolkit/globalSlice';
import MeToggler from '../ui/meToggler/MeToggler';
import { FlexBetween, FlexRow } from '../../style/mui/styled/Flexbox';


import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { FaXTwitter } from "react-icons/fa6";

import { IoLogoInstagram } from "react-icons/io5";
import ModeToggler from './ModeToggler';
import { StyledBtn } from '../../style/buttonsStyles';
import { LoginIcon, SignupIcon } from './Icons';

import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import RowInfo from '../ui/RowInfo';
import { user_roles } from '../../settings/constants/roles';

import { GiWallet } from "react-icons/gi";

import { FaWallet } from "react-icons/fa";
import TabInfo from '../ui/TabInfo';
import InfoInCircle from '../ui/InfoInCircle';
import { lang } from '../../settings/constants/arlang';
import Notifications from './Notifications';


function Navbar({ setSidebar, isOpenedSidebar, isMobileScreen }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const theme = useTheme()

    const toggleMode = () => {
        dispatch(setMode())
    }

    const openSidebar = () => {
        setSidebar(isOpened => !isOpened)
    }

    const user = useSelector(s => s.global.user)

    return (
        <AppBar sx={{
            position: 'sticky', top: 0,
            bgcolor: 'transparent',
            color: 'neutral.0',
            paddingY: '6px',
            boxShadow: 'none',
            backgroundImage: 'none',
            backdropFilter: !isOpenedSidebar ? 'blur(10px)' : 'none',
            pr: { md: '40px' },
            backgroundColor: isOpenedSidebar ? 'transparent' : alpha(theme.palette.background.default, .6)
        }}>
            <Toolbar>
                <Box zIndex={1800} sx={{ rotate: '180deg', mr: 1 }} >
                    <MeToggler isOpenedSidebar={isOpenedSidebar} openSidebar={openSidebar} />
                </Box>

                <FlexRow flexGrow={1}>
                    <Button component={Link} to={'/'}>
                        <Avatar sx={{ bgcolor: "primary.main", mr: 1, color: 'grey.0' }}>M</Avatar>
                        {(!isMobileScreen || !user) && (
                            <Typography variant="subtitle1" component="h6"  >
                                {lang.LOGO}
                            </Typography>
                        )}
                    </Button>
                </FlexRow>

                <FlexRow color={theme.palette.neutral[0]} gap={.5} >
                    <ModeToggler toggleMode={toggleMode} />

                    {(!isMobileScreen && !user?.role) && (
                        <>
                            <Button component={Link} to="/login" endIcon={<LoginIcon />} sx={{
                                border: '2px solid transparent', borderRadius: '12px',
                                "&:hover": {
                                    borderColor: theme.palette.primary.main,
                                }
                            }}>
                                <Typography variant='subtitle2' color={'neutral.0'}>تسجيل</Typography>
                                <Typography variant='subtitle1' ml={'5px'}>الدخول</Typography>
                            </Button>

                            <StyledBtn component={Link} to="/signup" endIcon={<SignupIcon />}>انشاء حساب</StyledBtn>
                        </>
                    )}

                    {user?.role && (
                        <>
                            {(user.role === user_roles.ONLINE || user.role === user_roles.STUDENT) && (
                                <Tooltip title={lang.WALLET} placement="top">
                                    <IconButton size='large'>
                                        <Badge badgeContent={user.wallet || 0} color='warning' max={5000}>
                                            <GiWallet size={'1.5rem'} />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>
                            )}

                            <Notifications user={user} />

                            <IconButton component={Link} to="/user/profile" >
                                <AccountCircle sx={{
                                    color: 'primary.main'
                                }} />
                            </IconButton>
                        </>
                    )}
                </FlexRow>

            </Toolbar>
        </AppBar>
    )
}

export default Navbar
