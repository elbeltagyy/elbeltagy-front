import { alpha, Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import { orange, red } from '@mui/material/colors'
import React from 'react'
import TabInfo from '../ui/TabInfo'
import { FilledHoverBtn } from '../../style/buttonsStyles'

import sectionConstants from '../../settings/constants/sectionConstants'
import { FaClock, FaVideo } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { ExamIcon } from '../ui/svg/ContentSvgs'
import { FaLink } from "react-icons/fa6";
import { formatDuration, getDateWithTime, getFullDate } from '../../settings/constants/dateConstants'
import { MdDateRange } from 'react-icons/md'
import { FaLock } from "react-icons/fa";
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import { useNavigate } from 'react-router-dom'

function LectureUserCard({ lecture, i, isSubscribed }) {
    const navigate = useNavigate()
    // console.log('lecture ==>', lecture)
    return (
        <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500], transition: '.3s all ease', color: '#fff', "&:hover": { bgcolor: '#fff', color: red[500] } }} aria-label="recipe" >
                        {lecture.sectionType === sectionConstants.VIDEO ? <FaVideo size='1.5rem' /> :
                            lecture.sectionType === sectionConstants.FILE ? <FaFilePdf size='1.5rem' /> :
                                lecture.sectionType === sectionConstants.EXAM ? <ExamIcon size='1.5rem' /> :
                                    lecture.sectionType === sectionConstants.LINK && <FaLink size='1.5rem' />}                        </Avatar>
                }
                action={
                    <Avatar aria-label="settings" sx={{ bgcolor: 'primary.main', mx: '6px' }} >
                        {i + 1}
                    </Avatar>
                }
                title={<Typography variant='subtitle1'>{lecture.name}</Typography>}
                subheader={<TabInfo i={1} count={getFullDate(lecture.createdAt)} icon={<MdDateRange size='1rem' />} />}
            />
            <CardMedia
                component="img"
                height="194"
                image="https://th.bing.com/th?id=OIP.xEW4lFt6NL-5vdigUqSG1AHaEK&w=333&h=187&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2"
                alt="Paella dish"
            />
            <CardContent sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {lecture.description}
                </Typography>
                <FlexColumn sx={{ alignItems: 'flex-start', gap: '12px', mt: '12px' }}>
                    {lecture.video?.duration && (
                        <TabInfo count={formatDuration(lecture.video?.duration)} i={0} title={'الوقت'} icon={<FaClock size={'1.1rem'} />} />
                    )}
                    {lecture.exam && (
                        <>
                            <TabInfo count={lecture.exam?.time} i={0} title={'الوقت'} isBold={false} icon={<FaClock size={'1.1rem'} />} />
                            <TabInfo count={lecture.exam?.questions?.length || lecture.exam?.questionsLength} i={1} title={'عدد الاسئله'} isBold={false} icon={<FaClock size={'1.1rem'} />} />
                            <TabInfo count={lecture.exam?.attemptsNums} i={3} title={'عدد المحاولات'} isBold={false} icon={<FaClock size={'1.1rem'} />} />
                            {lecture.dateStart && (
                                <TabInfo count={getDateWithTime(lecture.dateStart)} i={0} title={'موعد البدايه'} isBold={false} icon={<FaClock size={'1.1rem'} />} />
                            )}
                        </>
                    )}
                </FlexColumn>

            </CardContent>
            <CardActions disableSpacing>
                <FilledHoverBtn sx={{ width: '100%' }} disabled={!isSubscribed || lecture?.isLocked || false} onClick={() => {
                    navigate("lectures/" + lecture._id)
                }}>
                    ابدا الان
                </FilledHoverBtn>
            </CardActions>
            {/* (!isSubscribed || lecture?.isLocked) */}
            {(!isSubscribed || lecture?.locked) && (
                <Box sx={{ width: '100%', height: '100%', bgcolor: alpha('#000', .6), position: 'absolute', top: 0, }}>
                    <FlexColumn height={'100%'} gap={'10px'}>
                        <Avatar sx={{ width: '4rem', height: '4rem', bgcolor: red[500], color: 'grey.0' }}>
                            <FaLock size={'2rem'} />
                        </Avatar>
                        <Typography variant='subtitle1' sx={{ color: 'grey.1000', bgcolor: 'grey.0', p: '8px 12px', borderRadius: '12px' }}>
                            {lecture.locked ? 'عليك اكمال المحاضرات السابقه' : 'اشترك الان'}
                        </Typography>
                    </FlexColumn>
                </Box>
            )}
        </Card>
    )
}

export default LectureUserCard
