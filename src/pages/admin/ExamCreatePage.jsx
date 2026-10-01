import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLazyGetOneCourseQuery } from '../../toolkit/apis/coursesApi'
import useLazyGetData from '../../hooks/useLazyGetData'

import Section from '../../style/mui/styled/Section'
import TitleWithDividers from '../../components/ui/TitleWithDividers'

import usePostData from '../../hooks/usePostData'

import ExamForm from '../../components/exam/ExamForm'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'
import useHandelQuestions from '../../hooks/useHandelQuestions'
import { useCreateExamMutation } from '../../toolkit/apis/examsApi'


function ExamCreatePage({ courseIdVar, chapter, parent, setLectures, setClose, grade }) {
    // const navigate = useNavigate()
    const { courseId } = useParams()
    const finalCourseId = courseId || courseIdVar

    const [course, setCourse] = useState()

    const [getData] = useLazyGetOneCourseQuery()
    const [getCourse] = useLazyGetData(getData)

    const [loading, setLoading] = useState(false)
    const [saveFiles] = useHandelQuestions(setLoading)

    useEffect(() => {
        const trigger = async () => {
            const res = await getCourse({ _id: finalCourseId, select: "name grade" })
            setCourse(res)
        }
        if (finalCourseId) trigger()
    }, [finalCourseId])

    const [sendData, status] = useCreateExamMutation()
    const [createExam] = usePostData(sendData)

    const onSubmit = async (values) => {
        try {
            // console.log(values)
            setLoading(true)
            const exam = await saveFiles(values)
            const res = await createExam({ ...exam, chapter, parent })

            setLectures(prev => ([...prev, res]))
            if (setClose) {
                setClose(p => !p)
            }
            // console.log('res ==>', res)
            setLoading(false)
            // navigate(-1, { replace: true })
        } catch (error) {
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
    if (!course && !parent) return <LoaderSkeleton />

    return (
        <Section>
            <TitleWithDividers title={'انشاء اختبار : ' + (course && course?.name)} />
            {/* loading */}
            <ExamForm lecture={{ course: course?._id, grade }} status={{ ...status, isLoading: loading }} onSubmit={onSubmit} />
        </Section>
    )
}

export default ExamCreatePage
