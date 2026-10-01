import { Box, Button, Grid, Typography } from '@mui/material';

import { AccessTime, ArrowForward, BarChart } from '@mui/icons-material';
import { getFullDate } from '../../settings/constants/dateConstants';
import useGrades from '../../hooks/useGrades';
import TabInfo from '../ui/TabInfo';
import { MdArrowBack, MdBackspace } from 'react-icons/md';

function ShowCourses({ C, onSelect, courses }) {
    // const { data } = useGetCoursesQuery()
    // const courses = data?.values?.courses || []
    const { grades } = useGrades()
    return (
        <Box className="fade-in">
            <Box sx={{ maxWidth: 560, mb: '12px' }}>
                <Typography
                    sx={{
                        fontSize: { xs: "1.9rem", sm: "2.3rem" },
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                    }}
                >
                    اختر الكورس المناسب لك
                </Typography>
                <Typography sx={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                    ثم  قم بالتسجيل على المنصه والدفع لتفعيل الكورس ..!
                </Typography>
            </Box>

            <Grid container spacing={2.5}>
                {courses.map((course) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={course._id}>
                            <Box
                                onClick={() => onSelect(course)}
                                tabIndex={0}
                                role="button"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") onSelect(course);
                                }}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    height: "100%",
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    cursor: "pointer",
                                    backgroundColor: C.card,
                                    border: `1px solid ${C.line}`,
                                    transition: "all 0.3s",
                                    "&:hover": { transform: "translateY(-3px)", borderColor: C.forge },
                                }}
                            >
                                <Box sx={{ position: "relative", minHeight: 160 }}>
                                    <Box
                                        component="img"
                                        src={course.thumbnail?.url}
                                        alt={course.name}
                                        sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                    />
                                    <Typography
                                        sx={{
                                            position: "absolute",
                                            top: 12,
                                            right: 12,
                                            fontSize: "0.75rem",
                                            px: 1,
                                            py: 0.5,
                                            borderRadius: "6px",
                                            backdropFilter: "blur(4px)",
                                            backgroundColor: "rgba(18,20,28,0.7)",
                                            color: C.forge,
                                        }}
                                    >
                                        {course.price} جنيه
                                    </Typography>
                                    {/* <Box
                                        sx={{
                                            position: "absolute",
                                            bottom: 12,
                                            left: 12,
                                            width: 36,
                                            height: 36,
                                            borderRadius: "8px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: C.forge,
                                        }}
                                    >
                                        <Icon sx={{ fontSize: 18, color: C.ink }} />
                                    </Box> */}
                                </Box>

                                <Box sx={{ p: 2.5, display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: "1rem",
                                                color: C.paper,
                                            }}
                                        >
                                            {course.name}
                                        </Typography>
                                        <Typography sx={{ fontSize: "0.85rem", lineHeight: 1.6, color: C.muted }}>
                                            <span dangerouslySetInnerHTML={{ __html: course.description }} />
                                        </Typography>
                                        <TabInfo count={grades.find(g => g.index === course.grade)?.name} i={1} />
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            fontSize: "0.75rem",
                                            color: C.mutedSoft,
                                        }}
                                    >
                                        {course.estimatedVideos && (
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                                <BarChart sx={{ fontSize: 13 }} /> {course.estimatedVideos}
                                            </Box>
                                        )}
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                            <AccessTime sx={{ fontSize: 13 }} /> {getFullDate(course.createdAt)}
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            mt: 2,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            fontSize: "0.85rem",
                                            fontWeight: 600,
                                            pt: 2,
                                            borderTop: `1px solid ${C.line}`,
                                            color: C.forge,
                                        }}
                                    >
                                        اختر الكورس
                                        <ArrowForward sx={{ fontSize: 16 }} />
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    )
}

export default ShowCourses