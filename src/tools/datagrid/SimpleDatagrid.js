import { Box, Grid, useTheme } from '@mui/material'
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid'
import React, { useState } from 'react'
import ExportAsPdf from './ExportAsPdf';

export default function SimpleDatagrid({ rows, columns, loading = false, editing = [], exportObj = {}, exportTitle }) {

    const theme = useTheme()
    // slots
    const [chosenColumns, setColumns] = useState(columns)

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
                            <GridToolbarExport />
                        </Grid>
                    }
                    {editing?.isPdf && (
                        <Grid item>
                            <ExportAsPdf columns={chosenColumns} rows={rows} exportObj={exportObj} exportTitle={exportTitle} />
                            {/* <MakePdf /> */}
                        </Grid>
                    )}
                </Grid>
            </GridToolbarContainer>
        );
    }

    return (
        <DataGrid
            rows={rows || []}
            columns={columns}

            loading={loading}
            getRowId={(param) => param?._id}

            pageSizeOptions={[5, 10, 50, 100]}

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

            //slots
            slots={{
                toolbar: CustomToolbar,
            }}


            autoHeight={editing?.autoHeight || true}
            sx={{
                bgcolor: 'background.default',
                maxHeight: editing.maxHeight,
                color: 'neutral.0',
                borderRadius: '16px',
                border: 'none',
                boxShadow: theme.shadows[1],
                "&  .muirtl-1iyq7zh-MuiDataGrid-columnHeaders": {
                    bgcolor: 'background.alt', my: '8px', color: 'neutral.0' //28323D
                },
                '&  .MuiTablePagination-input': {
                    display: 'inline-flex'
                }
            }}
        />
    )
}
