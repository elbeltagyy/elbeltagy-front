import { Pagination, Typography } from '@mui/material'
import { FlexRow } from './Flexbox'

function PaginationStyled({ page, limit, count, loadPage, title = 'الصفحات' }) {
    const pageCounts = Math.ceil(count / limit)

    return (
        <FlexRow gap={'6px'}>
            <Typography variant="body2">{title}</Typography>
            <Pagination
                sx={{ maxWidth: '250px', mt: '6px' }}
                color="primary"
                count={pageCounts}
                page={page}
                siblingCount={2}
                boundaryCount={1}

                onChange={(_, value) => loadPage(value)}
            />
        </FlexRow>
    )
}

export default PaginationStyled