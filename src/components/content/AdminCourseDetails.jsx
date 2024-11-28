import { useEffect, useState } from 'react'
import TitleWithDividers from '../ui/TitleWithDividers'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import { OutLinedHoverBtn } from '../../style/buttonsStyles'
import TabInfo from '../ui/TabInfo'
import Separator from '../ui/Separator'
import CourseUpdate from './CourseUpdate'

import { useDeleteCourseMutation, useLazyGetOneCourseQuery } from '../../toolkit/apis/coursesApi'
import useLazyGetData from "../../hooks/useLazyGetData"
import LoaderWithText from '../../style/mui/loaders/LoaderWithText'
import { Alert, Button } from '@mui/material'
import { lang } from '../../settings/constants/arlang'

import { FcStatistics } from "react-icons/fc";
import { getFullDate } from '../../settings/constants/dateConstants'
import Image from '../ui/Image'
import AdminLinkCourse from './AdminLinkCourse'
import { useGetSubscriptionsCountQuery } from '../../toolkit/apis/statisticsApi'
import { Link } from 'react-router-dom'
import { MdRemoveCircleOutline } from 'react-icons/md'
import usePostData from '../../hooks/usePostData'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import Loader from '../../style/mui/loaders/Loader'
import WrapperHandler from '../../tools/WrapperHandler'
// import {   MingcuteCouponFill } from '../icons/Icons'


function AdminCourseDetails({ courseId, setActiveCourse, setCourses, setRefetchLectures }) {

    const [course, setCourse] = useState(null)
    const [getData, status] = useLazyGetOneCourseQuery()
    const [getOneCourse] = useLazyGetData(getData)

    const { data: subscribersCount } = useGetSubscriptionsCountQuery({ course: courseId })

    useEffect(() => {

        const trigger = async () => {
            setCourse({ isLoading: true })
            const res = await getOneCourse({ _id: courseId }, false)
            setCourse(res)
        }
        trigger()
    }, [courseId])

    const [open, setOpen] = useState(false)
    const [sendDelete, statusDelete] = useDeleteCourseMutation()
    const [deleteCourse] = usePostData(sendDelete)

    const deleteFc = async () => {
        await deleteCourse({ id: courseId })
        setActiveCourse('')
        setCourses(prev => {
            let coursesIds = [...prev]
            const filtered = coursesIds.filter(({ _id }) => _id === courseId)
            return filtered
        })
    }

    if (status.isLoading || course?.isLoading) return <LoaderWithText />

    if (status.isSuccess && !course) return <Alert variant="filled" severity="warning" sx={{ justifyContent: 'center' }}>
        {lang.NO_COURSES_IN_THIS_UNIT}
    </Alert>
    // console.log(course)
    if (course)
        return (
            <>
                <TitleWithDividers title={lang.COURSE_DETAILS + " : " + course.name} />
                <FlexColumn>

                    <FlexRow gap={'12px'} width={"100%"}>
                        <OutLinedHoverBtn component={Link} to={'/statistics/courses/' + courseId} sx={{ my: '12px' }} colorm='orange' endIcon={<FcStatistics />}>{lang.STATISTICS}</OutLinedHoverBtn>
                        <TabInfo count={subscribersCount?.values?.count || 0} title={lang.SUBSCRIBERS_NUMS} i={2} />
                        <TabInfo count={course?.isActive ? lang.ACTIVE : lang.NOT_ACTIVE} title={lang.IS_ACTIVE} i={course?.isActive ? 1 : 3} />
                        <TabInfo count={course.price + " " + lang.POUND} title={lang.PRICE} i={0} />
                        <TabInfo count={getFullDate(course.createdAt)} title={'تاريخ الانشاء'} i={1} />

                        {course.dateStart && (
                            <TabInfo count={getFullDate(course.dateStart)} title={'تاريخ البدايه'} i={1} />
                        )}
                        {course.dateEnd && (
                            <TabInfo count={getFullDate(course.dateEnd)} title={'تاريخ النهايه'} i={3} />
                        )}
                        <Button
                            component={Link}
                            to={'/management/courses/' + course._id + '/coupons'}
                            color="success"
                            sx={{
                                color: 'grey.0'
                            }}
                            // endIcon={<MingcuteCouponFill size={'1.5rem'}
                            // />}
                            disabled={statusDelete.isLoading} variant='contained' >
                            عرض الكوبونات
                        </Button>

                        <Button color="error" disabled={statusDelete.isLoading} onClick={() => setOpen(true)} variant='contained' endIcon={<MdRemoveCircleOutline size={'1.5rem'}
                        />}>
                            {statusDelete.isLoading ? <Loader color="#fff" /> : ' حذف الكورس'}
                        </Button>
                        <WrapperHandler status={statusDelete} />
                    </FlexRow>

                    <Separator />
                    <FlexColumn>
                        <Image img={course.thumbnail?.url} />
                        <CourseUpdate course={course} setCourse={setCourse} setCourses={setCourses} />
                    </FlexColumn>

                </FlexColumn>
                <AdminLinkCourse grade={course.grade} course={course} setCourse={setCourse} setRefetchLectures={setRefetchLectures} />

                <ModalStyled
                    title={'هل انت متاكد من حذف الكورس ؟'}
                    desc={'يجب التاكد من حذف جميع الاشتراكات و المحاضرات الخاصه بالكورس !'}
                    open={open}
                    setOpen={setOpen}
                    action={deleteFc}
                />
            </>
        )
}

export default AdminCourseDetails
