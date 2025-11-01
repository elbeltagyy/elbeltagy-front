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
import { useSelector } from 'react-redux'
import { formatDuration } from '../../settings/constants/dateConstants'
import TabInfo from '../ui/TabInfo'
import InfoText from '../ui/InfoText'

function LectureBody({ lecture, lectureIndex, courseId }) {
    const user = useSelector(s => s.global.user)

    if (user) {
        let value = '"' + user.userName + '"'
        document.documentElement.style.setProperty('--main-userName', `${value}`)
    }

    return (
        <Box sx={{ width: '100%', maxWidth: '800px' }}>
            <FlexColumn gap={'16px'}>

                <Avatar sx={{ bgcolor: 'primary.main', color: 'grey.0', width: '55px', height: '55px' }}>
                    {lectureIndex}
                </Avatar>

                <FlexRow sx={{ mb: '16px', width: '100%', position: 'relative', bgcolor: "neutral.1000", p: '12px 20px', borderRadius: '16px', border: '2px solid transparent' }} >
                    {lectureIndex && (
                        <Avatar sx={{ bgcolor: 'primary.main', color: 'grey.0', width: '55px', height: '55px', position: 'absolute', right: -4 }}>
                            <SectionIcon lecture={lecture} color='white' />
                        </Avatar>
                    )}
                    <Typography variant='subtitle1' sx={{ textAlign: 'center', width: '100%', color: 'neutral.0', mr: '40px', textDecoration: 'underline' }}>{lecture.name}</Typography>
                </FlexRow>
            </FlexColumn>

            {lecture.video?.isButton ? (
                <ScallyBtn startIcon={<FaVideo size={'1.5rem'} />}>الانتقال الي يوتيوب</ScallyBtn>
            ) : (
                <div style={{ maxWidth: '100vh', margin: 'auto' }}>
                    {lecture.sectionType === sectionConstants.VIDEO ? (
                        <VideoGenerate video={lecture.video} lecture={lecture} course={courseId} />
                    ) : lecture.sectionType === sectionConstants.LINK ? (
                        <FlexColumn>
                            <ScallyBtn component={Link} to={lecture.link.url} startIcon={<SectionIcon lecture={lecture} color='white' />}> {lecture.name}</ScallyBtn>
                        </FlexColumn>
                    ) : lecture.sectionType === sectionConstants.FILE ?
                        <ShowPdf file={lecture.file} />
                        : <ExamCard lecture={lecture} exam={{ ...lecture.exam, name: lecture.name, courseId: courseId ? courseId : null }} />}
                </div>
            )}

            <FlexColumn gap={'10px'} mt={'16px'} sx={{ alignItems: 'flex-start' }}>
                <Separator sx={{ maxWidth: '150px', m: 0 }} />
                {lecture.video?.duration &&
                    <TabInfo count={formatDuration(lecture.video?.duration)} i={0} title={'وقت الفيديو'} />
                }
                <InfoText description={lecture.name} label={'الحصه'} />
                <InfoText description={lecture.description} label={'الوصف'} />
                <Typography variant='body2'></Typography>
                <Separator sx={{ maxWidth: '300px' }} />
            </FlexColumn>
        </Box>
    )
}

export default LectureBody
