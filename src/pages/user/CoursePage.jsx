import { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Alert, Box, } from '@mui/material'

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

function CoursePage() {
    const params = useParams() // {lectureId, courseId = index, gradeId}

    const [getData, status] = useLazyGetCourseLecturesAndCheckUserQuery()
    const [getCourseAndLectures] = useLazyGetData(getData)

    const [courseDetails, setCourseDetails] = useState({})// Not Sub or Not Reg => {lectures=[], counts} || subscribed => {}
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const trigger = async () => {
            const { lectures, course, currentIndex } = await getCourseAndLectures({ index: params.courseId })
            let counts = {
                videos: lectures.filter(lecture => lecture.sectionType === sectionConstants.VIDEO)?.length,
                files: lectures.filter(lecture => lecture.sectionType === sectionConstants.FILE)?.length,
                exams: lectures.filter(lecture => lecture.sectionType === sectionConstants.EXAM)?.length
            }
            setCurrentIndex(currentIndex)
            setCourseDetails({ course, lectures, counts })
        }

        if (!courseDetails?.course) {
            trigger()
        }
    }, [params.courseId])

    //unlock lecture when user pass it
    useEffect(() => {
        const unLockLecture = () => {
            setCourseDetails(prev => {
                const lectures = prev.lectures.map(lecture => {
                    let cloneLecture = { ...lecture }
                    if (cloneLecture.index === currentIndex) {
                        cloneLecture.locked = false
                    }
                    return cloneLecture
                })

                return { ...prev, lectures }
            })
        }
        if (courseDetails?.lectures) {
            unLockLecture()
        }
    }, [currentIndex])

    if (!courseDetails?.course) {
        return <LoaderSkeleton />
    }


    //get /lectures/lectureId (index)
    const getLectureCurrentIndex = () => {
        let index = false
        if (params.lectureId) {
            let currentLecture = courseDetails.lectures?.find(item => item._id === params.lectureId)
            index = currentLecture?.index
        }
        return index
    }

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
            >
                {(courseDetails?.course) ?
                    <CourseSubscribeCard course={courseDetails?.course} isSubscribed={courseDetails?.course?.isSubscribed} setCourseDetails={setCourseDetails} /> // setSubscribed={setSubscribed}
                    : <Loader />}
            </HeaderContent>

            {/* Lecture Is Here */}
            <Outlet context={[getLectureCurrentIndex(), setCurrentIndex, currentIndex, courseDetails.course._id]} />

            <TitleSection title={'محتوى الكورس'} />

            <Box>
                {courseDetails.lectures.length === 0 && status.isSuccess && (
                    <Alert variant='filled' severity='warning'>المحاضرات هتنزل قريب , خليك متابع !</Alert>
                )}
                <Grid>
                    {courseDetails.lectures.map((lecture, i) => {
                        return <LectureUserCard
                            key={i} lecture={lecture} currentIndex={currentIndex} lectureIndex={getLectureCurrentIndex()} i={i} isSubscribed={courseDetails?.course?.isSubscribed} />
                    })}
                </Grid>
            </Box>

        </Section>
    )
}

// header
// subscribe card
// content
export default CoursePage
