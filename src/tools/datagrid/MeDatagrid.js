import SimpleDatagrid from './SimpleDatagrid'
import ServerSideDatagrid from './ServerSideDatagrid'
import CrudDatagrid from './CrudDatagrid'
import { useMemo } from 'react'

export default function MeDatagrid({
    type, data, filterParams, reset, columns = [], editing, loading, addColumns = null, massActions,
    exportObj, exportTitle,
    viewFc, fetchFc, updateFc, deleteFc, apiRef, deleteMany, ViewRow, analysisFc, viewRowModal,
    setSelection = false, allSelected,selections,
    disabledActions = [], disableAllActions, allStatuses
}) {

    const modifiedColumns = useMemo(() => {
        let result = [...columns];

        // Normalize addColumns into array
        const columnsToAdd = addColumns
            ? (Array.isArray(addColumns) ? addColumns : [addColumns])
            : [];

        columnsToAdd.forEach(col => {
            if (typeof col.colIndex === "number") {
                // insert at specific index
                const index = Math.max(0, Math.min(col.colIndex, result.length));
                result.splice(index, 0, col);
            } else {
                // normal push
                result.push(col);
            }
        });

        return result;

    }, [addColumns, columns]);


    // const modifiedColumns = useMemo(() => {
    //     const columnsToAdd = addColumns && (Array.isArray(addColumns) ? addColumns : [addColumns])
    //     if (columnsToAdd) {
    //         return [...columns, ...columnsToAdd]
    //     } else {
    //         return columns
    //     }
    // }, [addColumns, columns])


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
        massActions={massActions} allStatuses={allStatuses}
        exportTitle={exportTitle}
        exportObj={exportObj}
        apiRef={apiRef}
        viewFc={viewFc} ViewRow={ViewRow} analysisFc={analysisFc} viewRowModal={viewRowModal}
        editing={editing}
        filterParams={filterParams}
        columns={modifiedColumns} reset={reset} addColumns={addColumns}
        loading={loading}
        setSelection={setSelection} selections={selections}
        allSelected={allSelected}
        fetchFc={fetchFc} deleteFc={deleteFc} updateFc={updateFc} deleteMany={deleteMany} />

    return (
        <SimpleDatagrid exportTitle={exportTitle} exportObj={exportObj} editing={editing} rows={data} columns={modifiedColumns} loading={loading} />
    )
}
