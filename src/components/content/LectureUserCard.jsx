import { alpha, Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Collapse, Typography } from '@mui/material'
import { red } from '@mui/material/colors'

import TabInfo from '../ui/TabInfo'

import { FaClock, FaLock } from "react-icons/fa";
import { MdArrowDownward, MdDateRange } from 'react-icons/md'
import { IoMdDoneAll } from "react-icons/io";

import { formatDuration, getFullDate } from '../../settings/constants/dateConstants'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'

import SectionIcon from './SectionIcon'
import { useSelector } from 'react-redux';

import { useState } from 'react';

import statusConstants from '../../settings/constants/status';
import InfoText from '../ui/InfoText';
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { AttemptsIcon } from '../ui/svg/ContentSvgs';
import useGrades from '../../hooks/useGrades';
import DataWith3Items from '../ui/DataWith3Items';
import LectureUserCardBtn from './LectureUserCardBtn';


function LectureUserCard({ lecture, isSubscribed, currentUserIndex, currentLectureIndex }) {
    const { grades } = useGrades()

    const user = useSelector(s => s.global.user)
    const [openAssets, setOpenAssets] = useState(false)

    const [paidStatus, setIsPaid] = useState(lecture?.isPaid && statusConstants.PAID)
    const subscribe = (res) => {
        if (res.lecture) {
            setIsPaid(statusConstants.PAID)
        }
        if (res.invoice?.status === statusConstants.PENDING)
            setIsPaid(statusConstants.PENDING)
    }
    return (
        <Card sx={{
            display: 'flex', position: 'relative', bgcolor: 'background.alt', flexDirection: 'column', width: '100%', maxWidth: '550px'
        }}>
            <CardHeader
                sx={{ flexWrap: 'wrap', alignItems: 'flex-start', p: '16px 16px 0 16px' }}
                avatar={
                    <Avatar sx={{ bgcolor: red[500], transition: '.3s all ease', color: '#fff', "&:hover": { bgcolor: '#fff', color: red[500] } }} aria-label="recipe" >
                        <SectionIcon lecture={lecture} color='inherit' />
                    </Avatar>
                }
                action={
                    <Avatar aria-label="settings" sx={{ bgcolor: 'primary.main', mx: '6px', color: 'grey.0' }} >
                        {lecture.index}
                    </Avatar>
                }
                title={<Typography variant='subtitle1' sx={{ maxWidth: '160px' }}>{lecture.name}</Typography>}
                subheader={<FlexColumn sx={{ alignItems: 'flex-start' }}>
                    <TabInfo i={2} count={getFullDate(lecture.dateStart || lecture.createdAt)} icon={<MdDateRange size='1rem' />} />
                    <TabInfo count={grades.find(g => g.index === Number(lecture.grade))?.name} i={1} isBold={false} />

                    {lecture.index < currentUserIndex && (
                        <TabInfo i={1} count={'تم الانتهاء'} icon={<IoMdDoneAll size='1.5rem' />} />
                    )}

                </FlexColumn>}
            />
            {/* <CardMedia
                component="img"
                height="194"
                image="https://th.bing.com/th?id=OIP.xEW4lFt6NL-5vdigUqSG1AHaEK&w=333&h=187&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2"
                alt="Paella dish"
            /> */}
            <CardContent sx={{ p: '16px 16px 0 16px' }}>
                <InfoText label={'الوصف'} description={lecture.description} />
                <FlexRow sx={{ alignItems: 'flex-start', gap: '12px', mt: '12px' }}>
                    {lecture.video?.duration && (
                        <TabInfo count={formatDuration(lecture.video?.duration)} i={0} title={'الوقت'} icon={<FaClock size={'1.1rem'} />} />
                    )}

                    {lecture.exam && (
                        <>
                            <TabInfo count={lecture.exam?.time} i={0} title={'الوقت'} isBold={false} icon={<FaClock size={'1.1rem'} />} />
                            <TabInfo count={lecture.exam?.questions?.length || lecture.exam?.questionsLength} i={1} title={'عدد الاسئله'} isBold={false} icon={<BsFillQuestionSquareFill size={'1.1rem'} />} />
                            <TabInfo count={lecture.exam?.attemptsNums} i={3} title={'عدد المحاولات'} isBold={false} icon={<AttemptsIcon size={'1.5rem'} />} />
                            {/* {lecture.dateStart && (
                                <TabInfo count={getDateWithTime(lecture.dateStart)} i={0} title={'موعد البدايه'} isBold={false} icon={<FaClock size={'1.1rem'} />} />
                            )} */}
                        </>
                    )}
                    {lecture.children?.length && (<>
                        <Button size='small' onClick={() => setOpenAssets(!openAssets)} endIcon={<MdArrowDownward />}>عرض الملحقات</Button>
                        <Collapse in={openAssets} sx={{ width: '100%' }}>
                            <FlexRow sx={{ flexDirection: 'column', gap: '6px', width: '100%' }}>
                                {lecture.children.map(asset => {
                                    return <DataWith3Items
                                        // action={<LectureAssetBtn notAppear={!isSubscribed} locked={lecture.locked} asset={asset} />}
                                        key={asset._id} desc={asset.description} title={asset.name} icon={<SectionIcon lecture={asset} color='inherit' />} />

                                })}
                            </FlexRow>
                        </Collapse>
                    </>)}
                </FlexRow>

            </CardContent>

            <CardActions disableSpacing>
                <LectureUserCardBtn paidStatus={paidStatus}
                    currentLectureIndex={currentLectureIndex} currentUserIndex={currentUserIndex}
                    isSubscribed={isSubscribed} user={user} lecture={lecture} subscribe={subscribe}
                />
            </CardActions>

            {(isSubscribed && lecture?.locked) && ( //(!isSubscribed || lecture?.locked)
                <Box sx={{ width: '100%', height: '100%', bgcolor: alpha('#000', .6), position: 'absolute', top: 0, }}>
                    <FlexColumn height={'100%'} gap={'10px'}>
                        <Avatar sx={{ width: '4rem', height: '4rem', bgcolor: red[500], color: 'grey.0' }}>
                            <FaLock size={'2rem'} />
                        </Avatar>
                        <FlexColumn sx={{ color: 'grey.1000', bgcolor: 'grey.0', p: '8px 12px', borderRadius: '12px', minWidth: '150px' }}>
                            <Typography variant='body2'>عليك اكمال المحاضرات السابقه</Typography>
                        </FlexColumn>
                    </FlexColumn>
                </Box>
            )}
        </Card >
    )
}

export default LectureUserCard
