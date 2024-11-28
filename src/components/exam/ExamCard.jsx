import { Button, Card, CardActions, CardContent, Divider, Typography, useTheme } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import TabInfo from '../ui/TabInfo'
import { FaClock } from 'react-icons/fa'
import { FcQuestions } from "react-icons/fc";
import { FaArrowRight } from "react-icons/fa6";
import ModalStyled from '../../style/mui/styled/ModalStyled'
import { useNavigate } from 'react-router-dom'
import Grid from '../../style/vanilla/Grid'
import DataWith3Items from '../ui/DataWith3Items'
import { formatDuration, getDateWithTime, getFullDate } from '../../settings/constants/dateConstants'
import dayjs from 'dayjs'
import { useLazyGetUserExamAttemptsCountQuery } from '../../toolkit/apis/statisticsApi'
import { useSelector } from 'react-redux'

function ExamCard({ exam, lecture }) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const user = useSelector(s => s.global.user)

    const [attemptsCount] = useLazyGetUserExamAttemptsCountQuery()

    const openExamModal = () => {
        setOpen(true)
    }

    const action = async () => {
        const userAttempts = await attemptsCount({ user: user?._id, exam: exam._id })

        if (userAttempts?.data?.values?.count >= exam.attemptsNums) {
            alert('لقد انتهت جميع محاولاتك, اعد تحميل الصفحه !')
            window.location.reload()
        } else {
            navigate('/exams/' + exam._id, { state: { ...exam } })
        }
    }

    const examPoints = useMemo(() => {
        const points = exam.questions.reduce((acc, question) => {
            acc += question.points
            return acc
        }, 0)

        return points
    }, [exam])
    const theme = useTheme()

    return (
        <FlexColumn gap={'16px'}>

            <Card sx={{ minWidth: 275, maxWidth: 300, m: "auto", bgcolor: 'background.default' }}>
                <CardContent>
                    <Divider sx={{ borderColor: 'primary.main', borderWidth: '2px', width: '60px', my: '16px', borderRadius: '16px' }} />
                    <Typography variant='h6' gutterBottom>
                        ابدا الاختبار
                    </Typography>
                    <Divider sx={{ borderColor: 'primary.main', borderWidth: '4px', width: '100%', my: '16px', borderRadius: '16px' }} />

                    <FlexColumn sx={{ alignItems: 'flex-start' }} gap={2}>
                        <TabInfo count={exam?.time} i={0} title={'الوقت'} isBold={false} icon={<FaClock size={'1.1rem'} />} />
                        <TabInfo count={examPoints + ' ' + 'درجه'} i={0} title={'درجه الاختبار'} isBold={false} icon={<FaClock size={'1.1rem'} />} />
                        <TabInfo count={exam?.questions.length} i={1} title={'عدد الاسئله'} isBold={false} icon={<FcQuestions size={'1.1rem'} />} />
                        <TabInfo count={exam?.attemptsNums} i={3} title={'عدد المحاولات'} isBold={false} icon={<FaClock size={'1.1rem'} />} />
                    </FlexColumn>


                </CardContent>
                <CardActions>
                    <Button disabled={exam.attemptsNums === exam.attempts.length || (dayjs().isAfter(dayjs(lecture.dateEnd))) || dayjs().isBefore(dayjs(lecture.dateStart))}
                        onClick={openExamModal} sx={{ width: '100%' }} startIcon={<FaArrowRight size={'1.5rem'} />}>
                        {exam.attemptsNums === exam.attempts.length ? ' انتهت محاولاتك'
                            : dayjs().isBefore(dayjs(lecture.dateStart)) ? "هيبدا يوم" + " " + getDateWithTime(lecture.dateStart)
                                : (dayjs().isAfter(dayjs(lecture.dateEnd))) ? 'انتهى الاختبار يوم ' + getDateWithTime(lecture.dateEnd)
                                    : "ابدا الاختبار"}
                    </Button>
                </CardActions>
                <ModalStyled title={'هل انت متاكد من بدا الاختبار ؟'} desc={'بمجرد البدء لا يمكنك العوده !'} open={open} setOpen={setOpen} action={action} />
            </Card>

            {exam?.attempts && (
                <Grid>
                    {exam.attempts.map((attempt, i) => {
                        const percentage = (attempt.mark / examPoints) * 100
                        const rating = percentage >= 85 ? "ممتاز" : percentage >= 75 ? "جيد" : percentage >= 65 ? "متوسط" : "سئ"
                        const ratingColor = percentage >= 85 ? 1 : percentage >= 75 ? 2 : percentage >= 65 ? 2 : 3

                        return <FlexColumn key={i} justifyContent={'flex-start'} gap={'12px'} sx={{ p: '12px 16px', borderRadius: '16px', bgcolor: theme.palette.primary.main + 20, }}>
                            <Typography variant='subtitle1'>المحاوله {i + 1} </Typography>
                            <FlexRow justifyContent={'center'} gap={'12px'}>
                                <TabInfo count={attempt.mark + '/' + examPoints} i={0} title={"الدرجه"} />
                                <TabInfo count={rating} i={ratingColor} title={"التقدير"} />
                                <TabInfo count={formatDuration(attempt.tokenTime)} i={2} title={"الوقت الماخوذ"} />
                                <TabInfo count={getFullDate(attempt.createdAt)} i={1} title={"تم فى"} />
                            </FlexRow>
                            <Button to={'/attempts/' + attempt._id} disabled={dayjs().isBefore(dayjs(lecture.exam?.showAnswersDate)) || !lecture.exam.isShowAnswers} onClick={() => navigate('/attempts/' + attempt._id, { state: { attempt, ...exam } })}>
                                {dayjs().isBefore(dayjs(lecture.exam.showAnswersDate)) ? "موعد عرض الايجابات فى " + getDateWithTime(lecture.exam.showAnswersDate) : 'عرض الايجابات'}
                            </Button>
                        </FlexColumn>
                    })}
                </Grid>
            )}
        </FlexColumn>
    )
}

export default ExamCard
