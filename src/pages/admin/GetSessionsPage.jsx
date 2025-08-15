import { useState } from 'react'

import { Avatar, Button } from '@mui/material'
import { useGridApiRef } from '@mui/x-data-grid'

import { useLazyAnalysisSessionsQuery, useLazyGetSessionsQuery, useSessionLogoutMutation } from '../../toolkit/apis/sessionsApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import usePostData from '../../hooks/usePostData'

import { lang } from '../../settings/constants/arlang'
import { getDateWithTime, getFullDate } from '../../settings/constants/dateConstants'

import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import Section from '../../style/mui/styled/Section'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import Image from '../../components/ui/Image'
import TabInfo from '../../components/ui/TabInfo'

import dayjs from 'dayjs'

const exportObj = {
    isLoggedOutAutomatic: (row) => {
        return row.isLoggedOutAutomatic ? 'نعم' : "لا"
    },
    isExpired: (row) => {
        return row.isExpired ? 'نعم' : "لا"
    },
    loginDate: (row) => {
        return getDateWithTime(row.loginDate)
    },
    logoutDate: (row) => {
        return getDateWithTime(row.logoutDate)
    },
    createdAt: (row) => {
        return getDateWithTime(row.createdAt)
    },
    expiresAt: (row) => {
        return getDateWithTime(row.expiresAt)
    }
}

function GetSessionsPage() {

    const [fileConfirm, setFileConfirm] = useState()
    const [openFileModal, setOpenFileModal] = useState(false)


    const [getAnalysis] = useLazyAnalysisSessionsQuery()
    const [analysisSessions] = useLazyGetData(getAnalysis)

    const [getData, { isLoading }] = useLazyGetSessionsQuery()
    const [getTokens] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        const res = await getTokens(params, false)
        let values = []

        res?.sessions?.map((session) => {

            const item = {
                ...session,
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
        await triggerLogout(sessionToLogout)
        apiRef.current.updateRows([{ ...sessionToLogout, logoutDate: new Date() }])
    }

    const columns = [
        {
            field: "avatar",
            headerName: lang.IMAGE,
            disableExport: true,
            filterable: false,
            sortable: false,
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
            headerName: lang.NAME,
            width: 200
        }, {
            field: 'userName',
            headerName: lang.USERNAME,
            width: 150
        }, {
            field: 'loginDate',
            headerName: 'تاريخ تسجيل الدخول',
            width: 200,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.loginDate)} i={1} />
            }
        }, {
            field: 'logoutDate',
            headerName: 'تاريخ تسجيل الخروج',
            width: 200,
            filterable: false,
            sortable: false,
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
            field: 'isLoggedOutAutomatic',
            headerName: 'هل كان تسجيل الخروج تلقائي ؟',
            width: 200,
            type: "boolean",
            sortable: false,
        }, {
            field: 'isExpired',
            headerName: 'هل انتهت الصلاحيه؟',
            width: 200,
            type: "boolean",
            filterable: false,
            sortable: false,
        }, {
            field: 'ip',
            headerName: 'User IP',
            width: 200,
        }, {
            field: 'expiresAt',
            headerName: 'تنتهى فى',
            width: 200,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                if (params.row.isExpired) {
                    return <TabInfo count={getFullDate(params.row.expiresAt)} i={3} />
                } else {
                    return <TabInfo count={'تنتهى فى' + ' ' + getFullDate(params.row.expiresAt)} i={1} />
                }
            }
        }, {
            field: 'browserName',
            headerName: 'المتصفح',
            width: 200,
        }, {
            field: 'browserVersion',
            headerName: 'اصدار المتصفح',
            width: 200,
        }, {
            field: 'deviceType',
            headerName: 'الجهاز',
            width: 200,
        },
    ]

    return (
        <Section>
            <TitleWithDividers title={'صفحه التسجيلات'} />
            <MeDatagrid
                apiRef={apiRef}
                type={'crud'}
                columns={columns} fetchFc={fetchFc} loading={isLoading || isLogoutLoading}
                exportTitle={'التسجيلات'}
                analysisFc={analysisSessions} exportObj={exportObj}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        isPdf: true
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
