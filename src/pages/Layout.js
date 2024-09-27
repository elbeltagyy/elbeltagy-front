import { Box, useMediaQuery } from '@mui/material'
import React, { Suspense, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Navbar from '../components/header/Navbar'
import Sidebar from '../components/header/Sidebar'
import GlobalMsg from '../components/ui/GlobalMsg'

import LoaderSkeleton from "../style/mui/loaders/LoaderSkeleton"
import makeRandom from '../tools/fcs/makeRandom'
import { getCookie } from '../hooks/cookies'


function Layout() {

    const location = useLocation()
    const isMobileScreen = useMediaQuery('(max-width:630px)');
    const [isOpenedSidebar, setSidebar] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    useEffect(() => {
        if (!localStorage.getItem('deviceId') || localStorage.getItem('deviceId').length !== 7) {
            localStorage.setItem("deviceId", makeRandom(0, 9, 7))
        }
    }, [location])

    return (
        <Box>
            <Navbar isOpenedSidebar={isOpenedSidebar} setSidebar={setSidebar} isMobileScreen={isMobileScreen} />
            <Sidebar isOpenedSideBar={isOpenedSidebar} setSideBar={setSidebar} />
            <Suspense fallback={<LoaderSkeleton />}>
                <Box sx={{ width: '100%' }}>
                    <Outlet />
                </Box>
            </Suspense>
            <GlobalMsg />
        </Box>
    )
}

export default Layout
