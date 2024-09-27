import { Box, Pagination, PaginationItem } from '@mui/material'
import React, { useState } from 'react'

export default function MakePagination({ count, setIndex, index }) {

    return (
        <Box sx={{ display: "flex", justifyContent: "center", m: "10px" }}>
            <Pagination
                variant='outlined'
                count={count}
                shape="rounded"
                color='success'
                siblingCount={count}
                page={(index + 1) || 1}
                renderItem={(item) => {
                    // console.log(item)
                    return (
                        <PaginationItem
                            sx={{
                                mb: "6px",
                                // bgcolor: "rgba(102, 187, 106, 0.24)"
                            }}
                            {...item}
                        />
                    )
                }}
                onChange={(e, v) => setIndex(v - 1)}
            />
        </Box>
    )
}
