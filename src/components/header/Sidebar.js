import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { alpha, Divider, useTheme } from '@mui/material';

import LoggedListLinks from './LoggedListLinks';
import { lang } from '../../settings/constants/arlang';
import { logout } from "../../toolkit/globalSlice"

import { ErrorBtn } from '../../style/buttonsStyles';
import ModalStyled from '../../style/mui/styled/ModalStyled';
import { useLazyLogoutQuery } from '../../toolkit/apis/usersApi';
import Loader from '../../style/mui/loaders/Loader';


export default function Sidebar({ isOpenedSideBar, setSideBar, isMobileScreen, sideBarWidth }) {

    const theme = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(s => s.global.user)

    const [logoutFc, { isLoading }] = useLazyLogoutQuery()

    const logoutTrigger = async () => {
        setModal(false)
        await logoutFc()
        dispatch(logout())
        navigate('/')
        setSideBar(false)
    }

    const [openModal, setModal] = useState(false)
    return (
        <Box component="nav" sx={{ transition: "all .3s  ease !important" }}>

            <Drawer
                variant={"temporary"}
                anchor='left'
                open={isOpenedSideBar}
                onClose={() => setSideBar(false)}
                sx={{
                    width: sideBarWidth || '250px',
                    zIndex: 50,
                    backgroundImage: 'none',
                    "& .MuiDrawer-paper": {
                        backgroundImage: 'none',
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.background.default,
                        borderWidth: "2px",
                        width: sideBarWidth || '250px',
                    },
                }}
            >
                <Box width="100%">
                    <Box sx={{
                        width: '100%', height: '90px', position: 'sticky', top: 0,
                        bgcolor: alpha(theme.palette.background.default, .6), backdropFilter: 'blur(10px)',
                        zIndex: 5
                    }}></Box>
                    {/* drawer items */}
                    <Divider />
                    <LoggedListLinks user={user} setSidebar={setSideBar} />
                </Box>

                {/* logout */}
                {user && <Box display="flex" alignItems="end" mt={'auto'} >
                    <ErrorBtn sx={{ mx: "10px", width: '100%' }} disabled={isLoading} onClick={(() => {
                        setModal(true)
                    })} >
                        {isLoading ? <Loader color={'grey.0'} /> : lang.LOGOUT}
                    </ErrorBtn>
                </Box>}
                
            </Drawer >
            <ModalStyled
                open={openModal}
                setOpen={setModal}
                title={'هل انت متاكد من تسجيل الخروج ؟'}
                action={logoutTrigger}
            />
        </Box >
    );
}