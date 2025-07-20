import { Box, Pagination, PaginationItem, useTheme } from '@mui/material'
import { memo } from 'react'
import { BiCurrentLocation } from "react-icons/bi";

function QuizPagination({ index, setIndex, isLoading, questions, isShowError = false }) {

    const theme = useTheme()
    if (questions.length <= 0) return "loading ..."

    return (
        <Box sx={{ display: "flex", justifyContent: "center", m: "10px" }}>
            <Pagination
                variant='outlined'
                disabled={isLoading || false}
                count={questions.length}
                page={index + 1 || 1}
                shape="rounded" siblingCount={questions.length}
                renderItem={(item) => {

                    const isRight = item.type === "page" && questions[item.page - 1].chosenOptionId

                    const isError = item.type === "page" &&
                        questions[item.page - 1].chosenOptionId !==
                        questions[item.page - 1].rtOptionId &&
                        questions[item.page - 1].rtOptionId // && isShowError


                    // not answered - ritht - wrong - lsa
                    return (
                        <PaginationItem
                            sx={{
                                mb: "6px",
                                '&.Mui-selected': {
                                    background: isError ? theme.palette.error.dark : theme.palette.success.dark,
                                    color: theme.palette.grey[0],
                                    '&:hover': {
                                        bgcolor: isError ? theme.palette.error.dark : isRight ? theme.palette.success.dark : 'transparent',
                                    }
                                },
                                bgcolor: isError ? theme.palette.error.light : isRight ? theme.palette.success.light : 'transparent',
                                '&:hover': {
                                    bgcolor: isError ? theme.palette.error.dark : isRight ? theme.palette.success.dark : 'transparent',
                                }
                            }}
                            {...item}
                            page={item.selected ? <BiCurrentLocation size={'1.5rem'} /> : item.page}
                        />
                    )
                }}
                onChange={(e, v) => setIndex(v - 1)}
            />
        </Box>
    )
}

export default memo(QuizPagination)
