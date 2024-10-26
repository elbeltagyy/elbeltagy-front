import { Avatar, Box, useMediaQuery, useTheme } from '@mui/material'

import { user_roles } from '../../settings/constants/roles'
import { lang } from '../../settings/constants/arlang'
import gradeConstants from '../../settings/constants/gradeConstants'

import Grid from '../../style/vanilla/Grid'
import DataWith3Items from './DataWith3Items'

import { FaSquarePhoneFlip } from 'react-icons/fa6'
import { PiPhoneDisconnectFill } from 'react-icons/pi'
import { IoSchool } from 'react-icons/io5'
import { MdMarkEmailRead, MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { MdVerifiedUser } from "react-icons/md";
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import RowInfo from './RowInfo'
import { FaWallet } from 'react-icons/fa'

// eslint-disable-next-line react/prop-types
export default function UserHeader({ children, user, flexDirection = 'row', variant, isAll = false }) {

    const theme = useTheme()
    const isMobileScreen = useMediaQuery('(max-width:600px)');
    return (
        <Box sx={{
            display: 'flex',
            alignItems: "center",
            justifyContent: 'flex-start',
            flexDirection: isMobileScreen ? "column" : flexDirection, gap: '16px', width: '100%'
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
                width: '100%'
            }}>

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
                            {(user.role === user_roles.STUDENT || user.role === user_roles.ONLINE) && (
                                <FlexColumn sx={{ width: '100%' }}>
                                    <RowInfo icon={<FaWallet size={'1.5rem'} />} title={'رصيد محفظتك '} fromStart={false} desc={user.wallet + ' جنيها'} />
                                </FlexColumn>
                            )}
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
