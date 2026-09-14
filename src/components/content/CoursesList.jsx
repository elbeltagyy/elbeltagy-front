import { Alert } from "@mui/material"
import UnitCourseDetails from "./UnitCourseDetails"
import { useGetCoursesQuery } from "../../toolkit/apis/coursesApi"
import LoaderWithText from "../../style/mui/loaders/LoaderWithText"
import Grid from "../../style/vanilla/Grid"

function CoursesList({ grade }) {
    const { data, isFetching } = useGetCoursesQuery({ isModernSort: true, grade: grade || 'all' })

    return (
        <>
            {isFetching && <LoaderWithText text={'يتم تحميل الكورسات !'} />}
            {data?.values?.courses?.length === 0 && (
                <Alert severity="warning" variant="filled">الكورسات هتنزل قريب, خليك متابع!</Alert>
            )}
            <Grid>
                {data?.values?.courses && data?.values?.courses.map(course => {
                    return <UnitCourseDetails key={course._id} course={course} />
                })}
            </Grid>
        </>
    )
}

export default CoursesList