import React from 'react'
import SimpleDatagrid from './SimpleDatagrid'
import ServerSideDatagrid from './ServerSideDatagrid'
import CrudDatagrid from './CrudDatagrid'

export default function MeDatagrid({ type, data, filterParams, reset, columns, editing, loading, fetchFc, updateFc, deleteFc, apiRef }) {

    // simple data grid , server side , crud
    if (type === "server") return <ServerSideDatagrid editing={editing} rows={data} columns={columns} loading={loading} fetchFc={fetchFc} />

    if (type === "crud") return <CrudDatagrid
        apiRef={apiRef}
        editing={editing}
        filterParams={filterParams}
        columns={columns} reset={reset}
        loading={loading}
        fetchFc={fetchFc} deleteFc={deleteFc} updateFc={updateFc} />

    return (
        <SimpleDatagrid editing={editing} rows={data} columns={columns} loading={loading} />
    )
}
