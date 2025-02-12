import { useEffect, useState } from 'react'
import { Box, Paper, } from '@mui/material'

import Section from "../../style/mui/styled/Section"
import { FlexColumn } from "../../style/mui/styled/Flexbox"

import { useLazyGetCoursesCountQuery } from '../../toolkit/apis/statisticsApi'
import useLazyGetData from '../../hooks/useLazyGetData'

import GradesTabs from '../../components/grades/GradesTabs'
import AdminLectures from '../../components/content/AdminLectures'
import Separator from '../../components/ui/Separator'
import AdminCourseDetails from '../../components/content/AdminCourseDetails'

import ManageUnits from './ManageUnits'
import ManageCourses from './ManageCourses'
import { useSearchParams } from 'react-router-dom'


function ManageCoursesPage() {

    //modals params
    const [searchParams, setSearchParams] = useSearchParams();

    const [grade, setGrade] = useState(Number(searchParams.get('grade')) || 0)
    const [activeUnit, setActiveUnit] = useState(searchParams.get('unit') || null) // unit_id
    const [activeCourse, setActiveCourse] = useState(searchParams.get('course') || null)
    const [courses, setCourses] = useState([]) //just for delete in admin COurse details ___++___ select Courses

    const [counts, setCounts] = useState({})
    const [refetchLectures, setRefetchLectures] = useState(false)

    //lectures numbers in every grade
    const [getCoursesCountFc] = useLazyGetCoursesCountQuery()
    const [getCoursesCount] = useLazyGetData(getCoursesCountFc)

    useEffect(() => {
        const trigger = async () => {
            const allGrades = await getCoursesCount()
            const grade1 = await getCoursesCount({ grade: 1 }, false)
            const grade2 = await getCoursesCount({ grade: 2 }, false)
            setCounts({ allGrades, grade1, grade2 })
        }
        trigger()
    }, [grade, activeCourse, activeUnit])

    const changeGrade = (index) => {
        setGrade(index)
        setSearchParams({
            grade: index
        })
        setActiveUnit('')
        setActiveCourse('')
    }

    const changeUnit = (unit) => {
        setActiveUnit(unit)
        setSearchParams({
            grade, unit
        })
        setActiveCourse(null)
    }

    const changeCourse = (course) => {
        setActiveCourse(course)
        setSearchParams({
            grade, unit: activeUnit, course
        })
    }

    return (
        <Section>
            <Paper sx={{ p: '40px' }}>

                <GradesTabs setGrade={changeGrade} counts={counts} grade={grade} />
                <FlexColumn>
                    {/* <BannerIcon title="manage Courses" icon="icon " /> */}
                    <ManageUnits grade={grade} activeUnit={activeUnit} setActiveUnit={changeUnit} />

                    {(activeUnit) && (
                        <ManageCourses courses={courses} setCourses={setCourses} grade={grade} activeUnit={activeUnit} activeCourse={activeCourse} setActiveCourse={changeCourse} />
                    )}

                    {(activeCourse && activeUnit) && (
                        <Box sx={{ width: '100%' }}>
                            <AdminCourseDetails setCourses={setCourses} setActiveCourse={setActiveCourse} courseId={activeCourse} setRefetchLectures={setRefetchLectures} />
                        </Box>
                    )}

                    <Separator sx={{ width: '100%' }} />

                    {(activeCourse && activeUnit) && (
                        <Box sx={{ width: '100%' }}>
                            <AdminLectures course={activeCourse} unit={activeUnit} grade={grade} refetchLectures={refetchLectures} />
                        </Box>
                    )}

                </FlexColumn>
            </Paper>
        </Section>
    )
}

//banner
//units
//courses
//lectures
export default ManageCoursesPage
