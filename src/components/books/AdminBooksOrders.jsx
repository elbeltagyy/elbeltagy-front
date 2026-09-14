import { useGridApiRef } from "@mui/x-data-grid"
import usePostData from "../../hooks/usePostData"
import { lang } from "../../settings/constants/arlang"
import { getFullDate } from "../../settings/constants/dateConstants"
import { useDeleteBooksOrderMutation, useLazyGetBooksOrdersQuery, useUpdateBookOrderMutation } from "../../toolkit/apis/booksOrdersApi"
import FullComponent from "../../tools/datagrid/FullComponent"
import TabInfo from "../ui/TabInfo"
import UserAvatar from "../users/UserAvatar"
import BtnConfirm from "../ui/BtnConfirm"
import { Button, Chip } from "@mui/material"
import bookConstants from "../../settings/constants/bookConstants"

function AdminBooksOrders({ filters = {} }) {

    const apiRef = useGridApiRef();


    const [sendData] = useUpdateBookOrderMutation()
    const [updateBook] = usePostData(sendData)

    const updateBookOrder = async (preOrder) => {
        const order = await updateBook(preOrder)
        apiRef.current.updateRows([{ ...order }])
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
                    <UserAvatar user={params.row.book} />
                )
            }
        },
        {
            field: 'title',
            headerName: 'عنوان الكتاب',
            width: 200,
            filterable: false,
            sortable: false,
            valueGetter: (v, r) => r.book.title
        }, {
            field: 'description',
            headerName: 'الوصف',
            width: 200,
            sortable: false,
            filterable: false,
            valueGetter: (v, r) => r.book.description,
        }, {
            field: 'user_name',
            headerName: 'الطالب',
            width: 200,
            sortable: false,
            filterable: false,
            valueGetter: (v, r) => r.user.name,
        }, {
            field: 'userName',
            headerName: 'اسم المستخدم',
            width: 200,
            sortable: false,
            filterable: false,
            valueGetter: (v, r) => r.user.userName,
        }, {
            field: 'phone',
            headerName: 'رقم الهاتف',
            width: 200,
            sortable: false,
            filterable: false,
            valueGetter: (v, r) => r.user.phone,
        }, {
            field: "status",
            headerName: 'حاله الكتاب',
            type: 'singleSelect',
            width: 200,
            sortable: filters.status ? false : true,
            filterable: filters.status ? false : true,
            renderCell: (p) => {
                return <TabInfo count={p.row.status === 'pending' ? "في انتظار التوصيل" : p.row.status} i={p.row.status === 'pending' ? 2 : 1} />
            },
            valueOptions: [{ value: 'pending', label: 'توصيل' }, { value: 'paid', label: 'تم الدفع و التسليم' }],
        }, {
            field: "confirmFc",
            headerName: 'تاكيد التوصيل',
            type: 'action',
            width: 200,
            renderCell: (p) => {
                return (p.row.status === 'paid' && p.row.book.type === bookConstants.PHYSICAL) ? <Chip size="small" variant="filled" color="success" label='تم الدفع والتوصيل ' />: p.row.status === 'pending' && <BtnConfirm btn={<Button variant="contained" onClick={() => updateBookOrder({ _id: p.row._id, status: 'paid' })} color="warning">تاكيد التوصيل</Button>} />
            },
            valueOptions: [{ value: 'pending', label: 'توصيل' }, { value: 'paid', label: 'تم الدفع و التسليم' }],
        }, {
            field: "type",
            headerName: 'نوع الكتاب',
            type: 'singleSelect',
            width: 200,
            sortable: false,
            filterable: false,
            valueGetter: (v, r) => r.book.type,
            valueOptions: [{ value: 'physical', label: 'توصيل' }, { value: 'download', label: 'تحميل' }],
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
        <FullComponent data={{
            useFetch: useLazyGetBooksOrdersQuery,
            useDelete: useDeleteBooksOrderMutation,
            resKey: 'booksOrders',
            fetchFilters: { populate: 'book user.name user.userName user.phone', ...filters },
            columns, apiRef,

            // reset: [grade?.index, reset]
            // viewFc, deleteFc, updateFc,
            // massActions, selections,
            // addColumns
        }} />
    )
}

export default AdminBooksOrders