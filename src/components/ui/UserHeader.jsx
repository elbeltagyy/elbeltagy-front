import { Avatar, Box, Button, CardHeader, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import { user_roles } from '../../settings/constants/roles'
import { lang } from '../../settings/constants/arlang'
import { MdMarkEmailRead, MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import DataWith3Items from './DataWith3Items'
import Grid from '../../style/vanilla/Grid'
import { FaSquarePhoneFlip } from 'react-icons/fa6'
import { PiPhoneDisconnectFill } from 'react-icons/pi'
import gradeConstants from '../../settings/constants/gradeConstants'
import { IoSchool } from 'react-icons/io5'
import { MdVerifiedUser } from "react-icons/md";

export default function UserHeader({ children, user, flexDirection = 'row', variant, isAll = false }) {

    const theme = useTheme()
    const isMobileScreen = useMediaQuery('(max-width:600px)');

    return (
        <Box sx={{
            display: 'flex',
            alignItems: "center",
            justifyContent: 'flex-start',
            flexDirection: isMobileScreen ? "column" : flexDirection, gap: 10
        }}>
            <Avatar alt={user.name.toUpperCase()} src={user?.avatar?.url || "#"}
                sx={{
                    m: '6px',
                    height: "120px",
                    width: "120px",
                    bgcolor: theme.palette.primary[400],
                    fontWeight: 800,
                    fontSize: '25px',
                    color: theme.palette.grey[0],
                }}
                variant={variant || 'square'} />

            <Box sx={{
                // display: 'flex',
                // justifyContent: 'center',
                // alignItems: "center",
                // flexDirection: "column",
                width: '100%'
            }}>

                {/* <Box minWidth={'100%'}>
                    <Typography variant='h5' fontWeight="600" color={theme.palette.neutral[0]}>
                        <span style={{ opacity: .4 }}>  {lang.NAME} </span> : {user.name}
                    </Typography>
                </Box>

                <Box width={'100%'}>
                    <Typography variant='h6' fontWeight="600" color={theme.palette.text.secondary}>
                        <span style={{ opacity: .4 }}>  {lang.ROLE} </span> : {user.role}
                    </Typography>
                </Box>

                {user.role === user_roles.ONLINE && (
                    <Box width={'100%'}>
                        <Typography variant='h6' fontWeight="600" color={theme.palette.text.secondary}>
                            <span style={{ opacity: .4 }}>  {lang.WALLET} </span> : {user.wallet} {lang.POUND}
                        </Typography>
                    </Box>
                )} */}
                <Grid>
                    <DataWith3Items title={lang.NAME} icon={<MdOutlineDriveFileRenameOutline size={'2rem'} />} desc={user?.name} />
                    <DataWith3Items title={lang.GRADE} icon={<IoSchool size={'2rem'} />} desc={user?.role === user_roles.ADMIN || user?.role === user_roles.SUBADMIN ? user?.role : gradeConstants.filter(g => g.index === Number(user?.grade))[0]?.name} />
                    <DataWith3Items title={lang.ROLE} icon={<MdVerifiedUser size={'2rem'} />} desc={user?.role} />
                    {isAll && (
                        <>
                            <DataWith3Items title={lang.USERNAME} icon={<MdOutlineDriveFileRenameOutline size={'2rem'} />} desc={user?.userName} />
                            <DataWith3Items title={lang.EMAIL} icon={<MdMarkEmailRead size={'2rem'} />} desc={user?.email} />
                            <DataWith3Items title={lang.PHONE} icon={<FaSquarePhoneFlip size={'2rem'} />} desc={user?.phone} />
                            <DataWith3Items title={lang.FAMILY_PHONE} icon={<PiPhoneDisconnectFill size={'2rem'} />} desc={user?.familyPhone} />
                        </>
                    )}
                </Grid>
            </Box>
            <Box sx={{ flex: 1, textAlign: "center" }}>
                {children}
            </Box>
        </Box>
    )
}
