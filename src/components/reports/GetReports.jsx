import TabInfo from "../ui/TabInfo"
import { getDateWithTime, getFullDate } from "../../settings/constants/dateConstants"
import MeDatagrid from "../../tools/datagrid/MeDatagrid"
import { useDeleteReportMutation, useLazyGetReportsQuery, useUpdateReportMutation } from "../../toolkit/apis/reportsApi"
import useLazyGetData from "../../hooks/useLazyGetData"
import usePostData from "../../hooks/usePostData"
import { useState } from "react"
import ModalStyled from "../../style/mui/styled/ModalStyled"
import GetFailedUsers from "./GetFailedUsers"


const exportObj = {
    createdAt: (row) => {
        return getDateWithTime(row.createdAt)
    },
    dateStart: (row) => {
        return getDateWithTime(row.dateStart)
    },
    dateEnd: (row) => {
        return getDateWithTime(row.dateEnd)
    },
}


function GetReports() {

    const columns = [
        {
            field: 'title',
            headerName: 'اسم التقرير',
            width: 200,
            editable: true
        }, {
            field: 'description',
            headerName: 'وصف التقرير',
            width: 200,
            editable: true
        }, {
            field: 'startDate',
            headerName: 'من',
            width: 200,
            renderCell: (params) => {
                return params.row.startDate ? <TabInfo count={getFullDate(params.row.startDate)} i={2} /> : ''
            }
        }, {
            field: 'endDate',
            headerName: 'الي',
            width: 200,
            renderCell: (params) => {
                return params.row.endDate ? <TabInfo count={getFullDate(params.row.endDate)} i={2} /> : ''
            }
        }, {
            field: 'createdAt',
            headerName: 'تاريخ الانشاء',
            width: 200,
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.createdAt)} i={1} />
            }
        },
    ]

    const [open, setOpen] = useState(false)
    const [chosenReport, setChosenReport] = useState({})

    const [getData, status] = useLazyGetReportsQuery()
    const [getReports] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        const res = await getReports(params)
        const data = { values: res.reports, count: res.count }
        return data
    }

    const [sendData, deleteStatus] = useDeleteReportMutation()
    const [deleteReport] = usePostData(sendData)

    const deleteFc = async (id) => {
        await deleteReport({ _id: id })
    }

    const [updateDate, updateStatus] = useUpdateReportMutation()
    const [updateReport] = usePostData(updateDate)

    const updateFc = async (report) => {
        const res = await updateReport(report)
        return res
    }

    const viewFc = (report) => {
        //
        setChosenReport(report)
        setOpen(true)
    }
    return (
        <>
            <MeDatagrid
                // reset={[reset, grade]}
                type={'crud'} exportObj={exportObj} exportTitle={'التقارير'}
                columns={columns}
                viewFc={viewFc}
                fetchFc={fetchFc} deleteFc={deleteFc} updateFc={updateFc}
                loading={status.isLoading || deleteStatus.isLoading || updateStatus.isLoading}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true, isPdf: true
                    }
                }
            />
            <ModalStyled open={open} setOpen={setOpen}>
                <GetFailedUsers reportId={chosenReport._id} />
            </ModalStyled>
        </>
    )
}

export default GetReports
