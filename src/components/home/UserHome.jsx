import { useEffect, useState } from 'react'
import Section from '../../style/mui/styled/Section'
import UserHeader from '../ui/UserHeader'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Box, Button, Typography } from '@mui/material'
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
import { CoursesIcon, VidsIcon2 } from '../ui/svg/ContentSvgs'
import LatestCourses from './LatestCourses'

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

    // const [data, setData] = useState([
    //     { name: "اختبارات", data: [10, 12, 9, 8, 6, 8, 16, 14, 12, 10, 11, 11], color: 'linear-gradient(#e66465, #188df0)' },
    //     { name: "مشاهدات", data: [17, 12, 14, 13, 14, 2, 4, 11, 6, 8, 5, 8], color: 'linear-gradient(red, orange)' },
    // ]);

    const [activeCompo, setActiveCompo] = useState(0)

    const btns = [
        <Button endIcon={<CoursesIcon />} fullWidth key={0} variant={activeCompo === 0 ? 'contained' : 'outlined'} onClick={() => setActiveCompo(0)}>كورساتك</Button>,
        <Button endIcon={<VidsIcon2 />} fullWidth key={1} variant={activeCompo === 1 ? 'contained' : 'outlined'} onClick={() => setActiveCompo(1)}>محاضرات خاصه</Button>,
        // <Button fullWidth key={2} variant={activeCompo === 2 ? 'contained' : 'outlined'} onClick={() => setActiveCompo(2)}>محتوى مجموعاتك</Button>,
        <Button fullWidth key={3} variant={activeCompo === 3 ? 'contained' : 'outlined'} onClick={() => setActiveCompo(3)}> محاضرات مجانيه</Button>,
    ]

    const compos = [
        {
            value: 0,
            compo: <AccordionStyled title={'كورساتك'} bgcolor="background.alt" expanded={openUserCourses} setExpanded={setOpenCourses}>
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
            </AccordionStyled>,
        },
        { compo: <UserLectures key={0} query={{ codes: true, paid: true }} accordionTitle={'محاضراتك' + ' ' + '(تم شراءها' + " || " + "اكواد)"} />, value: 1 },
        // {
        //     value: 2,
        //     compo: <UserLectures query={{ isGroups: true }} accordionTitle='محاضرات مجموعاتك' />
        //     ,
        // },
        {
            value: 3,
            compo: <UserLectures key={3} query={{ isFree: true, grade: user.grade }} accordionTitle='محاضرات مجانيه' />
        },
    ]


    if (user.role === user_roles.STUDENT) {
        btns.push(<Button fullWidth key={4} variant={activeCompo === 4 ? 'contained' : 'outlined'} onClick={() => setActiveCompo(4)}> محاضرات السنتر</Button>,)
        compos.push({ compo: <UserLectures key={4} query={{ isCenter: true, grade: user.grade }} accordionTitle='محاضرات السنتر' />, value: 4 },)
    }
    // const categories = ['يناير', "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليو", "اغسطس", "سبتمبر", "اكتوبر", "نوفبمر", "ديسمبر"]

    return (
        <Section sx={{ minHeight: '86vh' }}>
            <Typography variant='subBanner' >
                مرحبًا :  {user.name}
            </Typography>
            <Separator />
            <UserHeader user={user} flexDirection={'row'} variant={'circle'} />
            <Box sx={{ my: '16px' }}></Box>
            <TitleSection title={lang.YOUR_SUBSCRIPTIONS} />

            {(user.role === user_roles.ONLINE || user.role == user_roles.STUDENT) && <>
                <Grid min='120px' sx={{ width: '100%' }}>
                    {btns}
                </Grid>


                {compos.find(compo => compo.value === activeCompo)?.compo}
            </>
            }
            <Separator />
            <LatestCourses user={user} />
        </Section>
    )
}

export default UserHome