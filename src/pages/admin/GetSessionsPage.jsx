import { useLazyGetSessionsQuery, useSessionLogoutMutation } from '../../toolkit/apis/sessionsApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import Section from '../../style/mui/styled/Section'
import { lang } from '../../settings/constants/arlang'
import TabInfo from '../../components/ui/TabInfo'
import { getFullDate } from '../../settings/constants/dateConstants'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import { ErrorBtn } from '../../style/buttonsStyles'
import { Avatar, Button } from '@mui/material'
import { useState } from 'react'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import Image from '../../components/ui/Image'
import usePostData from '../../hooks/usePostData'
import { useGridApiRef } from '@mui/x-data-grid'
import dayjs from 'dayjs'

function GetSessionsPage() {

    const [rows, setRows] = useState([])
    const [fileConfirm, setFileConfirm] = useState()
    const [openFileModal, setOpenFileModal] = useState(false)


    const [getData, { isLoading }] = useLazyGetSessionsQuery()
    const [getTokens] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        const res = await getTokens(params, false)
        let values = []

        res?.sessions?.map((session) => {

            const item = {
                _id: session._id,
                avatar: session.user?.avatar?.url,
                session: session.refreshToken,
                name: session.user.name,
                userName: session.user.userName,
                loginDate: session.createdAt,
                logoutDate: session.logout,

                isExpired: dayjs(session.expiresAt).isBefore(dayjs()) ? true : false,
                expiresAt: session.expiresAt,

                browserName: session.browserName,
                browserVersion: session.browserVersion,
                deviceType: session.deviceType,
                deviceName: session.deviceName,
            }
            values.push(item)
        })

        const data = { values, count: res.count }
        return data
    }

    const apiRef = useGridApiRef();
    const [sessionToLogout, setSessionToLogout] = useState()
    const [openSessionModal, setSessionModal] = useState(false)

    const [sendData] = useSessionLogoutMutation()
    const [isLogoutLoading, setIsLogoutLoading] = useState(false)
    const [triggerLogout] = usePostData(sendData, setIsLogoutLoading)

    const sessionLogout = async () => {
        const res = await triggerLogout(sessionToLogout)
        apiRef.current.updateRows([{ ...sessionToLogout, logoutDate: new Date() }])
    }

    const columns = [
        {
            field: "avatar",
            headerName: lang.IMAGE,
            disableExport: true,
            filterable: false,
            renderCell: (params) => {
                return (
                    <Button sx={{ width: '100%' }} onClick={() => {
                        if (params.row?.avatar?.url) {
                            setFileConfirm(params.row?.avatar?.url)
                            setOpenFileModal(true)
                        }
                    }}>
                        <Avatar alt={params.row?.name?.toUpperCase() || 'E'} src={params.row?.avatar?.url || "#"}
                            sx={{
                                objectFit: 'contain',
                                bgcolor: 'primary.main',
                                fontWeight: 600,
                                color: 'grey.0'
                            }} />
                    </Button>
                )
            }
        },
        {
            field: 'name',
            headerName: lang.name,
            width: 200
        }, {
            field: 'userName',
            headerName: lang.USERNAME,
            width: 150
        }, {
            field: 'loginDate',
            headerName: 'login date',
            width: 200,
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.loginDate)} i={1} />
            }
        }, {
            field: 'logoutDate',
            headerName: 'logout date',
            width: 200,
            renderCell: (params) => {
                if (params.row.logoutDate) {
                    return <TabInfo count={getFullDate(params.row.logoutDate)} i={3} />
                } else {
                    return <Button color='error' disabled={params.row.isExpired} onClick={() => {
                        setSessionToLogout({ _id: params.row._id })
                        setSessionModal(true)
                    }}>{lang.LOGOUT}</Button>
                }
            }
        }, {
            field: 'isExpired',
            headerName: 'isExpired',
            width: 200,
            type: "boolean",
        }, {
            field: 'expiresAt',
            headerName: 'expiresAt',
            width: 200,
            renderCell: (params) => {
                if (params.row.isExpired) {
                    return <TabInfo count={getFullDate(params.row.expiresAt)} i={3} />
                } else {
                    return <TabInfo count={'تنتهى فى' + ' ' + getFullDate(params.row.expiresAt)} i={1} />
                }
            }
        }, {
            field: 'browserName',
            headerName: 'browserName',
            width: 200,
        }, {
            field: 'browserVersion',
            headerName: 'browserVersion',
            width: 200,
        }, {
            field: 'deviceType',
            headerName: 'deviceType',
            width: 200,
        }, {
            field: 'deviceName',
            headerName: 'deviceName',
            width: 200,
        },
    ]

    return (
        <Section>
            <TitleWithDividers title={'tokens page'} />

            <MeDatagrid
                apiRef={apiRef}
                type={'crud'}
                columns={columns} fetchFc={fetchFc} loading={isLoading || isLogoutLoading}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"]
                    }
                }
            />

            <ModalStyled open={openFileModal} setOpen={setOpenFileModal} >
                <Image img={fileConfirm} />
            </ModalStyled>

            <ModalStyled open={openSessionModal} setOpen={setSessionModal} title={'هل انت متاكد من تسجيل الخروج لهذا المستخدم ؟'} action={sessionLogout} />
        </Section>
    )
}

export default GetSessionsPage
