import SimpleDatagrid from './SimpleDatagrid'
import ServerSideDatagrid from './ServerSideDatagrid'
import CrudDatagrid from './CrudDatagrid'

export default function MeDatagrid({ type, data, exportObj, exportTitle, filterParams, reset, columns, editing, loading, viewFc, fetchFc, updateFc, deleteFc, apiRef }) {

    // simple data grid , server side , crud
    if (type === "server") return <ServerSideDatagrid editing={editing} rows={data} columns={columns} loading={loading} fetchFc={fetchFc} />

    if (type === "crud") return <CrudDatagrid
        exportTitle={exportTitle}
        exportObj={exportObj}
        apiRef={apiRef}
        viewFc={viewFc}
        editing={editing}
        filterParams={filterParams}
        columns={columns} reset={reset}
        loading={loading}
        fetchFc={fetchFc} deleteFc={deleteFc} updateFc={updateFc} />

    return (
        <SimpleDatagrid exportTitle={exportTitle} exportObj={exportObj} editing={editing} rows={data} columns={columns} loading={loading} />
    )
}
