import { Button, Card, CardActions, CardContent, Divider, Typography, useTheme } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import TabInfo from '../ui/TabInfo'
import { FaClock } from 'react-icons/fa'
import { FcQuestions } from "react-icons/fc";
import { FaArrowRight } from "react-icons/fa6";
import ModalStyled from '../../style/mui/styled/ModalStyled'
import { Link, useNavigate } from 'react-router-dom'
import Grid from '../../style/vanilla/Grid'

import { convertToMs, formatDuration, getDateWithTime, getFullDate } from '../../settings/constants/dateConstants'
import dayjs from 'dayjs'
import { useLazyGetUserExamAttemptsCountQuery } from '../../toolkit/apis/statisticsApi'
import { useSelector } from 'react-redux'
import { getExamMethod } from '../../settings/constants/examMethods'
import { useStartExamMutation } from '../../toolkit/apis/attemptsApi'
import usePostData from '../../hooks/usePostData'
import Loader from '../../style/mui/loaders/Loader'


function markIncompleteAttempts(attempts, exam) {
    const questions = exam.questions
    const examTime = convertToMs(exam.time) // need to modyf

    const questionIds = questions.map(q => q._id.toString());

    let hasToFinishAttempts = false
    if (attempts.length < 1) return [hasToFinishAttempts]

    const modified = attempts.map(attempt => {
        const answeredIds = new Set(attempt.answers.map(ans => ans.question.toString()));
        const isCompleted = questionIds.every(id => answeredIds.has(id));

        //start time = attempt.createdAt + examTime > now
        //dayjs().isBefore(dayjs(attempt.createdAt + examTime))
        // const examTime = 10 * 60 * 1000; // 30 minutes

        if (!(exam.isTime ?? true)) {
            return { ...attempt, hasToFinishAttempts: !isCompleted };
        }

        const attemptEndAt = new Date(new Date(attempt.createdAt).getTime() + examTime); //true
        // const attemptEndAt = new Date(new Date(attempt.createdAt).getTime() - examTime);
        const restTime = attemptEndAt - new Date()
        const isFinishedTime = dayjs().isAfter(dayjs(attemptEndAt))

        if (!isCompleted) {
            hasToFinishAttempts = true

            if (isFinishedTime) {
                hasToFinishAttempts = false
            }

            return { ...attempt, hasToFinishAttempts, isFinishedTime, endAt: attemptEndAt, restTime };
        }

        return attempt;
    });

    return [hasToFinishAttempts, modified]
}


function ExamCard({ exam, lecture }) {
    //do not use Lecture
    //exam.courseId if from course

    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const user = useSelector(s => s.global.user)

    const [sendData, status] = useStartExamMutation()
    const [startExam] = usePostData(sendData)

    const [attempts, setAttempts] = useState()
    const [hasToFinishAttempts, setHasToFinishAttempts] = useState(false)

    const openExamModal = () => {
        setOpen(true)
    }

    const action = async () => {
        const res = await startExam({ user: user?._id, exam: exam._id, courseId: exam.courseId }) // *_*
        const state = res.attempt ? { ...exam, attempt: res.attempt } : exam
        navigate('/exams/' + exam._id, { state })
    }

    const examPoints = useMemo(() => {
        const points = exam.questions.reduce((acc, question) => {
            acc += question.points
            return acc
        }, 0)

        return points
    }, [exam])
    const theme = useTheme()

    useEffect(() => {
        checkIfAllAttemptsCompleted()
    }, [exam, lecture])

    //to continue attempt => question based || time || !allAnswered
    const checkIfAllAttemptsCompleted = () => {
        if (exam.method === getExamMethod({ methodValue: 'question', key: 'value' })) {
            const [hasToFinishAttempts, modified] = markIncompleteAttempts(exam.attempts, exam)

            setAttempts(modified)
            setHasToFinishAttempts(hasToFinishAttempts)
        } else {
            setAttempts(exam.attempts)
            setHasToFinishAttempts(false)
        }
    }

    return (
        <FlexColumn gap={'16px'}>

            <Card sx={{ minWidth: 275, maxWidth: 300, m: "auto", bgcolor: 'background.default' }}>
                <CardContent>
                    <Divider sx={{ borderColor: 'primary.main', borderWidth: '2px', width: '60px', my: '16px', borderRadius: '16px' }} />
                    <Typography variant='h6' gutterBottom>
                        {lecture.name}
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
                    <Button
                        disabled={exam.attemptsNums === exam.attempts.length
                            || (dayjs().isAfter(dayjs(lecture.dateEnd)))
                            || dayjs().isBefore(dayjs(lecture.dateStart))
                            || hasToFinishAttempts || status.isLoading
                        }
                        onClick={openExamModal} sx={{ width: '100%' }} startIcon={<FaArrowRight size={'1.5rem'} />}>

                        {status.isLoading ? <Loader /> : exam.attemptsNums === exam.attempts.length ? ' انتهت محاولاتك'
                            : dayjs().isBefore(dayjs(lecture.dateStart)) ? "هيبدا يوم" + " " + getDateWithTime(lecture.dateStart)
                                : (dayjs().isAfter(dayjs(lecture.dateEnd))) ? 'انتهى الاختبار يوم ' + getDateWithTime(lecture.dateEnd)
                                    : hasToFinishAttempts ? 'عليك اكمال المحاولات السابقه' : "ابدا الاختبار"}
                    </Button>
                </CardActions>
                <ModalStyled title={'هل انت متاكد من بدا الاختبار ؟'} desc={exam.method === getExamMethod({ methodValue: "question", key: 'value' }) ? "اذا انتهى الوقت, لن تستطيع اكمال الاسئله التى لم يتم حلها !" : 'بمجرد البدء لا يمكنك العوده !'} open={open} setOpen={setOpen} action={action} />
            </Card>

            {attempts && (
                <Grid min='200px' sx={{ width: '100%' }}>
                    {attempts.map((attempt, i) => {

                        const percentage = (attempt.mark / examPoints) * 100
                        const rating = percentage >= 85 ? "ممتاز" : percentage >= 75 ? "جيد" : percentage >= 65 ? "متوسط" : "سئ"
                        const ratingColor = percentage >= 85 ? 1 : percentage >= 75 ? 2 : percentage >= 65 ? 2 : 3

                        return <FlexColumn key={i} justifyContent={'flex-start'} gap={'12px'} sx={{ p: '12px 16px', borderRadius: '16px', bgcolor: theme.palette.primary.main + 20, }}>

                            <Typography variant='subtitle1'>المحاوله {i + 1} </Typography>
                            <FlexRow justifyContent={'center'} gap={'12px'}>

                                {attempt.hasToFinishAttempts ? (
                                    <>
                                        <TabInfo count={attempt.answers.length} i={1} title={"الاسئله المجابه"} isBold={true} />
                                        <TabInfo count={exam.questions.length - attempt.answers.length} i={3} title={"الاسئله المتبقيه"} />
                                        {(exam.isTime ?? true) ? (
                                            <>
                                                <TabInfo count={getDateWithTime(attempt.endAt)} i={2} title={"ستنتهى المحاوله فى : "} />
                                                <TabInfo count={formatDuration(attempt.restTime)} i={2} title={" الوقت المتبقى : "} />
                                            </>
                                        ) : (
                                            <TabInfo count={'مفتوح'} i={2} title={"ستنتهى المحاوله فى : "} />
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <TabInfo count={(attempt.mark || 0) + '/' + examPoints} i={0} title={"الدرجه"} />
                                        <TabInfo count={rating} i={ratingColor} title={"التقدير"} />
                                        <TabInfo count={formatDuration(attempt.tokenTime)} i={2} title={"الوقت المتبقى"} />
                                        <TabInfo count={getFullDate(attempt.createdAt)} i={1} title={"تم فى"} />
                                    </>
                                )}
                            </FlexRow>
                            <Button
                                variant='contained'
                                color={attempt.hasToFinishAttempts ? 'warning' : 'primary'}
                                onClick={() => {
                                    if (attempt.hasToFinishAttempts) {
                                        navigate('/exams/' + exam._id, { state: { attempt, ...exam } })
                                    } else {
                                        navigate('/attempts/' + attempt._id) //, { state: { attempt, ...exam } }
                                    }
                                }}
                                disabled={dayjs().isBefore(dayjs(lecture.exam?.showAnswersDate)) || !lecture.exam.isShowAnswers}>

                                {attempt.hasToFinishAttempts ? 'اكمال الاختبار' : dayjs().isBefore(dayjs(lecture.exam.showAnswersDate)) ? "موعد عرض الايجابات فى " + getDateWithTime(lecture.exam.showAnswersDate) : 'عرض الايجابات'}
                            </Button>
                        </FlexColumn>
                    })}
                </Grid>
            )}
        </FlexColumn>
    )
}

export default ExamCard
