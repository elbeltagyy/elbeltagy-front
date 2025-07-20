import SimpleDatagrid from './SimpleDatagrid'
import ServerSideDatagrid from './ServerSideDatagrid'
import CrudDatagrid from './CrudDatagrid'
import { useMemo } from 'react'

export default function MeDatagrid({
    type, data, filterParams, reset, columns = [], editing, loading, addColumns,
    exportObj, exportTitle,
    viewFc, fetchFc, updateFc, deleteFc, apiRef,
    setSelection = false, allSelected,
    disabledActions = [], disableAllActions
}) {

    const modifiedColumns = useMemo(() => {
        const columnsToAdd = addColumns && (Array.isArray(addColumns) ? addColumns : [addColumns])
        if (columnsToAdd) {
            return [...columns, ...columnsToAdd]
        } else {
            return columns
        }
    }, [addColumns, columns])


    if (disableAllActions) {
        viewFc = null;
        // fetchFc = null;
        updateFc = null;
        deleteFc = null;
    } else if (Array.isArray(disabledActions) && disabledActions.length > 0) {
        if (disabledActions.includes("view")) viewFc = null;
        // if (disabledActions.includes("fetch")) fetchFc = null;
        if (disabledActions.includes("update")) updateFc = null;
        if (disabledActions.includes("delete")) deleteFc = null;
    }


    // simple data grid , server side , crud
    if (type === "server") return <ServerSideDatagrid editing={editing} rows={data} columns={modifiedColumns} loading={loading} fetchFc={fetchFc} />

    if (type === "crud") return <CrudDatagrid
        exportTitle={exportTitle}
        exportObj={exportObj}
        apiRef={apiRef}
        viewFc={viewFc}
        editing={editing}
        filterParams={filterParams}
        columns={modifiedColumns} reset={reset} addColumns={addColumns}
        loading={loading}
        setSelection={setSelection}
        allSelected={allSelected}
        fetchFc={fetchFc} deleteFc={deleteFc} updateFc={updateFc} />

    return (
        <SimpleDatagrid exportTitle={exportTitle} exportObj={exportObj} editing={editing} rows={data} columns={modifiedColumns} loading={loading} />
    )
}
