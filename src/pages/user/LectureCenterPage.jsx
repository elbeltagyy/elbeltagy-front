import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetLectureAndCheckQuery } from '../../toolkit/apis/coursesApi';
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton';
import LectureBody from '../../components/grades/LectureBody';
import { useGetLectureForCenterQuery, useGetOneLectureQuery } from '../../toolkit/apis/lecturesApi';
import Section from '../../style/mui/styled/Section';
import { FlexColumn } from '../../style/mui/styled/Flexbox';
import { FilledHoverBtn } from '../../style/buttonsStyles';

function LectureCenterPage() {

    const navigate = useNavigate()
    const params = useParams()
    const { data: lecture } = useGetLectureForCenterQuery({
        id: params.lectureId
    })
    
    if (!lecture) return <LoaderSkeleton />

    return (
        <Section>
            <FlexColumn sx={{ backgroundColor: 'background.alt', p: '16px', gap: '12px' }}>
                <LectureBody lecture={lecture} />
                <FilledHoverBtn onClick={() => navigate(-1)}>رجوع</FilledHoverBtn>
            </FlexColumn>
        </Section>
    )
}

export default LectureCenterPage
