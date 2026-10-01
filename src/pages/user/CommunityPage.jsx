import { useState } from "react";
import {
    Typography, Box,
    Stack,
    IconButton,
} from "@mui/material";

import Section from "../../style/mui/styled/Section";

import usePaginate from "../../hooks/usePaginate";
import { useLazyGetCommunityQuestionsQuery } from "../../toolkit/apis/communtyQuestionsApi";
import AskQuestion from "../../components/community/AskQuestion";
import QuestionCard from "../../components/community/QuestionCard";
import { FlexBetween, FlexColumn, FlexRow } from "../../style/mui/styled/Flexbox";
import CommunityPagination from "../../components/community/CommunityPagination";
import MakeSelect from "../../style/mui/styled/MakeSelect";
import TextFieldDebounce from "../../style/mui/styled/TextFieldDebounce";
import SwitchStyled from "../../style/mui/styled/SwitchStyled";
import { communityStatus } from "../../settings/constants/communityConstants";
import CommunityCoursesList from "../../components/community/CommunityCoursesList";
import MyQuestions from "../../components/community/MyQuestions";
import { useSelector } from "react-redux";
import TabInfo from "../../components/ui/TabInfo";
import { HiOutlineRefresh } from "react-icons/hi";
import LoaderSkeleton from "../../style/mui/loaders/LoaderSkeleton";
import { useSearchParams } from "react-router-dom";

//1- comments for admin
//3- courses filter + append to courses - lectures [done]
//4- fast action on admin dashboard
// Append community to courses & lectures [done]
//limit => 15


//Rapid revision => new courses + multi users
//Approved => transfer
const questionsAuthor = [
    { label: 'اسئله الطلاب', value: false },
    { label: 'اسئلتي', value: true },
]

// walid + herrelemy link
export default function CommunityPage({ isAdmin = false, preCourse, preLecture, forceMobile = false, isShowCourses = true, filters = {} }) {
    const [course, setCourse] = useState(preCourse || 'all');
    const limit = 15

    const [searchParams] = useSearchParams()
    const questionId = searchParams.get('questionId')

    const [status, setStatus] = useState(isAdmin ? 'pending' : 'all')
    const [content, setContent] = useState('')
    const [isActive, setIsActive] = useState(true)
    const [searchByMe, setSearchByMe] = useState(false)
    const user = useSelector(s => s.global.user)

    const [getData, { isLoading }] = useLazyGetCommunityQuestionsQuery()
    const { data: questions, setData: setQuestions, page, count, loadPage, refetch } = usePaginate({
        limit,
        getData, key: 'communityQuestions', params: {
            select: '+likes',
            populate: 'user.name user.role firstAuthorReplay courses.name', //Controller by backend now
            status, content: 'contains_split_' + content, isActive, courses: course, _id: questionId,
            ...(searchByMe && { user: user._id }), ...filters
        },
    })

    const addQuestion = (q) => {
        setQuestions(p => ([q, ...p]))
    }
    const deleteQuestion = (q) => {
        setQuestions(p => p.filter(prev => prev._id !== q._id))
    }
    const r = (xs, md = xs, lg = md) => (forceMobile ? xs : { xs, md, lg });

    return (
        <Section>
            <Box
                component="main"
                sx={{
                    display: "grid",
                    gap: r(1.5, 2, 3),
                    mx: "auto",
                    alignItems: "start",

                    gridTemplateColumns: r("1fr", "220px minmax(0, 1fr)", "240px minmax(0, 1fr)"),
                }}
            >
                {/*  right side */}
                {(!preCourse && isShowCourses) && (
                    <Box
                        sx={{
                            gridColumn: '1',
                            gridRow: '1',
                            position: forceMobile ? "static" : { md: "sticky" },
                            top: 80,
                        }}
                    >
                        <CommunityCoursesList course={course} selectCourse={setCourse} />
                    </Box>
                )}

                {/* main + left side */}
                <Box
                    sx={{
                        minWidth: 0,
                        gridColumn: r("1", "2", "2"),
                        gridRow: r("2", "1", "1"),
                        display: "grid",
                        gap: r(1.5, 2, 3),
                        gridTemplateColumns: r("1fr", "1fr", "minmax(0, 1fr) 240px"),
                        alignItems: "start",
                    }}
                >
                    {/* Main */}
                    <Stack
                        spacing={2}
                        minWidth={0}
                        sx={{
                            gridColumn: "1",
                            gridRow: r("2", "2", "1"),
                            //  {
                            //     xs: "3", md: "2", lg: "1",
                            // },
                        }}
                    >
                        {isAdmin ? (
                            // <TabsAutoStyled originalTabs={tabs} />
                            <></>
                        ) : (
                            <AskQuestion addQuestion={addQuestion} preCourse={preCourse} preLecture={preLecture} />
                        )}
                        {isLoading && <LoaderSkeleton />}

                        <FlexColumn sx={{ alignItems: 'flex-start', gap: '16px' }}>
                            <FlexRow sx={{ width: '100%' }}>
                                <TextFieldDebounce
                                    value={content} setValue={(v) => setContent(v)}
                                    placeholder="ابحث في الأسئلة"
                                    variant="filled" rows={2} multiline fullWidth sx={{ maxWidth: 420 }} />

                            </FlexRow>

                            <FlexBetween sx={{ width: '100%', gap: '6px' }}>

                                <MakeSelect title={'اسئلتي؟'}
                                    setValue={setSearchByMe}
                                    value={searchByMe}
                                    options={questionsAuthor}
                                />

                                <MakeSelect title={'نوع السؤال'}
                                    setValue={setStatus}
                                    value={status}
                                    options={isAdmin ? communityStatus : communityStatus.filter(c => !c.isAdmin)}
                                />
                                {isAdmin && (
                                    <SwitchStyled
                                        checked={isActive} onChange={setIsActive}
                                        label="فعال؟"
                                    />
                                )}
                                <FlexRow>

                                    <CommunityPagination limit={limit} loadPage={loadPage} page={page} count={count} />
                                    {isAdmin && <TabInfo count={count} i={0} title={'عدد الاسئله'} />}
                                    {<IconButton onClick={refetch} ></IconButton>}
                                    <IconButton disabled={isLoading} onClick={refetch} sx={{ color: 'primary.main' }}>
                                        <HiOutlineRefresh style={{ animation: isLoading && 'rotate .5s linear 0s infinite', color: 'inherit' }} />
                                    </IconButton>
                                </FlexRow>
                            </FlexBetween>
                        </FlexColumn>

                        {(questions.length === 0) && (
                            <Typography color="text.secondary">لا توجد أسئلة في هذا الكورس بعد. اطرح أول سؤال من الأعلى.</Typography>
                        )}
                        {questions.map((q) => (
                            <QuestionCard isAdmin={isAdmin}
                                setQuestions={setQuestions}
                                key={q._id} q={q}
                                deleteQuestion={deleteQuestion}
                            />
                        ))}
                        <CommunityPagination limit={limit} loadPage={loadPage} page={page} count={count} />

                    </Stack>

                    {/* left */}
                    <Box
                        sx={{
                            gridColumn: r("1", "1", "2"),
                            gridRow: "1",
                            position: forceMobile ? "static" : { lg: "sticky" },
                            top: 80,
                        }}
                    >
                        <MyQuestions questions={questions} isAdmin={isAdmin} preCourse={preCourse} filters={filters} />
                    </Box>
                </Box>

            </Box>
        </Section>
    );
}