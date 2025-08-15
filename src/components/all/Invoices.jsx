import FullComponent from '../../tools/datagrid/FullComponent'
import { getDateWithTime, getFullDate } from '../../settings/constants/dateConstants'
import UserAvatar from '../users/UserAvatar'
import { lang } from '../../settings/constants/arlang'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import products from '../../settings/constants/products'
import statusConstants from '../../settings/constants/status'
import TabInfo from '../ui/TabInfo'
import { useLazyGetInvoicesQuery } from '../../toolkit/apis/invoicesApi'

const exportObj = {
    grade: (row) => {
        return products.find(p => p.id === row.id)?.name
    },
    price: (row) => {
        return row.price + ' ' + 'جنيه'
    },
    createdAt: (row) => {
        return getDateWithTime(row.createdAt)
    }
}
function Invoices() {
    const columns = [
        {
            field: "image",
            headerName: lang.IMAGE,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return <UserAvatar url={params.row?.payment?.file?.url} />
            }
        },
        {
            field: 'userName',
            headerName: 'اسم المستخدم',
            width: 200,
            sortable: false,
            filterable: false,
        },
        {
            field: 'user_name',
            headerName: 'اسم الطالب',
            width: 200,
            sortable: false,
            filterable: false,
        }, {
            field: 'paymentName',
            headerName: 'وسيله الدفع',
            width: 200,
            sortable: false,
            filterable: false,
        }, {
            field: 'name',
            headerName: 'الشراء',
            width: 200,
            type: 'singleSelect',
            valueOptions: makeArrWithValueAndLabel(products, { value: 'id', label: 'name' }),
        }, {
            field: 'description',
            headerName: 'الوصف',
            width: 200
        }, {
            field: 'status',
            headerName: lang.IS_ACTIVE,
            type: "singleSelect",
            valueOptions: [statusConstants.FAILED, statusConstants.PAID, statusConstants.PENDING, statusConstants.REJECTED],
            renderCell: (params) => {
                return (
                    <TabInfo
                        count={params.row.status}
                        i={(params.row.status === statusConstants.FAILED || params.row.status === statusConstants.REJECTED) ? 3 : params.row.status === statusConstants.PENDING ? 2 : 1} />
                )
            }
        }, {
            field: 'file',
            headerName: 'صوره التحويل',
            sortable: false,
            filterable: false,
            disableExport: true,
            renderCell: (params) => {
                return (
                    <UserAvatar url={params.row.file?.url} />
                )
            }
        }, {
            field: 'price',
            headerName: 'سعر الفاتوره',
            type: "number",
            renderCell: (params) => {
                return (
                    <TabInfo count={(params.row.price || 0) + ' جنيه'} i={0} />
                )
            }
        }, {
            field: 'orderId',
            headerName: "orderId",
        }, {
            field: 'note',
            headerName: "ملاحظات من الطالب",
            width: 200
        }, {
            field: 'message',
            headerName: 'رساله الخطا',
            width: 200,
            renderCell: (params) => {
                return params.row.message || 'لا يوجد خطا'
            }
        }, {
            field: 'createdAt',
            headerName: "تاريخ الانشاء",
            type: 'date',
            width: 150,
            valueGetter: (date) => new Date(date),
            renderCell: (params) => {
                return <TabInfo i={0} count={getFullDate(params.row.createdAt)} />
            }
        },
    ]

    const fetchFc = (data) => {
        const modified = data.invoices.map(invoice => {
            return {
                ...invoice,
                userName: invoice?.user?.userName,
                user_name: invoice?.user?.name,
                paymentName: invoice?.payment?.name, payment: invoice?.payment,
                course: invoice?.course?.name
            }
        })
        const res = { invoices: modified, count: data.count }
        return res
    }

    return (
        <FullComponent data={{
            useFetch: useLazyGetInvoicesQuery, resKey: 'invoices',
            columns, fetchFc, fetchFilters: { populate: 'payment user' },
            exportObj, exportTitle: 'مدفوعات الطالب '
        }} />

    )
}

export default Invoices
