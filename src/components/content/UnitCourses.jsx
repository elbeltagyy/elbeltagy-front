import { useLazyGetCoursesQuery } from '../../toolkit/apis/coursesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import UserCourseDetails from './UnitCourseDetails'
import Grid from '../../style/vanilla/Grid'
import LoaderWithText from '../../style/mui/loaders/LoaderWithText'
import { useEffect, useState } from 'react'
import AccordionStyled from '../../style/mui/styled/AccordionStyled'
import { Alert } from '@mui/material'

function UnitsList({ unit }) {

    const [open, setOpen] = useState(false)
    const [courses, setCourses] = useState([])

    const [getCoursesFc, status] = useLazyGetCoursesQuery()
    const [getCourses] = useLazyGetData(getCoursesFc)


    useEffect(() => {
        const getCourse = async () => {
            let { courses, count } = await getCourses({ unit: unit._id, isActive: true })
            const sortedCourses = [...courses].sort((a, b) => {
                return (b.isFixed === true) - (a.isFixed === true);
            });
            setCourses(sortedCourses)
        }

        if (open && courses.length === 0) {
            getCourse()
        }
    }, [open])


    return (
        <AccordionStyled title={unit.name} bgcolor="background.alt" expanded={open} setExpanded={setOpen}>
            {status.isLoading && (
                <LoaderWithText />
            )}
            {(courses?.length === 0 && status.isSuccess) && (
                <Alert variant='filled' severity='warning'> الكورسات هتنزل قريبا, خليك متابع.</Alert>
            )}
            <Grid>
                {courses.map((course, i) => <UserCourseDetails key={i} course={course} />)}
            </Grid>
        </AccordionStyled>
    )
}

export default UnitsList
