import { Box, Typography } from "@mui/material"
import { lang } from "../../settings/constants/arlang"
import { useLazyGetUsersQuery } from "../../toolkit/apis/usersApi"
import FullComponent from "../../tools/datagrid/FullComponent"
import UserAvatar from "../users/UserAvatar"
import TabInfo from "../ui/TabInfo"
import { user_roles } from "../../settings/constants/roles"
import { convertObjToArray, handelObjsOfArr, makeArrWithValueAndLabel } from "../../tools/fcs/MakeArray"
import governments from "../../settings/constants/governments"
import { getFullDate } from "../../settings/constants/dateConstants"

import useGrades from "../../hooks/useGrades"
import BtnModal from "../ui/BtnModal"
import NotificationsForm from "../notifications/NotificationsForm"
const [roles] = convertObjToArray(user_roles)

function Users({ filters, reset, viewFc, deleteFc, updateFc, massActions = [], allStatuses, addColumns, setExcludedUsers, setMatches, setCount }) {
    const { grades } = useGrades()

    const modifiedMassActions = [{
        Component: ({ selectedIds = [] }) => {

            return <BtnModal
                btn={'ارسال الي : ' + selectedIds.length + ' ' + 'مستخدم'}
                component={<NotificationsForm users={selectedIds} />}
            />
        }
    }, ...massActions]

    const columns = [
        {
            field: "avatar",
            headerName: lang.IMAGE,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return (
                    <UserAvatar user={params.row} />
                )
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
        }, {
            field: 'sendNotification',
            headerName: 'ارسال اشعار',
            type: 'actions',
            width: 200,
            renderCell: (p) => {
                return <BtnModal btnName={'ارسال رساله'} component={<NotificationsForm user={p.row} />} />
            }
        }, {
            field: 'role',
            headerName: lang.ROLE,
            type: 'singleSelect',
            width: 200,
            valueOptions: roles,
        }, {
            field: "grade",
            headerName: lang.GRADE,
            type: 'singleSelect',
            width: 200,
            valueOptions: handelObjsOfArr(grades, { value: 'index', label: 'name' }),

        }, {
            field: "government",
            headerName: 'المحافظه',
            type: 'singleSelect',
            width: 200,
            valueOptions: makeArrWithValueAndLabel(governments, { value: 'id', label: 'governorate_name_ar', isNumber: true }),
            renderCell: (params) => {
                const government = governments.filter(({ id }) => Number(id) === Number(params.row.government))[0]
                return (
                    <Typography>
                        {params.row.role === user_roles.ADMIN ? user_roles.ADMIN
                            : government?.governorate_name_ar}
                    </Typography>
                )
            }
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

    return (
        <div>
            <FullComponent data={{
                useFetch: useLazyGetUsersQuery,
                resKey: 'users',
                fetchFilters: filters,
                viewFc, deleteFc, updateFc,
                columns, massActions: modifiedMassActions, allStatuses,
                reset, addColumns, setSelection: setExcludedUsers, setMatches, setCount
                //     reset, loading
            }} />
        </div>
    )
}

export default Users
