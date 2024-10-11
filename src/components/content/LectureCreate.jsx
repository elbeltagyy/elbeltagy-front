import React from 'react'
import { useCreateLectureMutation } from '../../toolkit/apis/lecturesApi'
import usePostData from '../../hooks/usePostData'
import LectureForm from './LectureForm'

function LectureCreate({ setLectures, grade, course }) {
    const [sendData, status] = useCreateLectureMutation()
    const [createLecture] = usePostData(sendData)

    const onSubmit = async (values) => {
        const res = await createLecture(values, true)
        console.log('res ===>', res)
        setLectures(prev => { return [...prev, res] })
    }
    return (
        <LectureForm grade={grade} course={course} onSubmit={onSubmit} status={status} />
    )
}

export default LectureCreate
