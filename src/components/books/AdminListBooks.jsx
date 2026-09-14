import { Box, Button, IconButton, Stack } from "@mui/material"
import BtnsGroup from "../../style/mui/styled/BtnsGroup"
import useGrades from "../../hooks/useGrades"
import { useState } from "react"
import FullComponent from "../../tools/datagrid/FullComponent"
import { useDeleteBookMutation, useLazyGetBooksQuery, useUpdateBookMutation } from "../../toolkit/apis/booksApi"
import { lang } from "../../settings/constants/arlang"
import UserAvatar from "../users/UserAvatar"
import { makeArrWithValueAndLabel } from "../../tools/fcs/MakeArray"
import TabInfo from "../ui/TabInfo"
import { getFullDate } from "../../settings/constants/dateConstants"

import { Add } from "@mui/icons-material"
import BtnModal from "../ui/BtnModal"
import CreateBook from "./CreateBook"
import UpdateBook from "./UpdateBook"
import AdminBooksOrders from "./AdminBooksOrders"
import Users from "../all/Users"
import usePostData from "../../hooks/usePostData"
import { useCreateBookOrderMutation } from "../../toolkit/apis/booksOrdersApi"
import BtnConfirm from "../ui/BtnConfirm"
import { IoIosAddCircleOutline } from "react-icons/io"

function AdminListBooks() {
    const { grades } = useGrades()
    const [active, setActive] = useState(0)
    const [reset, setReset] = useState(false)

    const btns = grades.map(g => ({ label: g?.name }))
    const grade = grades[active]

    const [sendAdd, sendAddStatus] = useCreateBookOrderMutation()
    const [addBookToUsers] = usePostData(sendAdd)
    const manageUser = async (v) => {
        await addBookToUsers(v)
        setReset(pre => !pre)
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
                    <UserAvatar user={params.row} />
                )
            }
        },
        {
            field: 'title',
            headerName: 'عنوان الكتاب',
            width: 200,
        }, {
            field: 'description',
            headerName: 'الوصف',
            width: 200,
        }, {
            field: 'isActive',
            headerName: lang.IS_ACTIVE,
            type: "boolean",
            isSwitch: true
        }, {
            field: "grade",
            headerName: lang.GRADE,
            type: 'singleSelect',
            width: 200,
            valueOptions: makeArrWithValueAndLabel(grades, { value: 'index', label: 'name' }),
            filterable: false
        }, {
            field: "type",
            headerName: 'نوع الكتاب',
            type: 'singleSelect',
            width: 200,
            valueOptions: [{ value: 'physical', label: 'توصيل' }, { value: 'download', label: 'تحميل' }],
        }, {
            field: "copies",
            headerName: 'عدد النسخ',
            type: 'number',
            editable: true
        }, {
            field: "numbers",
            headerName: 'عدد مرات الشراء',
            type: 'number',
        }, {
            field: "booksOrders",
            headerName: 'الاشتراكات',
            type: 'actions',
            width: 200,
            renderCell: (params) => {
                return <BtnModal btnName={'الاشتراكات'} component={<AdminBooksOrders filters={{ book: params.row._id }} />} />
            }
        }, {
            field: "users",
            headerName: 'الطلاب الغير مشتركين',
            type: 'actions',
            width: 200,
            renderCell: (params) => {
                const book = params.row
                return <BtnModal btnName={'اضافه طالب'}
                    color={'error'}
                    component={
                        <Users
                            filters={{ books: '!=_split_' + book._id }}
                            allStatuses={[sendAddStatus]}
                            reset={reset}
                            massActions={[{
                                label: 'ايضافه الطلاب الي الكتاب ' + book.title,
                                onClick: (chosenUsers) => manageUser({
                                    users: chosenUsers, book: book._id
                                })
                            }]}
                            addColumns={[{
                                field: 'add',
                                headerName: 'اضافه الطالب',
                                type: 'actions',
                                getActions: (userParams) => {
                                    return [
                                        <BtnConfirm
                                            modalInfo={{
                                                desc: 'سيتم اضافه هذا الطالب الي الرابط'
                                            }}
                                            btn={<IconButton color='success'
                                                onClick={() => manageUser({
                                                    book: book._id, user: userParams.row._id
                                                })}>
                                                <IoIosAddCircleOutline></IoIosAddCircleOutline>
                                            </IconButton>} key={0} />
                                    ]
                                }
                            }]}
                        />}
                />
            }
        }, {
            field: "edit",
            headerName: 'تعديل',
            type: 'actions',
            width: 200,
            renderCell: (params) => {
                return <BtnModal btnName={'تعديل'} component={<UpdateBook book={params.row} />} />
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
        <Box mt='16px'>
            <Stack direction="row" flexWrap={'wrap'} justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <BtnsGroup sx={{ width: 'fit-content' }} btns={btns} state={{ active, setActive }} />
                {grade?.index && (
                    <BtnModal
                        btn={<Button variant="contained" startIcon={<Add />}>
                            اضافه كتاب
                        </Button>}
                        component={<CreateBook setReset={setReset} grade={grade?.index} gradeName={grade?.name} />}
                    />
                )}

            </Stack>

            {(grade?.index ?? false) && (
                <FullComponent data={{
                    useFetch: useLazyGetBooksQuery,
                    useUpdate: useUpdateBookMutation, isMultiPart: true,
                    useDelete: useDeleteBookMutation,
                    resKey: 'books',
                    fetchFilters: { grade: grade?.index },
                    columns,
                    reset: [grade?.index, reset]
                    // viewFc, deleteFc, updateFc,
                    // massActions, selections,
                    // addColumns
                }} />
            )}
        </Box>
    )
}

export default AdminListBooks