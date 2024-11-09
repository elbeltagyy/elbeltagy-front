import { alpha, AppBar, Avatar, Badge, Box, Button, IconButton, Toolbar, Tooltip, Typography, useTheme } from '@mui/material'
import { Link, } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../../toolkit/globalSlice';
import MeToggler from '../ui/meToggler/MeToggler';
import { FlexRow } from '../../style/mui/styled/Flexbox';


import ModeToggler from './ModeToggler';
import { StyledBtn } from '../../style/buttonsStyles';
import { LoginIcon, SignupIcon } from './Icons';

import AccountCircle from '@mui/icons-material/AccountCircle';
import { user_roles } from '../../settings/constants/roles';

import { GiWallet } from "react-icons/gi";
import { lang } from '../../settings/constants/arlang';
import Notifications from './Notifications';
import Image from '../ui/Image';


function Navbar({ setSidebar, isOpenedSidebar, isMobileScreen }) {

    const dispatch = useDispatch()
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
                        <Image img={'/assets/logo.png'} maxWidth='60px' ratio={'auto'} />
                        {/* <Avatar src='/assets/logo.png' sx={{ bgcolor: "primary.main", mr: 1, color: 'grey.0' }}>M</Avatar> */}
                        {((!isMobileScreen || !user) && !isOpenedSidebar) && (
                            <Typography mx={'12px'} variant="subtitle1" component="h6"  >
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
