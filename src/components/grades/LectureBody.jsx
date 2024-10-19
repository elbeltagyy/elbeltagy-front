import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import { FaVideo } from 'react-icons/fa'
import { ScallyBtn } from '../../style/buttonsStyles'
import sectionConstants from '../../settings/constants/sectionConstants'
import VideoGenerate from '../content/VideoGenerate'
import { Link } from 'react-router-dom'
import ShowPdf from '../ui/ShowPdf'
import ExamCard from '../exam/ExamCard'
import Separator from '../ui/Separator'

function LectureBody({ lecture }) {
    return (
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
    )
}

export default LectureBody
