import { Grid } from '@mui/material'
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid'
import React, { useEffect, useMemo, useState } from 'react'

export default function ServerSideDatagrid({ editing, rows, columns, fetchFc, loading }) {

    const [filter, setFilter] = useState()
    const [sort, setSort] = useState()
    // for pagination settings
    const [pageState, setPageState] = useState({
        isLoading: false,
        rowCount: 0
    })

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    // filtering
    const onFilterChange = React.useCallback((filterModel) => {

        const filtered = {}
        filterModel?.items.map((item) => {
            filtered[item.field] = item.value || ""
            return filtered
        })
        setFilter(filtered)
    }, []);


    // for sorting
    const handleSortModelChange = React.useCallback((sortModel) => {
        if (sortModel.length > 0) {
            setSort({
                sortkey: sortModel[0].field,
                sortvalue: sortModel[0].sort
            })
        }
    }, []);

    // running main fc in  changing
    useEffect(() => {

        fetchFc(setPageState, paginationModel, sort, filter)
        // fetchFc(setPageState, paginationModel, sort, filter)

    }, [paginationModel.page, paginationModel.pageSize, sort, filter])


    //tool bar
    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <Grid container spacing={2}>
                    {
                        editing.showSlots.includes("columns") &&
                        <Grid item>
                            <GridToolbarColumnsButton  />
                        </Grid>
                    }
                    {
                        editing.showSlots.includes("filter") &&
                        <Grid item>
                            <GridToolbarFilterButton  />
                        </Grid>
                    }
                    {
                        editing.showSlots.includes("density") &&
                        <Grid item>
                            <GridToolbarDensitySelector  />
                        </Grid>
                    }
                    {
                        editing.showSlots.includes("export") &&
                        <Grid item>
                            <GridToolbarExport  />
                        </Grid>
                    }
                </Grid>
            </GridToolbarContainer>
        );
    }

    // hide columns 
    const hideColumns = useMemo(() => {
        const inVisibleModels = {}
        editing.hideColumns.map(ele => inVisibleModels[ele] = false)
        return inVisibleModels

    }, [editing.hideColumns])

    return (
        <DataGrid
            rows={rows || []}
            columns={columns}
            loading={pageState.isLoading || loading || false}
            rowCount={pageState.rowCount} // ===> total for server (.length)
            getRowId={(param) => param._id}

            pageSizeOptions={[5, 10, 50, 100]}

            // for pagination
            paginationModel={paginationModel}
            paginationMode="server"
            editMode="row"
            onPaginationModelChange={setPaginationModel} // controls ==> currntPage, pageSize

            // for search
            onFilterModelChange={onFilterChange}

            //for sorting
            sortingMode="server"
            onSortModelChange={handleSortModelChange}

            slots={{
                toolbar: CustomToolbar
            }}

            // Hide columns status and traderName, the other columns will remain visible
            columnVisibilityModel={hideColumns}
            sx={{
                bgcolor: editing.bgColor
            }}
        />

    )
}
