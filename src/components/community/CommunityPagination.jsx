import PaginationStyled from "../../style/mui/styled/PaginationStyled"

function CommunityPagination({ limit, page, loadPage, count }) {
    return (
        <PaginationStyled count={count} limit={limit} loadPage={loadPage} page={page} />
    )
}

export default CommunityPagination