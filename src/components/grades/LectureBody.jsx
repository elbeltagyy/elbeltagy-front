import { Avatar, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import { FaVideo } from 'react-icons/fa'

import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import { ScallyBtn } from '../../style/buttonsStyles'
import sectionConstants from '../../settings/constants/sectionConstants'
import VideoGenerate from '../content/VideoGenerate'
import ShowPdf from '../ui/ShowPdf'
import ExamCard from '../exam/ExamCard'
import Separator from '../ui/Separator'
import SectionIcon from '../content/SectionIcon'

function LectureBody({ lecture, lectureIndex }) {
    return (
        <Box sx={{ width: '100%', maxWidth: '800px' }}>
            <FlexColumn gap={'16px'}>

                <Avatar sx={{ bgcolor: 'primary.main', color: 'grey.0', width: '55px', height: '55px' }}>
                    <SectionIcon lecture={lecture} color='white' />
                </Avatar>

                <FlexRow sx={{ mb: '16px', width: '100%', position: 'relative', bgcolor: "neutral.1000", p: '12px 20px', borderRadius: '16px', border: '2px solid transparent' }} >

                    <Typography variant='subtitle1' sx={{ textAlign: 'center', width: '100%', color: 'neutral.0', mr: '40px', textDecoration: 'underline' }}>{lecture.name}</Typography>
                    {lectureIndex && (
                        <Avatar sx={{ bgcolor: 'primary.main', color: 'grey.0', width: '55px', height: '55px', position: 'absolute', left: -4 }}>
                            {lectureIndex}
                        </Avatar>
                    )}
                </FlexRow>
            </FlexColumn>

            {lecture.video?.isButton ? (
                <ScallyBtn startIcon={<FaVideo size={'1.5rem'} />}>الانتقال الي يوتيوب</ScallyBtn>
            ) : (
                <div style={{ maxWidth: '100vh', margin: 'auto' }}>
                    {lecture.sectionType === sectionConstants.VIDEO ? (
                        <VideoGenerate video={lecture.video} />
                    ) : lecture.sectionType === sectionConstants.LINK ? (
                        <FlexColumn>
                            <ScallyBtn component={Link} to={lecture.link.url} startIcon={<SectionIcon lecture={lecture} color='white' />}> {lecture.name}</ScallyBtn>
                        </FlexColumn>
                    ) : lecture.sectionType === sectionConstants.FILE ?
                        <ShowPdf file={lecture.file} />
                        : <ExamCard lecture={lecture} exam={{ ...lecture.exam, name: lecture.name }} />}
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
