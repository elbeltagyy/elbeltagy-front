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
import { IoMdInfinite } from 'react-icons/io'


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
    const QuestionsNumsIcon = <svg xmlns="http://www.w3.org/2000/svg" width={'1.1rem'} height={'1.1rem'} viewBox="0 0 16 16">
        <path fill="currentColor" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m5-1.5h2a.5.5 0 0 1 .5-.5h.646a.382.382 0 0 1 .17.724L7 7.382V9h2v-.382l.211-.106A2.382 2.382 0 0 0 8.146 4H7.5A2.5 2.5 0 0 0 5 6.5M8 12a1 1 0 1 0 0-2a1 1 0 0 0 0 2"></path>
    </svg>
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
                        <TabInfo count={exam.isTime ? exam?.time : <IoMdInfinite size={'1.1rem'} />} i={0} title={'الوقت'} isBold={false} icon={<FaClock size={'1.1rem'} />} />
                        <TabInfo count={examPoints + ' ' + 'درجه'} i={0} title={'درجه الاختبار'} isBold={false} icon={<svg xmlns="http://www.w3.org/2000/svg" width={'1.1rem'} height={'1.1rem'} viewBox="0 0 72 72">
                            <path fill="#b1cc33" d="m61.5 23.3l-8.013-8.013l-25.71 25.71l-9.26-9.26l-8.013 8.013l17.42 17.44z"></path>
                            <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={2} d="M10.5 39.76L27.92 57.2L61.5 23.31l-8.013-8.013l-25.71 25.71l-9.26-9.26z"></path>
                        </svg>} />
                        <TabInfo count={exam?.questions.length} i={1} title={'عدد الاسئله'} isBold={false} icon={QuestionsNumsIcon} />
                        <TabInfo count={exam?.attemptsNums} i={3} title={'عدد المحاولات'} isBold={false} icon={<svg xmlns="http://www.w3.org/2000/svg" width={'1.1rem'} height={'1.1rem'} viewBox="0 0 20 20">
                            <g fill="none">
                                <path fill="url(#SVGOtmFzmbG)" d="M14.5 4h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2zm0 4h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2zm0 4h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2z"></path>
                                <path fill="url(#SVGHdiTHbda)" d="M5 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
                                <path fill="url(#SVGOS6oodza)" fillOpacity={0.5} d="M5 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
                                <path fill="url(#SVGBabZsd5R)" d="M5.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"></path>
                                <path fill="url(#SVGu4tNWcEb)" d="M5 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
                                <path fill="url(#SVGdNEMAczi)" d="M5 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
                                <path fill="url(#SVGIf2FfceG)" d="M10 14.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0"></path>
                                <path fill="url(#SVGtB1jFe9z)" d="M5.5 16.38a.625.625 0 1 0 0 1.25a.625.625 0 0 0 0-1.25m0-4.877c-1.048 0-1.864.818-1.853 1.955a.5.5 0 0 0 1-.01c-.006-.579.36-.945.853-.945c.472 0 .853.392.853.95c0 .202-.07.315-.36.544l-.277.215C5.21 14.616 5 14.929 5 15.5a.5.5 0 0 0 .992.09l.011-.156c.017-.148.1-.254.346-.448l.277-.215c.513-.41.727-.732.727-1.318c0-1.104-.822-1.95-1.853-1.95"></path>
                                <defs>
                                    <linearGradient id="SVGOtmFzmbG" x1={14.5} x2={23.055} y1={-2.5} y2={17.79} gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#d373fc"></stop>
                                        <stop offset={1} stopColor="#2052cb"></stop>
                                    </linearGradient>
                                    <linearGradient id="SVGHdiTHbda" x1={1.5} x2={0.605} y1={2} y2={19.905} gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#e587f2"></stop>
                                        <stop offset={1} stopColor="#816cde"></stop>
                                    </linearGradient>
                                    <linearGradient id="SVGBabZsd5R" x1={6.5} x2={11.248} y1={5} y2={10.123} gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#fdd3ff"></stop>
                                        <stop offset={1} stopColor="#f3d8ff"></stop>
                                    </linearGradient>
                                    <linearGradient id="SVGIf2FfceG" x1={1} x2={10} y1={10} y2={19} gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#0094f0"></stop>
                                        <stop offset={1} stopColor="#2052cb"></stop>
                                    </linearGradient>
                                    <linearGradient id="SVGtB1jFe9z" x1={3.971} x2={5.588} y1={11.611} y2={17.92} gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#fdfdfd"></stop>
                                        <stop offset={1} stopColor="#cceaff"></stop>
                                    </linearGradient>
                                    <radialGradient id="SVGOS6oodza" cx={0} cy={0} r={1} gradientTransform="rotate(75.378 3.603 6.001)scale(18.3207 81.0671)" gradientUnits="userSpaceOnUse">
                                        <stop offset={0.5} stopColor="#dd3ce2" stopOpacity={0}></stop>
                                        <stop offset={1} stopColor="#dd3ce2"></stop>
                                    </radialGradient>
                                    <radialGradient id="SVGu4tNWcEb" cx={0} cy={0} r={1} gradientTransform="matrix(11.93749 5.1875 -2.46238 5.66644 7 13.75)" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#dc8afd"></stop>
                                        <stop offset={1} stopColor="#dc8afd" stopOpacity={0}></stop>
                                    </radialGradient>
                                    <radialGradient id="SVGdNEMAczi" cx={0} cy={0} r={1} gradientTransform="matrix(4.8125 .0625 -.05642 4.34461 6.5 15.563)" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#2052cb"></stop>
                                        <stop offset={1} stopColor="#2052cb" stopOpacity={0}></stop>
                                    </radialGradient>
                                </defs>
                            </g>
                        </svg>} />
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
                <Grid sx={{ width: '100%', maxWidth: '250px' }}>
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
