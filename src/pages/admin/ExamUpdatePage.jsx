import { useCallback, useEffect, useState } from 'react'
import Section from '../../style/mui/styled/Section'
import ExamForm from '../../components/exam/ExamForm'
import { useLazyGetOneLectureQuery } from '../../toolkit/apis/lecturesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import { useParams } from 'react-router-dom'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import usePostData from '../../hooks/usePostData'

import { useUpdateExamMutation } from '../../toolkit/apis/examsApi'
import useHandelQuestions from '../../hooks/useHandelQuestions'

function ExamUpdatePage() {
    const { lectureId } = useParams()

    const [getData] = useLazyGetOneLectureQuery()
    const [getLecture] = useLazyGetData(getData)
    const [lecture, setLecture] = useState()

    useEffect(() => {
        const trigger = async () => {
            const res = await getLecture({ id: lectureId })
            setLecture(res)
        }
        trigger()
    }, [lectureId])

    const [sendData, status] = useUpdateExamMutation()
    const [updateExam] = usePostData(sendData)

    const [loading, setLoading] = useState(false)
    const [saveFiles] = useHandelQuestions(setLoading)

    const onSubmit = useCallback(async (values, props) => {
        try {
            // console.log('val =>>>', values)
            setLoading(true)
            const exam = await saveFiles(values)
            const res = await updateExam({ ...exam, lecture: lectureId })
            // setLecture({
            //     ...res.lecture, exam: res.updatedExam
            // })
            // console.log('res ==>', { ...res.lecture, exam: res.updatedExam })
            // props.resetForm({ ...res.lecture, exam: res.updatedExam })
            setLoading(false)
        } catch (error) {
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }, [lectureId])

    if (!lecture) return <LoaderSkeleton />
    return (
        <Section>
            <TitleWithDividers title={'تعديل على اختبار'} />
            <ExamForm lecture={{ ...lecture }} onSubmit={onSubmit} status={{ ...status, isLoading: loading || status.isLoading }} />
        </Section>
    )
}

export default ExamUpdatePage
