import React from 'react'
import LectureForm from './LectureForm'
import { useGetOneLectureQuery } from '../../toolkit/apis/lecturesApi'
import LoaderWithText from '../../style/mui/loaders/LoaderWithText'
import Section from '../../style/mui/styled/Section'

function LectureUpdate({ lecture }) {
    // console.log(lecture)
    const { data, isLoading } = useGetOneLectureQuery({ id: lecture._id, populate: 'video link file' })
    // console.log('data ==>', data)
    const onSubmit = (values) => {
        console.log(values)
    }
    console.log(data)
    if (isLoading) {
        return <Section>
            <LoaderWithText />
        </Section>
    }

    return (
        <Section>
            <LectureForm lecture={{ ...data?.values }} onSubmit={onSubmit} location='update' />
        </Section>
    )
}

export default LectureUpdate 
