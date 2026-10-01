import { useState } from "react";
import { Box } from "@mui/material";
import Section from "../../style/mui/styled/Section"
import { useGetCoursesQuery } from "../../toolkit/apis/coursesApi"
import { TextBorderWithIcons } from "../ui/TextBorderAround"
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { OutLinedHoverBtn } from "../../style/buttonsStyles";
import { FlexColumn } from "../../style/mui/styled/Flexbox";
import { Link } from "react-router-dom";
import UnitCourseDetails from "../content/UnitCourseDetails";

const courseIcon =
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M10 16.5c0-3.58 2.92-6.5 6.5-6.5c.89 0 1.73.18 2.5.5V5h-2v3H7V5H5v14h5.5c-.32-.77-.5-1.61-.5-2.5" opacity="0.3" /><path fill="currentColor" d="M10.5 19H5V5h2v3h10V5h2v5.5c.75.31 1.42.76 2 1.32V5c0-1.1-.9-2-2-2h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h6.82a6.6 6.6 0 0 1-1.32-2M12 3c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1" /><path fill="currentColor" d="M20.3 18.9c.4-.7.7-1.5.7-2.4c0-2.5-2-4.5-4.5-4.5S12 14 12 16.5s2 4.5 4.5 4.5c.9 0 1.7-.3 2.4-.7l2.7 2.7l1.4-1.4zm-3.8.1c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5" /></svg>

function LatestCourses({ user = null }) {
    const { data } = useGetCoursesQuery({ isFixed: true, limit: 10, isModernSort: true, grade: user?.grade ?? null })

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const updateEdges = (swiper) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    return (
        <Section>
            <FlexColumn mb={'12px'}>
                <TextBorderWithIcons sx={{ my: '9px' }} colorOne={'primary.main'} color={'neutral.0'} title={'احدث الكورسات'} endIcon={courseIcon} />
                <OutLinedHoverBtn size="small" component={Link} to='/courses' >عرض كل الكورسات</OutLinedHoverBtn>
            </FlexColumn>

            <Box sx={{ position: 'relative' }}>
                {/* left fade */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        width: { xs: '32px', md: '60px' },
                        zIndex: 2,
                        pointerEvents: 'none',
                        background: (theme) =>
                            `linear-gradient(to right, ${theme.palette.background.default}, transparent)`,
                        opacity: isBeginning ? 0 : 1,
                        transition: 'opacity 0.3s ease',
                    }}
                />
                {/* right fade */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        width: { xs: '32px', md: '60px' },
                        zIndex: 2,
                        pointerEvents: 'none',
                        background: (theme) =>
                            `linear-gradient(to left, ${theme.palette.background.default}, transparent)`,
                        opacity: isEnd ? 0 : 1,
                        transition: 'opacity 0.3s ease',
                    }}
                />

                <Swiper
                    style={{ paddingBottom: '32px' }}
                    modules={[Navigation, Pagination, A11y]}
                    navigation
                    pagination={{ clickable: true }}
                    onSwiper={updateEdges}
                    onSlideChange={updateEdges}
                    onResize={updateEdges}
                    breakpoints={{
                        320: { slidesPerView: 1.2, spaceBetween: 15 },
                        640: { slidesPerView: 1.2, spaceBetween: 15 },
                        768: { slidesPerView: 3.25, spaceBetween: 20 },
                    }}
                >
                    {data?.values?.courses.map((course, i) => (
                        <SwiperSlide key={i} style={{ height: 'auto', display: 'flex' }}>
                            <UnitCourseDetails course={course} sx={{ width: '100%' }} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Section>
    )
}

export default LatestCourses