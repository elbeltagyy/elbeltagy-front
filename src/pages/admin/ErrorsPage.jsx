import { Button } from "@mui/material"
import BtnConfirm from "../../components/ui/BtnConfirm"
import TitleWithDividers from "../../components/ui/TitleWithDividers"
import Section from "../../style/mui/styled/Section"
import { useDeleteSameErrorsMutation, useLazyGetErrorsQuery } from "../../toolkit/apis/errorsApi"
import FullComponent from "../../tools/datagrid/FullComponent"
import usePostData from "../../hooks/usePostData"

function ErrorsPage() {

    const [deleteFc, status] = useDeleteSameErrorsMutation()
    const [deleteSame] = usePostData(deleteFc)

    const columns = [
        {
            field: "message",
            headerName: "Message",
            width: 200,
        }, {
            field: "name",
            headerName: "user",
            width: 200,
            filterable: false,
            sortable: false,
            renderCell: (p) => {
                return p.row.user?.name
            }
        }, {
            field: "userName",
            headerName: "userName",
            width: 200,
            filterable: false,
            sortable: false,
            renderCell: (p) => p.row.user?.userName
        }, {
            field: 'method',
            headerName: "Method"
        }, {
            field: 'url',
            headerName: "URL",
            width: 200,

        }, {
            field: 'stack',
            headerName: "Stack",
            width: 400,
            flex: 1
        }, {
            field: 'isOperational',
            headerName: "From User",
            type: 'boolean',
        }, {
            field: 'statusCode',
            headerName: "statusCode",
            type: 'number',
        }, {
            field: 'deleteSame',
            headerName: "Delete All",
            type: 'actions',
            width: 200,
            renderCell: (p) => {
                return <BtnConfirm btn={<Button onClick={() => deleteSame(p.row)}>Delete All Same</Button>} />
            }
        }, {
            field: 'deleteMassive',
            headerName: "Delete Massive",
            type: 'actions',
            width: 200,
            renderCell: (p) => {
                return <BtnConfirm btn={<Button onClick={() => deleteSame({ ...p.row, isMassive: true })}>Delete Massive</Button>} />
            }
        }, {
            field: 'createdAt',
            headerName: "Created At",
            type: 'date',
            valueGetter: (createdAt) => new Date(createdAt)
        }
    ]

    return (
        <Section>
            <TitleWithDividers title={'Errors Page'} />
            <FullComponent data={{
                columns, useFetch: useLazyGetErrorsQuery, resKey: 'errors', fetchFilters: { populate: 'user' }, allStatuses: [status]
            }} />
        </Section>
    )
}

export default ErrorsPage
