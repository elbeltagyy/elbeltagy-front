import React from 'react'
import LectureForm from './LectureForm'
import { useGetOneLectureQuery, usePatchLectureMutation } from '../../toolkit/apis/lecturesApi'
import LoaderWithText from '../../style/mui/loaders/LoaderWithText'
import Section from '../../style/mui/styled/Section'
import usePostData from '../../hooks/usePostData'

function LectureUpdate({ lecture, setLectures }) {

    const { data, isLoading, refetch } = useGetOneLectureQuery({ id: lecture._id, populate: 'video link file' })
    const [sendData, status] = usePatchLectureMutation()
    const [updateLecture] = usePostData(sendData)

    const onSubmit = async (values) => {
        const res = await updateLecture(values, true)
        setLectures(prev => {
            let prevLectures = [...prev]
            const modifiedLectures = prevLectures.map(lecture => {
                if (lecture._id === res.lecture._id) {
                    return res.lecture
                } else {
                    return lecture
                }
            })
            return modifiedLectures
        })

        if (res) {
            refetch()
        }
    }

    if (isLoading) {
        return <Section>
            <LoaderWithText />
        </Section>
    }

    return (
        <Section>
            <LectureForm lecture={{ ...data?.values }} setLectures={setLectures} status={status} onSubmit={onSubmit} location='update' />
        </Section>
    )
}

export default LectureUpdate 
