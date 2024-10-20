import React, { useEffect, useMemo } from 'react'
import { useGetLectureAndCheckQuery, usePassLectureMutation } from '../../toolkit/apis/coursesApi'
import { Link, useOutletContext, useParams } from 'react-router-dom'
import VideoGenerate from '../../components/content/VideoGenerate'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'
import Separator from '../../components/ui/Separator'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import { FilledHoverBtn, ScallyBtn } from '../../style/buttonsStyles'
import { Avatar, Box, Typography } from '@mui/material'
import InfoInCircle from '../../components/ui/InfoInCircle'
import { FaVideo } from 'react-icons/fa'
import usePostData from '../../hooks/usePostData'
import WrapperHandler from '../../tools/WrapperHandler'
import sectionConstants from '../../settings/constants/sectionConstants'
import ShowPdf from '../../components/ui/ShowPdf'
import ExamCard from '../../components/exam/ExamCard'
import DataWith3Items from '../../components/ui/DataWith3Items'
import Grid from '../../style/vanilla/Grid'
import TabInfo from '../../components/ui/TabInfo'
import LectureBody from '../../components/grades/LectureBody'
import dayjs from 'dayjs'

function LecturePage() {

    const params = useParams()
    const [lectureIndex, setCurrentIndex, currentIndex, course] = useOutletContext();
    const { data: lecture } = useGetLectureAndCheckQuery({
        index: params.courseId, lectureId: params.lectureId
    })

    const [sendData, status] = usePassLectureMutation()
    const [passLecture] = usePostData(sendData)

    useEffect(() => {
        status.reset()
    }, [lectureIndex])

    if (!lecture) return <LoaderSkeleton />
    // console.log(lecture)
    const passed = async () => {
        const nextLectureIndex = lectureIndex + 1
        const res = await passLecture({ courseId: course, lectureId: lecture._id, nextLectureIndex }) //linked to
        setCurrentIndex(nextLectureIndex)
    }


    return (
        <FlexColumn sx={{ minHeight: '90vh', backgroundColor: 'background.alt', borderRadius: '16px', p: '12px' }}>

            <LectureBody lecture={lecture} />

            {(lecture.sectionType !== sectionConstants.EXAM || lecture.exam?.attempts.length !== 0 || (dayjs().isAfter(dayjs(lecture.dateEnd)))) && (
                <FilledHoverBtn onClick={() => passed()} disabled={status.isLoading || lectureIndex !== currentIndex || false} >تم الانتهاء ! </FilledHoverBtn>
            )}
            <WrapperHandler status={status} showSuccess={true} />
        </FlexColumn>
    )
}

export default LecturePage
