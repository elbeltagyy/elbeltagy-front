import { useState } from "react"
import GradesTabs from "../../components/grades/GradesTabs"
import TitleSection from "../../components/ui/TitleSection"

import { FlexColumn, FlexRow } from "../../style/mui/styled/Flexbox"
import Section from "../../style/mui/styled/Section"
import { useSelector } from "react-redux"
import CoursesList from "../../components/content/CoursesList"

function CoursesPage() {
    const user = useSelector(s => s.global.user)
    const [grade, setGrade] = useState(Number(user?.grade) || 0)

    return (
        <Section>
            <TitleSection title={'كورسات المنصه'} />
            <FlexColumn gap={'16px'}>
                <FlexRow>
                    <GradesTabs grade={grade} setGrade={setGrade} counts={{}} />
                </FlexRow>
                <CoursesList grade={grade} />
            </FlexColumn>
        </Section>
    )
}

export default CoursesPage
