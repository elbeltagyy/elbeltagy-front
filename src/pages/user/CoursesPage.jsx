import { useState } from "react"
import GradesTabs from "../../components/grades/GradesTabs"
import TitleSection from "../../components/ui/TitleSection"

import { FlexColumn } from "../../style/mui/styled/Flexbox"
import Section from "../../style/mui/styled/Section"
import { useSelector } from "react-redux"
import Grid from "../../style/vanilla/Grid"
import { useGetCoursesQuery } from "../../toolkit/apis/coursesApi"
import UnitCourseDetails from "../../components/content/UnitCourseDetails"
import LoaderWithText from "../../style/mui/loaders/LoaderWithText"
import { Alert } from "@mui/material"

function CoursesPage() {
    const user = useSelector(s => s.global.user)
    const [grade, setGrade] = useState(Number(user?.grade) || 3)
    const { data, isFetching } = useGetCoursesQuery({ isModernSort: true, grade: grade || 'all' })

    return (
        <Section>
            <TitleSection title={'كورسات المنصه'} />
            <FlexColumn gap={'16px'}>
                <GradesTabs grade={grade} setGrade={setGrade} counts={{}} />
                {isFetching && <LoaderWithText text={'يتم تحميل الكورسات !'} />}
                {data?.values?.courses?.length === 0 && (
                    <Alert severity="warning" variant="filled">الكورسات هتنزل قريب, خليك متابع!</Alert>
                )}
                <Grid>
                    {data?.values?.courses && data?.values?.courses.map(course => {
                        return <UnitCourseDetails key={course._id} course={course} />
                    })}
                </Grid>
            </FlexColumn>
        </Section>
    )
}

export default CoursesPage
