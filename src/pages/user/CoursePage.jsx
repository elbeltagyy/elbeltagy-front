import { useEffect, useMemo, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Alert, Box, Paper, useMediaQuery, } from '@mui/material'

import HeaderContent from '../../components/ui/HeaderContent'
import { ExamIcon, FilesIcon, VidsIcon2 } from '../../components/ui/svg/ContentSvgs'
import TitleSection from '../../components/ui/TitleSection'
import LectureUserCard from '../../components/content/LectureUserCard'
import CourseSubscribeCard from '../../components/content/CourseSubscribeCard'

import Section from '../../style/mui/styled/Section'
import Grid from '../../style/vanilla/Grid'
import Loader from '../../style/mui/loaders/Loader'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'

import { lang } from '../../settings/constants/arlang'
import sectionConstants from '../../settings/constants/sectionConstants'

import { useLazyGetCourseLecturesAndCheckUserQuery } from '../../toolkit/apis/coursesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import SEOHelmetAsync from '../../tools/SEOHelmetAsync'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import AccordionStyled from '../../style/mui/styled/AccordionStyled'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import { OutLinedHoverBtn } from '../../style/buttonsStyles'

function CoursePage() {
    const params = useParams() // {lectureId, courseId = index, gradeId}
    const isLargeScreen = useMediaQuery('(min-width:900px)')

    const [getData, status] = useLazyGetCourseLecturesAndCheckUserQuery()
    const [getCourseAndLectures] = useLazyGetData(getData)

    const [courseDetails, setCourseDetails] = useState({})// Not Sub or Not Reg => {lectures=[], counts} || subscribed => {}
    const [currentUserIndex, setCurrentUserIndex] = useState(0)

    useEffect(() => {
        const trigger = async () => {
            const { lectures, course, currentIndex } = await getCourseAndLectures({ index: params.courseId })
            let counts = {
                videos: lectures.filter(lecture => lecture.sectionType === sectionConstants.VIDEO)?.length,
                files: lectures.filter(lecture => lecture.sectionType === sectionConstants.FILE)?.length,
                exams: lectures.filter(lecture => lecture.sectionType === sectionConstants.EXAM)?.length
            }
            setCurrentUserIndex(currentIndex)
            setCourseDetails({ course, chapters: lectures, counts })
        }

        if (!courseDetails?.course) {
            trigger()
        }
    }, [params.courseId])

    //unlock lecture when user pass it
    useEffect(() => {
        const unLockLecture = () => {
            setCourseDetails(prev => {
                return {
                    ...prev,
                    chapters: prev.chapters.map(chapter => {
                        const modifiedLecs = chapter.lectures.map(lecture => {
                            if (lecture.index === currentUserIndex) {
                                return { ...lecture, locked: false }
                            }
                            return lecture
                        })
                        return { ...chapter, lectures: modifiedLecs }
                    })
                }
            })
        }
        if (courseDetails?.chapters) {
            unLockLecture()
        }
    }, [currentUserIndex])

    //get /lectures/lectureId (index)
    const lectureIndexInCourse = useMemo(() => {
        let index = false
        if (params.lectureId) {
            let currentLecture = courseDetails.chapters?.flatMap(ch => ch.lectures).find(item => item._id === params.lectureId)
            index = currentLecture?.index
        }
        return index
    }, [courseDetails.chapters, params.lectureId])

    if (!courseDetails?.course) {
        return <LoaderSkeleton />
    }

    const hereIcon = <svg xmlns="http://www.w3.org/2000/svg" width={'1.5rem'} height={'1.5rem'} viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
            <path fill="currentColor" fillOpacity={0} strokeDasharray={20} strokeDashoffset={20} d="M12 15h2v-6h2.5l-4.5 -4.5M12 15h-2v-6h-2.5l4.5 -4.5">
                <animate attributeName="d" begin="0.5s" dur="1.5s" repeatCount="indefinite" values="M12 15h2v-6h2.5l-4.5 -4.5M12 15h-2v-6h-2.5l4.5 -4.5;M12 15h2v-3h2.5l-4.5 -4.5M12 15h-2v-3h-2.5l4.5 -4.5;M12 15h2v-6h2.5l-4.5 -4.5M12 15h-2v-6h-2.5l4.5 -4.5"></animate>
                <animate fill="freeze" attributeName="fill-opacity" begin="0.7s" dur="0.5s" values="0;1"></animate>
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="20;0"></animate>
            </path>
            <path strokeDasharray={14} strokeDashoffset={14} d="M6 19h12">
                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="14;0"></animate>
            </path>
        </g>
    </svg>

    const courseChapters = <Paper elevation={1} sx={{ width: '100%', p: '16px', mt: '16px' }}>
        <TitleWithDividers title={'محتوى الكورس'} />
        {courseDetails?.chapters && courseDetails?.chapters.map(chapter => {
            const total = chapter.lectures?.length;

            const start = chapter.lectures[0]?.index;
            const end = chapter.lectures[total - 1]?.index;

            const inThisChapter = currentUserIndex >= start && currentUserIndex <= end;
            const currentInChapter = currentUserIndex > end ? total : currentUserIndex < start ? 0 : (currentUserIndex - start + 1);

            return <AccordionStyled
                beforeTitle={currentUserIndex ? (currentInChapter || 0) + '/' + total : ''}
                expanded={inThisChapter}
                expandIcon={inThisChapter && <OutLinedHoverBtn endIcon={hereIcon} sx={{ bgcolor: 'grey.0' }} >الحالي</OutLinedHoverBtn>}
                preventRotation={inThisChapter}

                key={chapter._id}
                color='primary.main'
                desc={chapter.description} title={chapter.name}>
                <FlexColumn gap={'16px'}>
                    {chapter?.lectures.length === 0 && (
                        <Alert variant='filled' severity='warning'>المحاضرات هتنزل قريبا !</Alert>
                    )}
                    {chapter.lectures?.length ? chapter.lectures.map((lecture, i) => {
                        return <LectureUserCard
                            key={lecture._id}
                            currentUserIndex={currentUserIndex}
                            lecture={lecture}
                            currentLectureIndex={lectureIndexInCourse} i={i} isSubscribed={courseDetails?.course?.isSubscribed}
                        />
                    }) : ''}
                </FlexColumn>
            </AccordionStyled>
        })}
    </Paper >

    return (
        <Section>
            <SEOHelmetAsync
                title={'صفحه الكورسات - ' + courseDetails?.course?.name}
                desc="افضل كورسات مستر البلتاجى, الدرجات النهائيه مضمونه"
                url={window.location.href}
            />

            <HeaderContent title={courseDetails?.course?.name} body={<div dangerouslySetInnerHTML={{ __html: courseDetails?.course?.description }} />}
                infos={[
                    {
                        caption: lang.LECTURES, desc: '+ ' + courseDetails?.counts?.videos, icon: <VidsIcon2 size='1.5rem' />
                    }, {
                        caption: lang.FILES, desc: '+ ' + courseDetails?.counts?.files, icon: <FilesIcon size='1.5rem' />
                    }, {
                        caption: lang.EXAMS, desc: '+ ' + courseDetails?.counts?.exams, icon: <ExamIcon size='1.5rem' />
                    }
                ]}
                sideChildren={<FlexColumn>
                    <Outlet context={[lectureIndexInCourse, setCurrentUserIndex, currentUserIndex, courseDetails.course._id]} />
                    {(!isLargeScreen || !params.lectureId) && (
                        courseChapters
                    )}
                </FlexColumn>}
            >
                {(courseDetails?.course) ?
                    <FlexColumn>
                        <CourseSubscribeCard course={courseDetails?.course} isSubscribed={courseDetails?.course?.isSubscribed} setCourseDetails={setCourseDetails} />
                        <FlexColumn width={'100%'} gap={'12px'}>
                            {isLargeScreen && params.lectureId && (
                                courseChapters
                            )}
                        </FlexColumn>
                    </FlexColumn>
                    : <Loader />}
            </HeaderContent>

            {/* Lecture Is Here */}
            {/* <Outlet context={[getLectureCurrentIndex(), setCurrentIndex, currentIndex, courseDetails.course._id]} /> */}

            {/* <TitleSection title={'محتوى الكورس'} /> */}

            {/* <Box>
                {courseDetails.lectures.length === 0 && status.isSuccess && (
                    <Alert variant='filled' severity='warning'>المحاضرات هتنزل قريب , خليك متابع !</Alert>
                )}
                <Grid>
                    {courseDetails.lectures.map((lecture, i) => {
                        return <LectureUserCard
                            key={i} lecture={lecture} currentIndex={currentIndex} lectureIndex={getLectureCurrentIndex()} i={i} isSubscribed={courseDetails?.course?.isSubscribed} />
                    })}
                </Grid>
            </Box> */}

        </Section>
    )
}

// header
// subscribe card
// content
export default CoursePage
