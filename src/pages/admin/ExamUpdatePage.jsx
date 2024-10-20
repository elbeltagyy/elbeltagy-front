import React, { useEffect, useState } from 'react'
import Section from '../../style/mui/styled/Section'
import ExamForm from '../../components/exam/ExamForm'
import { useLazyGetOneLectureQuery, useUpdateExamMutation } from '../../toolkit/apis/lecturesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import { useParams } from 'react-router-dom'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import usePostData from '../../hooks/usePostData'
import { useUploadFilesMutation } from '../../toolkit/apis/filesApi'

function ExamUpdatePage() {
    const { lectureId } = useParams()

    const [getData] = useLazyGetOneLectureQuery()
    const [getLecture] = useLazyGetData(getData)
    const [lecture, setLecture] = useState()

    useEffect(() => {
        const trigger = async () => {
            const res = await getLecture({ id: lectureId, populate: 'exam' })
            // console.log('res ==>', res)
            setLecture(res)
        }
        trigger()
    }, [lectureId])


    const [uploadData, { isLoading }] = useUploadFilesMutation()
    const [uploadFiles] = usePostData(uploadData)

    const [sendData, status] = useUpdateExamMutation()
    const [updateExam] = usePostData(sendData)

    const onSubmit = async (values, props) => {

        let exam = JSON.parse(JSON.stringify(values));
        let images = [];

        //create images
        values.questions.forEach((question, i) => {
            if (question.image instanceof File) {
                images.push(values.questions[i].image);
                exam.questions[i].image = images.length - 1;
            }
        });

        //upload images
        let savedFiles = []
        if (images.length !== 0) {
            savedFiles = await uploadFiles({ files: [...images] }, true)
        }

        //modify questions with images
        exam.questions.forEach((question, i) => {
            if (!isNaN(question.image) || Number(question.image) === 0) {
                const imageIndex = Number(question.image)
                question.image = savedFiles[imageIndex];
            }
        });

        const res = await updateExam({ ...exam, lecture: lecture._id })
        props.resetForm({ ...res.lecture, exam: res.updatedExam })
        setLecture({
            ...res.lecture, exam: res.updatedExam
        })
    }

    if (!lecture) return <LoaderSkeleton />
    return (
        <Section>
            <TitleWithDividers title={'تعديل على اختبار'} />
            <ExamForm lecture={lecture} onSubmit={onSubmit} status={{ ...status, isLoading: isLoading || status.isLoading }} />
        </Section>
    )
}

export default ExamUpdatePage
