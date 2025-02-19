import { useEffect, useState } from 'react'
import Section from '../../style/mui/styled/Section'
import UserHeader from '../ui/UserHeader'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Typography } from '@mui/material'
import { useLazyGetCourseSubscriptionsQuery } from '../../toolkit/apis/userCoursesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import TitleSection from '../../components/ui/TitleSection'
import UnitCourseDetails from '../../components/content/UnitCourseDetails'
import AccordionStyled from '../../style/mui/styled/AccordionStyled'
import Grid from '../../style/vanilla/Grid'
import LoaderWithText from '../../style/mui/loaders/LoaderWithText'
import Separator from '../../components/ui/Separator'
import { lang } from '../../settings/constants/arlang'

import { user_roles } from '../../settings/constants/roles'
import { useLazyIsLoggedQuery } from '../../toolkit/apis/usersApi'
import { setUser } from '../../toolkit/globalSlice'
import UserLectures from './UserLectures'

function UserHome() {

    const { user } = useSelector(s => s.global)

    const [courses, setCourses] = useState([])
    const [openUserCourses, setOpenCourses] = useState(false)
    const [getData, status] = useLazyGetCourseSubscriptionsQuery()
    const [getCourses] = useLazyGetData(getData)

    useEffect(() => {
        const trigger = async () => {
            const res = await getCourses({ user: user._id, populate: 'course' })

            setCourses(res.subscriptions)
        }
        if (openUserCourses && courses.length === 0) {
            trigger()
        }
    }, [openUserCourses])

    const dispatch = useDispatch()
    const [getUserData] = useLazyIsLoggedQuery()

    useEffect(() => {
        const checkIslogged = async () => {
            const isWorked = JSON.parse(sessionStorage.getItem('user'))
            if (isWorked?.name) {
                return
            }
            const { data } = await getUserData()
            const userData = data?.values

            dispatch(setUser({ ...user, ...userData }))
        }
        checkIslogged()
    }, [])

    return (
        <Section sx={{ minHeight: '86vh' }}>
            <Typography variant='subBanner' >
                مرحبًا :  {user.name}
            </Typography>
            <Separator />
            <UserHeader user={user} flexDirection={'row'} variant={'circle'} />
            <TitleSection title={lang.YOUR_SUBSCRIPTIONS} />
            <AccordionStyled title={'كورساتك'} bgcolor="background.alt" expanded={openUserCourses} setExpanded={setOpenCourses}>
                {status.isLoading && (
                    <LoaderWithText />
                )}
                {courses?.length === 0 && status.isSuccess && (
                    <Alert variant='filled' severity='warning'> انت لم تشترك فى اى كورس بعد...!</Alert>
                )}
                <Grid>
                    {courses && courses?.map(({ course, createdAt, updatedAt, currentIndex }, i) => <UnitCourseDetails key={i}
                        course={course}
                        subscribedAt={createdAt}
                        lastLectureAt={updatedAt}
                        currentIndex={currentIndex}
                    />)}
                </Grid>
            </AccordionStyled>
            {user.role === user_roles.STUDENT || user.role === user_roles.ONLINE && (
                <UserLectures query={{ codes: true }} accordionTitle={'محاضراتك' + ' ' + '(تم شراءها)'} />
            )}

            {user.role === user_roles.STUDENT && (
                <UserLectures query={{ isCenter: true }} accordionTitle='محاضرات السنتر' />
            )}

            <UserLectures query={{ isFree: true }} accordionTitle='محاضرات مجانيه' />

            {user.groups?.length > 0 && (
                <UserLectures query={{ isGroups: true }} accordionTitle='محاضرات مجموعاتك' />
            )}
        </Section>
    )
}

export default UserHome