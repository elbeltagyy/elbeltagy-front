import { useState } from 'react'
import { lang } from '../../settings/constants/arlang'
import { useDeletePaymentMutation, useLazyGetPaymentsQuery, useUpdatePaymentMutation } from '../../toolkit/apis/paymentsApi'
import FullComponent from '../../tools/datagrid/FullComponent'
import BtnModal from '../ui/BtnModal'
import DataWith3Items from '../ui/DataWith3Items'
import TabInfo from '../ui/TabInfo'
import UserAvatar from '../users/UserAvatar'
import CreatePayment from './CreatePayment'
import { getFullDate } from '../../settings/constants/dateConstants'

function GetPayments() {

    const [reset, setReset] = useState(false)
    const columns = [
        {
            field: 'index',
            headerName: "الرقم",
            type: 'number',
        },
        {
            field: "image",
            headerName: lang.IMAGE,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return <UserAvatar url={params.row?.file?.url} />
            }
        },
        {
            field: 'name',
            headerName: 'اسم وسيله الدفع',
            width: 200,
            editable: true
        }, {
            field: 'description',
            headerName: "الوصف",
            width: 150,
            renderCell: (params) => {
                return <div dangerouslySetInnerHTML={{ __html: params.row?.description }} />
            }
        }, {
            field: 'isActive',
            headerName: lang.IS_ACTIVE,
            type: "boolean",
            editable: true,
            renderCell: (params) => {
                return (
                    <>
                        {
                            params.row.isActive ? <TabInfo count={lang.ACTIVE} i={1} />
                                : <TabInfo count={lang.NOT_ACTIVE} i={3} />
                        }
                    </>
                )
            }
        }, {
            field: 'startDate',
            headerName: "تاريخ التفعيل",
            type: 'date',
            width: 150,
            valueGetter: (date) => new Date(date),
            renderCell: (params) => {
                return <TabInfo i={1} count={getFullDate(params.row.startDate)} />
            }
        }, {
            field: 'endDate',
            headerName: "تاريخ الانتهاء",
            type: 'date',
            width: 150,
            valueGetter: (date) => new Date(date),
            renderCell: (params) => {
                return <TabInfo i={3} count={getFullDate(params.row.endDate)} />
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

    return (
        <div>
            <BtnModal component={<CreatePayment setReset={setReset} />} btnName={'انشاء وسيله دفع جديده'} isFilledHover={true} />

            <FullComponent data={{
                useFetch: useLazyGetPaymentsQuery,
                resKey: 'payments',
                isMultiPart: true,
                // fetchFc,
                useUpdate: useUpdatePaymentMutation,
                useDelete: useDeletePaymentMutation,
                columns, reset
            }} />
        </div>
    )
}
{/* <Box sx={{ width: 'fit-content' }}>
                <DataWith3Items src={'/assets/logo.webp'} title={'name'} icon={<MdOutlineDriveFileRenameOutline size={'2rem'} />} desc={'desc is here'} />
            </Box> */}
export default GetPayments
