import {
    List,
    ListItemButton,
    ListItemText,
    Typography,

} from "@mui/material";

import usePaginate from "../../hooks/usePaginate";
import { useLazyGetUserCoursesQuery } from "../../toolkit/apis/coursesApi";
import PaginationStyled from "../../style/mui/styled/PaginationStyled";
import Loader from "../../style/mui/loaders/Loader";
import CollapseStyled from "../../style/mui/styled/CollapseStyled";

function CommunityCoursesList({ course, selectCourse }) {

    const [getData, status] = useLazyGetUserCoursesQuery();

    const {
        data: courses = [],
        count, limit, page, loadPage } = usePaginate({
            getData,
            key: "courses",
            limit: 15,
            params: { select: 'name _id', isAdmin: 'true', isCommunity: true }
        });

    return (
        <CollapseStyled label={'الكورسات'} storageId="communityCoursesOpen">
            {status.isLoading && (
                <Loader label="جاري تحميل الكورسات" />
            )}

            <List
                disablePadding
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                    overflowX: {
                        xs: "auto",
                        md: "visible"
                    }
                }}
            >
                {[
                    { name: "كل الكورسات", _id: "all" },
                    ...courses
                ].map((c) => (
                    <ListItemButton
                        key={c._id}
                        selected={course === c._id}
                        onClick={() => selectCourse(c._id)}
                        sx={{
                            borderRadius: 2,
                            whiteSpace: "nowrap",
                            flex: "none",

                            "&.Mui-selected": {
                                color: "primary.main",
                                fontWeight: 700,
                            },
                        }}
                    >
                        <ListItemText
                            component={'span'}
                            primary={
                                c._id === "all"
                                    ? "عام"
                                    : c.name
                            }
                            primaryTypographyProps={{
                                fontWeight: "inherit"
                            }}
                        />

                        <Typography
                            component={'span'}
                            variant="caption"
                            color="text.secondary"
                            sx={{ marginInlineStart: 2 }}
                        >
                            +
                        </Typography>
                    </ListItemButton>
                ))}
            </List>

            <PaginationStyled
                count={count}
                limit={limit}
                loadPage={loadPage}
                page={page}
            />
        </CollapseStyled>
    );
}

export default CommunityCoursesList;