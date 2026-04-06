import { Box, IconButton, useMediaQuery } from '@mui/material'
import { Suspense, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Navbar from '../components/header/Navbar'
import Sidebar from '../components/header/Sidebar'
import GlobalMsg from '../components/ui/GlobalMsg'

import LoaderSkeleton from "../style/mui/loaders/LoaderSkeleton"
import FooterPage from '../components/footer/FooterPage'


function Layout() {

    const location = useLocation()
    const isMobileScreen = useMediaQuery('(max-width:630px)');
    const [isOpenedSidebar, setSidebar] = useState(false)

    const pathName = location.pathname

    useEffect(() => {
        window.scrollTo({
            top: 0, left: 0, behavior: 'instant'
        })
    }, [pathName])

    useEffect(() => {
        if (localStorage.getItem('prevPage')) {
            const prev = localStorage.getItem('prevPage')
            localStorage.removeItem('prevPage')
            window.location.href = prev
        }
    }, [])

    return (
        <Box>
            <Navbar isOpenedSidebar={isOpenedSidebar} setSidebar={setSidebar} isMobileScreen={isMobileScreen} />
            <Sidebar isOpenedSideBar={isOpenedSidebar} setSideBar={setSidebar} />
            <Suspense fallback={<LoaderSkeleton />}>
                <Box sx={{ width: '100%', minHeight: '80vh' }}>
                    <Outlet />
                </Box>
            </Suspense>
            <FooterPage />
            <GlobalMsg />
            <IconButton onClick={()=> window.location.href = "https://api.whatsapp.com/send?phone=2001127078234&text=from mrelbeltagy"} sx={{ position: 'fixed', bottom: '5%', right: '16px' }}>
                <img src='/assets/whatsapp.png' style={{ width: '50px', height: '50px' }} />
            </IconButton>
        </Box >
    )
}

export default Layout
