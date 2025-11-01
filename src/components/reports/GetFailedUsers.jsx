import { Box, } from "@mui/material"
import useLazyGetData from "../../hooks/useLazyGetData"
import { lang } from "../../settings/constants/arlang"
import Section from "../../style/mui/styled/Section"
import { useLazyGetFailedReportUserQuery } from "../../toolkit/apis/reportFailedApi"
import MeDatagrid from "../../tools/datagrid/MeDatagrid"
import TabInfo from "../ui/TabInfo"
import TitleWithDividers from "../ui/TitleWithDividers"
import UserAvatar from "../users/UserAvatar"
import { useState } from "react"
import { useCreateReportMutation } from "../../toolkit/apis/reportsApi"
import usePostData from "../../hooks/usePostData"
import { FilledHoverBtn } from "../../style/buttonsStyles"
import WrapperHandler from "../../tools/WrapperHandler"
import Loader from "../../style/mui/loaders/Loader"

function GetFailedUsers({ reportId }) {

    const [chosenUsers, setChosenUsers] = useState([])
    const [reset, setReset] = useState(false)

    const [sendData, sendStatus] = useCreateReportMutation()
    const [createReport] = usePostData(sendData)

    const sendReport = async (users) => {
        await createReport({ excludedUsers: users, isExcluded: false, isNotCreateNewReport: true, report: reportId })
        setReset(!reset)
        setChosenUsers([])
    }



    const [getData, status] = useLazyGetFailedReportUserQuery()
    const [getUsers] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        const res = await getUsers({ ...params, report: reportId })
        const data = { values: res.users, count: res.count }
        return data
    }

    const columns = [
        {
            field: "avatar",
            headerName: lang.IMAGE,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return <UserAvatar user={params.row} />
            }
        },
        {
            field: 'name',
            headerName: lang.NAME,
            width: 200,
        }, {
            field: 'email',
            headerName: lang.EMAIL,
            width: 200,
        }, {
            field: 'userName',
            headerName: lang.USERNAME,
            width: 150

        }, {
            field: 'isActive',
            headerName: lang.IS_ACTIVE,
            type: "boolean",
            editable: true,
            renderCell: (params) => {
                return (
                    <Box>
                        {params.row.isActive ? <TabInfo count={lang.ACTIVE} i={1} />
                            : <TabInfo count={lang.NOT_ACTIVE} i={3} />}
                    </Box>
                )
            }
        }, {
            field: 'phone',
            headerName: lang.PHONE,
            width: 200

        }, {
            field: 'familyPhone',
            headerName: lang.FAMILY_PHONE,
            width: 200
        },
    ]

    const reSendToOneUser = async (user) => {
        await sendReport([user._id])
    }
    return (
        <Section>
            <TitleWithDividers title={'مستخدمين فشل الارسال اليهم'} />
            <MeDatagrid
                reset={[reset]}
                setSelection={setChosenUsers}
                type={'crud'}
                columns={columns}
                fetchFc={fetchFc} viewFc={reSendToOneUser}
                loading={status.isLoading}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true
                    }
                }
            />

            {chosenUsers.length > 0 && (
                <WrapperHandler status={sendStatus} showSuccess={true}>
                    <FilledHoverBtn onClick={() => sendReport(chosenUsers)} disabled={sendStatus.isLoading}>
                        {sendStatus.isLoading ? <Loader color={'#fff'} /> : 'اعاده الارسال'}
                    </FilledHoverBtn>
                </WrapperHandler>
            )}
        </Section>
    )
}

export default GetFailedUsers
