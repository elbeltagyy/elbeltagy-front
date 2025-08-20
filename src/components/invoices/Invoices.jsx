import { useState } from "react"
import { lang } from "../../settings/constants/arlang"
import UserAvatar from "../users/UserAvatar"
import TabInfo from "../ui/TabInfo"
import { getDateWithTime, getFullDate } from "../../settings/constants/dateConstants"
import FullComponent from "../../tools/datagrid/FullComponent"
import { useDeleteInvoiceMutation, useDeleteManyInvoicesMutation, useInvoiceWebhookMutation, useLazyGetInvoicesQuery, useUpdateInvoiceMutation } from "../../toolkit/apis/invoicesApi"
import BtnConfirm from "../ui/BtnConfirm"
import { FilledHoverBtn } from "../../style/buttonsStyles"
import { HiArrowLeft, HiExclamationCircle } from "react-icons/hi"
import { Button } from "@mui/material"
import { makeArrWithValueAndLabel } from "../../tools/fcs/MakeArray"
import products from "../../settings/constants/products"
import statusConstants from "../../settings/constants/status"
import usePostData from "../../hooks/usePostData"

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
    const [reset, setReset] = useState(false)

    const [sendData, status] = useInvoiceWebhookMutation()
    const [acceptInvoice] = usePostData(sendData)

    const acceptWebhook = async (row, api) => {
        const res = await acceptInvoice(row)
        api.updateRows([{ ...row, status: res.status }])
    }

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
        },
        {
            field: 'user_name',
            headerName: 'اسم الطالب',
            width: 200,
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
            field: 'sendFrom',
            headerName: 'تم الارسال من',
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
            field: 'agree',
            headerName: 'الموافقه',
            type: "action",
            width: 200,
            disableExport: true,

            renderCell: (params) => {
                const isAccepted = params.row.status === statusConstants.PAID
                return (
                    <BtnConfirm btn={<Button onClick={() => acceptWebhook({ ...params.row, status: statusConstants.PAID }, params.api)} variant="contained" color="success" disabled={isAccepted} endIcon={<HiArrowLeft />}>
                        {isAccepted ? 'تم قبوله' : 'قبول الطلب'}
                    </Button>} />
                )
            }
        }, {
            field: 'disAgree',
            headerName: 'رفض الطلب او الغاءه',
            type: "action",
            width: 200,
            disableExport: true,
            renderCell: (params) => {
                const isRejected = params.row.status === statusConstants.REJECTED
                const isPaid = params.row.status === statusConstants.PAID
                return (
                    <BtnConfirm
                        modalInfo={{
                            desc: 'سيتم رفض الطلب !' + ' ' + (isPaid ? "و " + ' سيتم الغاء الاشتراك ' : '')
                        }}
                        btn={<Button onClick={() => acceptWebhook({
                            ...params.row, status: statusConstants.REJECTED
                        }, params.api)} variant="contained" color="error" disabled={isRejected} endIcon={<HiExclamationCircle />}>
                            {isRejected ? 'تم الرفض' : 'رفض الطلب'}
                        </Button>} />
                )
            }
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
        <div>

            <FullComponent data={{
                useFetch: useLazyGetInvoicesQuery,
                useDeleteMany: useDeleteManyInvoicesMutation,
                resKey: 'invoices',
                fetchFilters: { populate: 'user payment course' }, //isMultiPart: true,
                fetchFc,
                // useUpdate: useUpdateInvoiceMutation,
                useDelete: useDeleteInvoiceMutation,
                columns, reset, loading: status.isLoading, exportObj, exportTitle: 'مدفوعات الطلاب '
            }} />
        </div>
    )
}

export default Invoices
//01552788165
//30703101201509
//elawadym44@gmail.com
//1645999
//15496667