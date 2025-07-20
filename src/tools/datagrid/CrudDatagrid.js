import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import React, { useEffect, useMemo, useState } from 'react'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Box, Grid, IconButton, useTheme } from '@mui/material';
import ModalStyled from '../../style/mui/styled/ModalStyled';
import ExportAsPdf from './ExportAsPdf';
import { HiOutlineRefresh } from "react-icons/hi";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import MakePdf from './MakePdf';



// editing = {bgcolor, }
// req {...filter, ...(sort => sortKey, sortValue), select,  limit, page}
// * in main fc return {values, count}
// only for listen
//filter params +> object has filter keys
// when update done forget to return the new object to rows


const fullDateTimeRegex = /^[A-Za-z]{3}\s[A-Za-z]{3}\s\d{1,2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT[+-]\d{4}\s\(.+\)$/;


function CrudDatagrid({ filterParams = [], exportObj, exportTitle, reset, columns, addColumns, editing = {}, fetchFc, loading, updateFc, deleteFc, apiRef, viewFc, setSelection = false, allSelected }) {
    reset = (Array.isArray(reset) ? reset : [reset])

    const [isOpen, setOpenModal] = useState(false)
    const [deleteId, setDeleteId] = useState("")

    const [isRefresh, setRefresh] = useState(false)
    const theme = useTheme()
    const [rows, setRows] = useState([])

    const [filter, setFilter] = useState()
    const [sort, setSort] = useState()

    // for pagination settings
    const [pageState, setPageState] = useState({
        isLoading: false,
        rowCount: 0
    })

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5, // =limit
    });

    // filtering
    const onFilterChange = React.useCallback((filterModel) => {
        const filtered = {}
        filterModel?.items.map((item) => {
            if (fullDateTimeRegex.test(item.value)) {
                const date = new Date(item.value)
                item.value = date.toISOString().slice(0, 10);
            }
            filtered[item.field] = item.operator + '_split_' + (item.value ?? '') ?? ""
            return filtered
        })
        setFilter(filtered)
    }, []);

    useEffect(() => {
        if (filterParams.length !== 0) {
            setFilter(filterParams)
        }
    }, [...Object.values(filterParams)])

    // for sorting
    const handleSortModelChange = React.useCallback((sortModel) => {
        if (sortModel.length > 0) {
            setSort({
                sortkey: sortModel[0].field,
                sortValue: sortModel[0].sort === 'desc' ? -1 : 1
            })
        }
    }, []);


    // for editing settings #####
    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleRowModesModelChange = (newRowModesModel) => {
        if (updateFc) {
            setRowModesModel(newRowModesModel);
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => async () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => async () => {
        await deleteFc(id)
        setRows(rows.filter((row) => row._id !== id));
        setPageState(pre => { return { ...pre, rowCount: pre.rowCount - 1 } })
    };


    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        // const editedRow = rows.find((row) => row.id === id);
        // if (editedRow.isNew) {
        //     setRows(rows.filter((row) => row.id !== id));
        // }
    };

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const processRowUpdate = async (newRow) => {

        const res = await updateFc(newRow)
        const updatedRow = { ...res, isNew: true };

        setRows(rows.map((row) => (row._id === newRow._id ? updatedRow : row)));
        return updatedRow;
    };

    const modifiedColumns = useMemo(() => {
        const isShowActions = viewFc || updateFc || deleteFc || false
        if (!isShowActions) {
            return [...columns]
        }

        return [...columns, {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 150,
            cellClassName: 'actions',
            getActions: (params) => {
                const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            key={1}
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(params.id)}
                        />,
                        <GridActionsCellItem
                            key={2}
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(params.id)}
                            color="inherit"
                        />,
                    ];
                }
                const actionsArr = []
                if (viewFc) {
                    actionsArr.push(<GridActionsCellItem
                        key={1}
                        icon={<RemoveRedEyeIcon />}
                        label="View"
                        className="textPrimary"
                        onClick={() => {
                            if (!viewFc) {
                                return alert("لا يمكن عرض الصف !")
                            }
                            viewFc(params.row)
                        }}
                        color="inherit"
                    />)
                }
                if (updateFc) {
                    actionsArr.push(<GridActionsCellItem
                        key={2}
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(params.id)}
                        color="inherit"
                    />)
                }

                if (deleteFc) {
                    actionsArr.push(<GridActionsCellItem
                        key={3}
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => {
                            if (!deleteFc) {
                                return alert("لا يمكن الحذف")
                            }
                            setDeleteId(params.id)
                            setOpenModal(true)
                        }}
                        color="inherit"
                    />)
                }
                return actionsArr;
            },
        }]
    }, [columns, rowModesModel])

    // running main fc in  changing 
    useEffect(() => {

        const triggerFetch = async () => {
            setPageState(pre => {
                return {
                    ...pre, isLoading: true
                }
            })
            try {

                const res = await fetchFc(
                    { ...sort, ...filter, limit: paginationModel.pageSize, page: paginationModel.page + 1 }
                )

                //res = {values, count}
                setRows(res.values)
                setPageState(pre => { return { isLoading: false, rowCount: res.count } })
            } catch (error) {
                setPageState(pre => {
                    return {
                        ...pre, isLoading: false
                    }
                })
            }
        }

        triggerFetch()

    }, [paginationModel.page, paginationModel.pageSize, sort, filter, ...reset, isRefresh])


    // // hide columns 
    // const hideColumns = useMemo(() => {
    //     const inVisibleModels = {}
    //     editing?.hideColumns?.map(ele => inVisibleModels[ele] = false)
    //     return inVisibleModels

    // }, [editing?.hideColumns])

    const [chosenColumns, setColumns] = useState(columns)
    // slots
    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <Grid container spacing={2}>
                    {
                        editing?.showSlots?.includes("columns") &&
                        <Grid item>
                            <GridToolbarColumnsButton />
                        </Grid>
                    }
                    {
                        editing?.showSlots?.includes("filter") &&
                        <Grid item>
                            <GridToolbarFilterButton />
                        </Grid>
                    }
                    {
                        editing?.showSlots?.includes("density") &&
                        <Grid item>
                            <GridToolbarDensitySelector />
                        </Grid>
                    }
                    {
                        editing?.showSlots?.includes("export") &&
                        <Grid item>
                            <GridToolbarExport csvOptions={{
                                utf8WithBom: true, // Include BOM for Arabic support
                            }} />
                        </Grid>
                    }
                    {editing?.isPdf && (
                        <Grid item>
                            <ExportAsPdf
                                fetchFc={fetchFc} sort={sort} filter={filter}
                                paginationModel={paginationModel} exportTitle={exportTitle} columns={chosenColumns} rows={rows} exportObj={exportObj} />
                            {/* <MakePdf /> */}
                        </Grid>
                    )}
                    <Grid item>
                        <IconButton disabled={pageState.isLoading || loading} onClick={() => {
                            // setFilter()
                            setSort()
                            setRefresh(!isRefresh)
                        }}>
                            <HiOutlineRefresh style={{ animation: (pageState.isLoading || loading) && 'rotate .5s linear 0s infinite', color: theme.palette.primary.main }} />
                        </IconButton>
                    </Grid>
                </Grid>
            </GridToolbarContainer>
        );
    }
    return (
        <Box width={'100%'} sx={{ position: 'relative', height: '100%' }}>
            <DataGrid
                apiRef={apiRef}
                rows={rows || []}
                columns={modifiedColumns}
                loading={pageState?.isLoading || loading || false}
                rowCount={pageState?.rowCount} // ===> total for server (.length)
                getRowId={(param) => param._id}

                pageSizeOptions={[5, 10, 50, 100]}

                // isRowSelectable={(params) => params.row.isChecked}

                // for pagination
                paginationModel={paginationModel}
                paginationMode="server"
                onPaginationModelChange={setPaginationModel} // controls ==> currntPage, pageSize

                // for search
                onFilterModelChange={onFilterChange}

                //for sorting
                sortingMode="server"
                onSortModelChange={handleSortModelChange}

                //for edit
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={(err) => console.log(err)} // make err
                editMode="row"

                onColumnVisibilityModelChange={(columnState) => {//id: true
                    setColumns(prev => {
                        const colsToUpdate = [...prev]
                        const updatedCols = colsToUpdate.map(col => {
                            const isHasState = columnState[col.field] === false || false
                            col.hidden = isHasState
                            return col
                        })
                        return updatedCols
                    })
                }}
                //#Selection
                checkboxSelection
                keepNonExistentRowsSelected

                onRowSelectionModelChange={(newRowSelectionModel) => {
                    if (setSelection) {

                        if (allSelected) {
                            newRowSelectionModel = newRowSelectionModel.map(selection => {
                                if (typeof selection === 'string') {
                                    selection = rows.find(r => r._id === selection)
                                }

                                return selection
                            })
                        }

                        setSelection(newRowSelectionModel)
                    }
                }}
                // rowSelectionModel={rowSelectionModel}

                //slots
                slots={{
                    toolbar: CustomToolbar,
                }}
                // showToolbar

                //problems in updateing => transitions for of 9 5-1 || show/hide all || when click it change pos and override data
                // Hide columns status and traderName, the other columns will remain visible
                // columnVisibilityModel={hideColumns || []}
                // autoHeight={editing?.autoHeight || true}
                // autosizeOptions={{
                //     includeOutliers: true
                // }}
                getRowHeight={() => 'auto'}

                sx={{
                    bgcolor: 'background.default',
                    // height: '70vh',
                    color: 'neutral.0',
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: theme.shadows[1],
                    "&  .MuiDataGrid-columnHeaders": {
                        bgcolor: 'background.alt', my: '8px', color: 'neutral.0' //28323D
                    },
                    '&  .MuiTablePagination-input': {
                        display: 'inline-flex'
                    }, '& .MuiDataGrid-columnHeader': {
                        bgcolor: 'background.alt',
                    }, '& .MuiDataGrid-scrollbar': {
                        height: '5px'
                    }
                }}

            />

            <ModalStyled open={isOpen} setOpen={setOpenModal} title={'هل انت متاكد من الحذف  ؟'} action={handleDeleteClick(deleteId)} />
        </Box>

    )
}

export default CrudDatagrid
