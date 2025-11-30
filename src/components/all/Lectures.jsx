import { Box } from "@mui/material"
import { lang } from "../../settings/constants/arlang"
import { useLazyGetLecturesQuery } from "../../toolkit/apis/lecturesApi"
import FullComponent from "../../tools/datagrid/FullComponent"
import TabInfo from "../ui/TabInfo"
import { makeArrWithValueAndLabel } from "../../tools/fcs/MakeArray"

import { getFullDate } from "../../settings/constants/dateConstants"
import useGrades from "../../hooks/useGrades"

function Lectures({ filters, reset, viewFc, deleteFc, updateFc, massActions, allStatuses, addColumns }) {
    const { grades } = useGrades()

    const columns = [
        {
            field: 'name',
            headerName: 'اسم المحاضره',
            width: 200,
        }, {
            field: 'isActive',
            headerName: lang.IS_ACTIVE,
            type: "boolean",
            renderCell: (params) => {
                return (
                    <Box>
                        {params.row.isActive ? <TabInfo count={lang.ACTIVE} i={1} />
                            : <TabInfo count={lang.NOT_ACTIVE} i={3} />}
                    </Box>
                )
            }
        }, {
            field: "grade",
            headerName: lang.GRADE,
            type: 'singleSelect',
            width: 200,
            valueOptions: makeArrWithValueAndLabel(grades, { value: 'index', label: 'name' }),
        }, {
            field: 'createdAt',
            headerName: 'تاريخ الانشاء',
            width: 200,
            type: 'date',
            valueGetter: (createdAt) => new Date(createdAt),
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.createdAt)} i={1} />
            }
        },
    ]
    // const fetchFc = (s) => console.log(s)
    return (
        <div>
            <FullComponent data={{
                useFetch: useLazyGetLecturesQuery,
                resKey: 'lectures',
                fetchFilters: filters,
                viewFc, deleteFc, updateFc,
                columns, addColumns, massActions, allStatuses, reset
                //     reset, loading
            }} />
        </div>
    )
}

export default Lectures
