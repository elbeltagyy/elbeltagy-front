import React, { useEffect, useState } from 'react'
import Section from '../../style/mui/styled/Section'
import UserHeader from '../ui/UserHeader'
import { useSelector } from 'react-redux'
import { Alert, Divider, Typography } from '@mui/material'
import { useLazyGetUserCoursesQuery } from '../../toolkit/apis/userCoursesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import TitleSection from '../../components/ui/TitleSection'
// import UserCourseDetails from '../../components/courses/UserCourseDetails'
// import AccordionStyled from '../../style/mui/styled/AccordionStyled'
// import Grid from '../../style/vanilla/Grid'
// import LoaderWithText from '../../style/mui/loaders/LoaderWithText'
import Separator from '../../components/ui/Separator'
import { lang } from '../../settings/constants/arlang'

function UserHome() {

    const { user } = useSelector(s => s.global)

    const [courses, setCourses] = useState(null)
    const [open, setOpen] = useState(false)


    const [getData, status] = useLazyGetUserCoursesQuery()
    const [getUserCourses] = useLazyGetData(getData)

    useEffect(() => {
        const trigger = async () => {
            const res = await getUserCourses()
            setCourses(res)
        }

        if (!courses && open) {
            trigger()
        }
    }, [open])

    return (
        <Section sx={{ minHeight: '86vh' }}>
            <Typography variant='subBanner' >
                مرحبًا :  {user.name}
            </Typography>
            <Separator />
            <UserHeader user={user} flexDirection={'row'} variant={'circle'} />
            <TitleSection title={lang.YOUR_SUBSCRIPTIONS} />
        </Section>
    )
}

export default UserHome
{/* <AccordionStyled title={lang.COURSES} bgcolor="background.alt" expanded={open} setExpanded={setOpen}>
{status.isLoading && (
    <LoaderWithText />
)}
{courses?.length === 0 && (
    <Alert variant='filled' severity='warning'> انت لم تشترك فى اى كورس بعد...!</Alert>
)}
<Grid>
    {courses && courses?.map(({ course, createdAt }, i) => <UserCourseDetails key={i} course={course} subscribedAt={createdAt} />)}
</Grid>
</AccordionStyled> */}