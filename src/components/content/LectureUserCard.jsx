import { alpha, Avatar, Box, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material'
import { green, red } from '@mui/material/colors'

import TabInfo from '../ui/TabInfo'
import { FilledHoverBtn, ScallyBtn } from '../../style/buttonsStyles'

import { FaClock } from "react-icons/fa";
import { MdDateRange } from 'react-icons/md'
import { FaLock } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";

import { formatDuration, getDateWithTime, getFullDate } from '../../settings/constants/dateConstants'
import { FlexBetween, FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'

import { Link, useNavigate } from 'react-router-dom'
import SectionIcon from './SectionIcon'
import { IoTimerSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import ModalStyled from '../../style/mui/styled/ModalStyled';
import { useState } from 'react';
import PaymentMethods from '../payment/PaymentMethods';
import statusConstants from '../../settings/constants/status';
import InfoText from '../ui/InfoText';
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { AttemptsIcon } from '../ui/svg/ContentSvgs';
import gradeConstants from '../../settings/constants/gradeConstants';

function LectureUserCard({ lecture, isSubscribed, currentUserIndex, currentLectureIndex }) {
    const navigate = useNavigate()
    const user = useSelector(s => s.global.user)
    const [open, setOpen] = useState(false)

    const [paidStatus, setIsPaid] = useState(lecture?.isPaid && statusConstants.PAID)
    const subscribe = (res) => {
        if (res.lecture) {
            setIsPaid(statusConstants.PAID)
        }
        if (res.invoice?.status === statusConstants.PENDING)
            setIsPaid(statusConstants.PENDING)
    }


    const goLogin = () => {
        if (!user) {
            navigate("/login", { state: true })
        } else {
            navigate('/lectures/' + lecture._id)
        }
    }

    const openModal = (e) => {
        e.preventDefault()
        setOpen(true)
        if (user) {
            navigate('/lectures/' + lecture._id)
        }
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
                    <TabInfo count={gradeConstants.find(g => g.index === Number(lecture.grade))?.name} i={1} isBold={false} />

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
                </FlexRow>

            </CardContent>

            <CardActions disableSpacing>
                <FilledHoverBtn sx={{ width: '100%', bgcolor: (lecture.index === currentUserIndex) ? 'orange' : 'primary.main' }}
                    endIcon={<SectionIcon lecture={lecture} color='inherit' />}
                    disabled={!isSubscribed || lecture?.isLocked || lecture.index === currentLectureIndex || false} onClick={() => {
                        navigate("lectures/" + lecture._id)
                    }}>
                    {lecture.index === currentLectureIndex ? 'المحاضره قيد التشغيل' : lecture.index === currentUserIndex ? "المحاضره التاليه" : lecture.index < currentUserIndex ? 'تم الانتهاء' : "ابدا الان"}
                </FilledHoverBtn>
            </CardActions>
            {/* (!isSubscribed || lecture?.isLocked) */}

            {(!isSubscribed || lecture?.locked) && (
                <Box sx={{ width: '100%', height: '100%', bgcolor: alpha('#000', .6), position: 'absolute', top: 0, }}>
                    <FlexColumn height={'100%'} gap={'10px'}>
                        <Avatar sx={{ width: '4rem', height: '4rem', bgcolor: (lecture.isFree || lecture.isPaid) ? green[500] : red[500], color: 'grey.0' }}>
                            {(lecture.isFree || lecture.isPaid) ? <IoTimerSharp size={'2rem'} /> : <FaLock size={'2rem'} />}
                        </Avatar>

                        {/* when Locked And Free Lecture */}
                        <FlexColumn sx={{ color: 'grey.1000', bgcolor: 'grey.0', p: '8px 12px', borderRadius: '12px', minWidth: '150px' }}>
                            {(lecture.isFree && !lecture.locked) ? (
                                <>
                                    <Typography variant='subtitl2'>
                                        محاضره مجانيه
                                    </Typography>
                                    <ScallyBtn onClick={openModal} component={Link} to={user ? '/lectures/' + lecture._id : '/login'} sx={{ minWidth: '100px' }}>
                                        فتح المحاضره
                                    </ScallyBtn>
                                </>
                            ) : (paidStatus === statusConstants.PENDING) ?
                                <Typography variant='subtitl1'>
                                    تم ارسال طلب دفع
                                </Typography> : (paidStatus === statusConstants.PAID) ? (
                                    <>
                                        <Typography variant='subtitle1'>
                                            تم الدفع
                                        </Typography>
                                        <ScallyBtn component={Link} to={user ? '/lectures/' + lecture._id : '/login'} sx={{ minWidth: '100px' }}>
                                            فتح المحاضره
                                        </ScallyBtn>
                                    </>
                                ) : (lecture.price && (lecture.isSalable ?? false) && !isSubscribed) ? (
                                    <>
                                        <Typography variant='subtitle1'>
                                            سعر المحاضره {lecture.price} جنيه
                                        </Typography>
                                        <ScallyBtn onClick={() => setOpen(true)} sx={{ minWidth: '100px' }}>
                                            شراء المحاضره
                                        </ScallyBtn>
                                    </>
                                ) : lecture.locked ? 'عليك اكمال المحاضرات السابقه' : 'اشترك الان'}
                        </FlexColumn>
                    </FlexColumn>
                </Box>
            )
            }

            {!user ? (
                <ModalStyled
                    action={goLogin}
                    open={open} setOpen={setOpen} title={'تسجيل الدخول اولا ؟'} desc={'الذهاب إلي صفحة تسجيل الدخول !'}
                />
            ) : (lecture.price && (lecture.isSalable ?? false) && !lecture.isPaid) ? (
                <PaymentMethods
                    title={'هل انت متاكد من شراء هذه المحاضره ؟'} subTitle={'الاشتراك فى المحاضره ' + lecture.name}
                    handelResponse={subscribe}
                    // coupon={course?.coupon} setCoupon={setCoupon}
                    price={lecture.price}
                    lecture={lecture?._id}
                    invoiceNameId={'lecture'}
                    open={open} setOpen={setOpen}
                    note={'اذا تم شراء هذه المحاضره لن تكون قادرا على استرجاع المبلغ المدفوع حتى لو اشتركت بالكورس نفسه'}
                />
            ) : ''}
        </Card >
    )
}

export default LectureUserCard
