import React, { lazy, useEffect, useState } from 'react'
import Section from "../../style/mui/styled/Section"
import { FlexBetween, FlexColumn, FlexRow } from "../../style/mui/styled/Flexbox"
import BannerIcon from '../../components/ui/BannerIcon'
import MakeSelect from '../../style/mui/styled/MakeSelect'
import { Box, Button, Paper, Typography } from '@mui/material'
import TabsStyled from '../../style/mui/styled/TabsStyled'
import GradesTabs from '../../components/grades/GradesTabs'
import { useLazyGetCoursesCountQuery } from '../../toolkit/apis/statisticsApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import AdminLectures from '../../components/content/AdminLectures'
import Separator from '../../components/ui/Separator'
import AdminCourseDetails from '../../components/content/AdminCourseDetails'

import ManageUnits from './ManageUnits'
import ManageCourses from './ManageCourses'


function ManageCoursesPage() {

    //modals params

    const [grade, setGrade] = useState(null)
    const [activeUnit, setActiveUnit] = useState(null) // unit_id
    const [activeCourse, setActiveCourse] = useState(null)
    const [courses, setCourses] = useState([]) //just for delete in admin COurse details ___++___ select Courses

    const [counts, setCounts] = useState({})

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

    return (
        <Section>
            <Paper sx={{ p: '40px' }}>

                <GradesTabs setGrade={setGrade} counts={counts} />
                <FlexColumn>
                    {/* <BannerIcon title="manage Courses" icon="icon " /> */}
                    <ManageUnits grade={grade} activeUnit={activeUnit} setActiveUnit={setActiveUnit} />

                    {(activeUnit) && (
                        <ManageCourses courses={courses} setCourses={setCourses} grade={grade} activeUnit={activeUnit} activeCourse={activeCourse} setActiveCourse={setActiveCourse} />
                    )}

                    {(activeCourse && activeUnit) && (
                        <Box sx={{ width: '100%' }}>
                            <AdminCourseDetails setCourses={setCourses} setActiveCourse={setActiveCourse} courseId={activeCourse} />
                        </Box>
                    )}


                    <Separator sx={{ width: '100%' }} />


                    {(activeCourse && activeUnit) && (
                        <Box sx={{ width: '100%' }}>
                            <AdminLectures course={activeCourse} unit={activeUnit} grade={grade} />
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
