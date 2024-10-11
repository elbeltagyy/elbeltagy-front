import React, { useMemo } from 'react'
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

function LecturePage() {

    const params = useParams()
    const [lectureIndex, setCurrentIndex, currentIndex] = useOutletContext();
    const { data: lecture } = useGetLectureAndCheckQuery({
        index: params.courseId, lectureId: params.lectureId
    })

    const [sendData, status] = usePassLectureMutation()
    const [passLecture] = usePostData(sendData)


    if (!lecture) return <LoaderSkeleton />
    // console.log(lecture)
    const passed = async () => {
        const nextLectureIndex = lectureIndex + 1
        const res = await passLecture({ courseId: lecture.course, lectureId: lecture._id, nextLectureIndex })
        setCurrentIndex(nextLectureIndex)
    }

    return (
        <FlexColumn sx={{ minHeight: '90vh', backgroundColor: 'background.alt', borderRadius: '16px', p: '12px' }}>
            <Box sx={{ width: '100%', maxWidth: '800px' }}>

                <FlexRow sx={{ mb: '16px', width: '100%', position: 'relative', bgcolor: "neutral.1000", p: '12px 20px', borderRadius: '16px' }} >
                    <Avatar sx={{ bgcolor: 'primary.main', color: 'grey.0', width: '55px', height: '55px', position: 'absolute', right: -4 }}>
                        <FaVideo size={'1.5rem'} />
                    </Avatar>
                    <Typography variant='subtitle1' sx={{ textAlign: 'center', width: '100%', color: 'neutral.0', mr: '40px' }}>{lecture.name}</Typography>
                </FlexRow>

                {lecture.video?.isButton ? (
                    <ScallyBtn startIcon={<FaVideo size={'1.5rem'} />}>الانتقال الي يوتيوب</ScallyBtn>
                ) : (
                    <div style={{ maxWidth: '100vh', margin: 'auto' }}>
                        {lecture.sectionType === sectionConstants.VIDEO ? (
                            <VideoGenerate video={lecture.video} />
                        ) : lecture.sectionType === sectionConstants.LINK ? (
                            <ScallyBtn component={Link} to={lecture.link.url} startIcon={<FaVideo size={'1.5rem'} />}> {lecture.name}</ScallyBtn>
                        ) : lecture.sectionType === sectionConstants.FILE ?
                            <ShowPdf file={lecture.file} />
                            : <ExamCard exam={{ ...lecture.exam, name: lecture.name }} />}
                    </div>
                )}



                <FlexColumn gap={'10px'} mt={'16px'} sx={{ alignItems: 'flex-start' }}>
                    <Separator sx={{ maxWidth: '150px', m: 0 }} />
                    <Typography variant='body1'>{lecture.name}</Typography>
                    <Typography variant='body2'>{lecture.description}</Typography>
                    <Separator sx={{ maxWidth: '300px' }} />
                </FlexColumn>


            </Box>
            {(lecture.sectionType !== sectionConstants.EXAM || lecture.exam?.attempts.length !== 0) && (
                <FilledHoverBtn onClick={() => passed()} disabled={status.isLoading || lectureIndex !== currentIndex || false} >تم الانتهاء ! </FilledHoverBtn>
            )}
            <WrapperHandler status={status} showSuccess={true} />
        </FlexColumn>
    )
}

export default LecturePage
