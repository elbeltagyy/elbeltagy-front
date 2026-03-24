import TitleWithDividers from "../../components/ui/TitleWithDividers"
import Section from "../../style/mui/styled/Section"
import { useLazyGetErrorsQuery } from "../../toolkit/apis/errorsApi"
import FullComponent from "../../tools/datagrid/FullComponent"

function ErrorsPage() {


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
                columns, useFetch: useLazyGetErrorsQuery, resKey: 'errors', fetchFilters: { populate: 'user' }
            }} />
        </Section>
    )
}

export default ErrorsPage
