import { useParams, useSearchParams } from "react-router-dom"
import AttemptsGrid from "../../components/attempt/AttemptsGrid"
import { useGetOneLectureQuery } from "../../toolkit/apis/lecturesApi"
import { useState } from "react"
import LoaderSkeleton from "../../style/mui/loaders/LoaderSkeleton"
import SwitchStyled from "../../style/mui/styled/SwitchStyled"
import TitleWithDividers from "../../components/ui/TitleWithDividers"
import Section from "../../style/mui/styled/Section"
import { user_roles } from "../../settings/constants/roles"
import { useGetOneCourseQuery } from "../../toolkit/apis/coursesApi"

function AttemptsPage() {
    const [searchParams] = useSearchParams();

    const attemptRole = searchParams?.get("attemptRole")
    const isCenter = attemptRole === user_roles.STUDENT

    const lectureId = searchParams?.get("lectureId")
    const courseId = searchParams?.get("courseId")

    const { data: lecture, isLoading } = useGetOneLectureQuery({ id: lectureId, populate: 'exam' }, { skip: !lectureId })
    const { data: courseData, ...status } = useGetOneCourseQuery({ _id: courseId, select: 'name' }, { skip: !courseId })

    const [courseStatus, setCourse] = useState(courseId)

    if (isLoading || status.isLoading) return <LoaderSkeleton />
    return (
        <Section>
            <TitleWithDividers
                title={
                    lectureId && 'اسم الاختبار : ' + lecture?.values?.name || 'جميع الاختبارات'
                }
                desc={
                    (courseId) ?
                        courseStatus === courseId ?
                            'اسم الكورس : ' + courseData?.values?.name :
                            'احصائيات الاختبار' + (isCenter ? ' لطلاب السنتر' : '')
                        : 'احصائيات المنصه فى الاختبارات'}
            />


            {(courseId) && (
                <SwitchStyled isLoading={isLoading} label={'عرض المحاولات الخاصه بالكورس فقط'}
                    checked={courseStatus === courseId}
                    onChange={() => {
                        if (courseStatus === courseId) {
                            setCourse('all')
                        } else {
                            setCourse(courseId)
                        }
                    }} />
            )}

            <AttemptsGrid courseId={courseStatus} exam={lecture?.values?.exam} attemptRole={attemptRole} />
        </Section>
    )
}

export default AttemptsPage
