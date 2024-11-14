import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLazyGetOneCourseQuery } from '../../toolkit/apis/coursesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import MakeForm from '../../tools/makeform/MakeForm'

import Section from '../../style/mui/styled/Section'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import Loader from '../../style/mui/loaders/Loader'
import { lang } from '../../settings/constants/arlang'
import sectionConstants from '../../settings/constants/sectionConstants'
import usePostData from '../../hooks/usePostData'

import { useCreateExamMutation } from '../../toolkit/apis/lecturesApi'
import { useUploadFilesMutation } from '../../toolkit/apis/filesApi'
import ExamForm from '../../components/exam/ExamForm'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'


function ExamUpdatePage() {
    const navigate = useNavigate()
    const { courseId } = useParams()
    const [course, setCourse] = useState()

    const [getData] = useLazyGetOneCourseQuery()
    const [getCourse] = useLazyGetData(getData)

    const [uploadedFilesList, setUploadedFilesList] = useState([])
    const [uploadData, { isLoading }] = useUploadFilesMutation()
    const [uploadFiles] = usePostData(uploadData)

    useEffect(() => {
        const trigger = async () => {
            const res = await getCourse({ _id: courseId, select: "name grade" })
            setCourse(res)
        }
        trigger()
    }, [courseId])

    const [sendData, status] = useCreateExamMutation()
    const [createExam] = usePostData(sendData)

    const onSubmit = async (values) => {
        let exam = JSON.parse(JSON.stringify(values));
        let images = [];

        //create images
        values.questions.forEach((question, i) => {
            if (question.image) {
                images.push(values.questions[i].image);
                exam.questions[i].image = images.length - 1;
            } else {
                delete exam.questions[i].image
            }
        });

        //upload images
        let savedFiles = uploadedFilesList || []
        if (uploadedFilesList.length !== images.length && images.length !== 0) {
            savedFiles = await uploadFiles({ files: [...images] }, true)
            setUploadedFilesList(savedFiles)
        }

        //modify questions with images
        exam.questions.forEach((question, i) => {
            if (question.image || Number(question.image) === 0) {
                const imageIndex = Number(question.image)
                question.image = savedFiles[imageIndex];
            }
        });

        //saving Exam
        await createExam(exam)
        navigate(-1, { replace: true })
    }

    if (!course) return <LoaderSkeleton />

    return (
        <Section>
            <TitleWithDividers title={'انشاء اختبار : ' + course.name} />
            <ExamForm lecture={{ course: course._id, grade: course.grade }} status={{ ...status, isLoading: isLoading || status.isLoading || false }} onSubmit={onSubmit} />
        </Section>
    )
}

export default ExamUpdatePage
