import { useEffect, useState } from 'react'
import Section from '../../style/mui/styled/Section'
import UserHeader from '../ui/UserHeader'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Box, Button, ButtonGroup, Typography } from '@mui/material'
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
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import PieChart from '../../tools/charts/PieChart'
import DynamicBarChart from '../../tools/charts/BarChart'
import TitleWithDividers from '../ui/TitleWithDividers'

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
        <Button key={0} variant={activeCompo === 0 ? 'contained' : 'outlined'} onClick={() => setActiveCompo(0)}>كورساتك</Button>,
        <Button key={1} variant={activeCompo === 1 ? 'contained' : 'outlined'} onClick={() => setActiveCompo(1)}>محاضرات (اكواد)</Button>,
        <Button key={2} variant={activeCompo === 2 ? 'contained' : 'outlined'} onClick={() => setActiveCompo(2)}>محتوى مجموعاتك</Button>,
        <Button key={3} variant={activeCompo === 3 ? 'contained' : 'outlined'} onClick={() => setActiveCompo(3)}> محاضرات مجانيه</Button>,

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
        { compo: <UserLectures query={{ codes: true }} accordionTitle={'محاضراتك' + ' ' + '(تم شراءها)'} />, value: 1 },
        {
            value: 2,
            compo: <UserLectures query={{ isGroups: true }} accordionTitle='محاضرات مجموعاتك' />
            ,
        },
        {
            value: 3,
            compo: <UserLectures query={{ isFree: true }} accordionTitle='محاضرات مجانيه' />
        },
    ]


    if (user.role === user_roles.STUDENT) {
        btns.push(<Button key={4} variant={activeCompo === 4 ? 'contained' : 'outlined'} onClick={() => setActiveCompo(4)}> محاضرات السنتر</Button>,)
        compos.push({ compo: <UserLectures query={{ isCenter: true }} accordionTitle='محاضرات السنتر' />, value: 4 },)
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

            <FlexColumn>
                <ButtonGroup color="primary" aria-label="Medium-sized button group">
                    {btns}
                </ButtonGroup>
            </FlexColumn>

            {compos.find(compo => compo.value === activeCompo)?.compo}

            {/* <TitleSection title='احصائياتك' />
            <FlexRow minHeight={'100vh'}>
                <Box width={'50%'}>
                    <DynamicBarChart
                        categories={categories}
                        series={data}
                        height="420px"
                    />
                </Box>
                <Box width={'40%'}>
                    <PieChart />
                </Box>
            </FlexRow> */}

            {/* {(user.role === user_roles.STUDENT || user.role === user_roles.ONLINE) && (
                <UserLectures query={{ codes: true }} accordionTitle={'محاضراتك' + ' ' + '(تم شراءها)'} />
            )} */}

            {/* {user.role === user_roles.STUDENT && (
                <UserLectures query={{ isCenter: true }} accordionTitle='محاضرات السنتر' />
            )} */}

            {/* <UserLectures query={{ isFree: true }} accordionTitle='محاضرات مجانيه' /> */}

            {/* {user.groups?.length > 0 && (
                <UserLectures query={{ isGroups: true }} accordionTitle='محاضرات مجموعاتك' />
            )} */}
        </Section>
    )
}

export default UserHome