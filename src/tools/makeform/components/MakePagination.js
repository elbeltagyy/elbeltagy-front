import { Box, Pagination, PaginationItem, useTheme } from '@mui/material'
import { memo } from 'react'

function MakePagination({ count, setIndex, index, errorsList = [] }) {
    const theme = useTheme()
    // console.log(errorsList)

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
                    const hasError = errorsList[item.page - 1] && item.type === "page"
                    return (
                        <PaginationItem
                            sx={{
                                mb: "6px",
                                '&.Mui-selected': {
                                    background: hasError && theme.palette.error.dark,
                                    color: hasError && theme.palette.grey[0],
                                    '&:hover': {
                                        bgcolor: hasError && theme.palette.error.dark,
                                    }
                                },

                                bgcolor: hasError && theme.palette.error.light,
                                '&:hover': {
                                    bgcolor: hasError && theme.palette.error.dark,
                                }
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
export default memo(MakePagination)