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
            field: 'method',
            label: "Method"
        }, {
            field: 'url',
            label: "URL",
            width: 200,

        }, {
            field: 'stack',
            label: "Stack",
            width: 400,
            flex: 1
        }, {
            field: 'isOperational',
            label: "From User",
            type: 'boolean',
        }, {
            field: 'createdAt',
            label: "Created At",
            type: 'date',
            valueGetter: (createdAt) => new Date(createdAt)
        }
    ]

    return (
        <Section>
            <TitleWithDividers title={'Errors Page'} />
            <FullComponent data={{
                columns, useFetch: useLazyGetErrorsQuery, resKey: 'errors',
            }} />
        </Section>
    )
}

export default ErrorsPage
