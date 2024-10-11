import { Box, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'

export default function SimpleDatagrid({ rows, columns, loading = false, editing }) {

    const theme = useTheme()
    return (
        <DataGrid
            rows={rows || []}
            columns={columns}

            loading={loading}
            getRowId={(param) => param?._id}

            pageSizeOptions={[5, 10, 50, 100]}

            autoHeight={editing?.autoHeight || false}
            sx={{
                bgcolor: 'background.default',
                height: '70vh',
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
