import React, { useEffect, useState } from 'react'
import TitleWithDividers from '../ui/TitleWithDividers'
import { FlexBetween, FlexColumn } from '../../style/mui/styled/Flexbox'
import { OutLinedHoverBtn } from '../../style/buttonsStyles'
import TabInfo from '../ui/TabInfo'
import Separator from '../ui/Separator'
import CourseUpdate from './CourseUpdate'

import { useLazyGetOneCourseQuery } from '../../toolkit/apis/coursesApi'
import useLazyGetData from "../../hooks/useLazyGetData"
import Text from '../../tools/text/Text'
import LoaderWithText from '../../style/mui/loaders/LoaderWithText'
import { Alert, Box } from '@mui/material'
import { lang } from '../../settings/constants/arlang'

import { FcStatistics } from "react-icons/fc";
import { getFullDate } from '../../settings/constants/dateConstants'
import Image from '../ui/Image'
import AdminLinkCourse from './AdminLinkCourse'
import { useGetSubscriptionsCountQuery } from '../../toolkit/apis/statisticsApi'
import { Link } from 'react-router-dom'


function AdminCourseDetails({ courseId }) {


    const [course, setCourse] = useState(null)
    const [getData, status] = useLazyGetOneCourseQuery()
    const [getOneCourse] = useLazyGetData(getData)

    const { data: subscribersCount } = useGetSubscriptionsCountQuery({ course: courseId })

    useEffect(() => {

        const trigger = async () => {
            const res = await getOneCourse({ _id: courseId }, false)
            setCourse(res)
        }
        trigger()

    }, [courseId])

    if (status.isLoading) return <LoaderWithText />

    if (status.isSuccess && !course) return <Alert variant="filled" severity="warning" sx={{ justifyContent: 'center' }}>
        {lang.NO_COURSES_IN_THIS_UNIT}
    </Alert>
    if (course)
        return (
            <>
                <TitleWithDividers title={lang.COURSE_DETAILS + " : " + course.name} />
                <FlexColumn>

                    <FlexBetween width={"100%"}>
                        <OutLinedHoverBtn component={Link} to={'/statistics/courses/' + courseId} sx={{ my: '12px' }} colorm='orange' endIcon={<FcStatistics />}>{lang.STATISTICS}</OutLinedHoverBtn>
                        <TabInfo count={subscribersCount?.values?.count || 0} title={lang.SUBSCRIBERS_NUMS} i={2} />
                        <TabInfo count={course?.isActive ? lang.ACTIVE : lang.NOT_ACTIVE} title={lang.IS_ACTIVE} i={1} />
                        <TabInfo count={course.price + " " + lang.POUND} title={lang.PRICE} i={0} />
                        <TabInfo count={getFullDate(course.createdAt)} title={'تاريخ الانشاء'} i={1} />
                    </FlexBetween>

                    <Separator />
                    <FlexColumn>
                        <Box sx={{ maxWidth: '300px', maxHeight: '500px' }}>
                            <Image img={course.thumbnail?.url} />
                        </Box>
                        <CourseUpdate course={course} setCourse={setCourse} />
                    </FlexColumn>

                </FlexColumn>
                <AdminLinkCourse grade={course.grade} course={course} setCourse={setCourse} />
            </>
        )
}

export default AdminCourseDetails
