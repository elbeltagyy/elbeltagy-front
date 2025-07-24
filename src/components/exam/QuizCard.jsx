import { Box, Button, Card, CardActions, useTheme } from "@mui/material";
import { useState } from "react";
import ShowQuestion from "./ShowQuestion";
import QuizPagination from "./QuizPagination";
import { buttonError, buttonStyle, sendSuccess } from "../../style/buttonsStyles";

import { useSelector } from "react-redux";
import QuizHeader from "./QuizHeader";
import ModalStyled from "../../style/mui/styled/ModalStyled";
import Loader from "../../style/mui/loaders/Loader";
import { user_roles } from "../../settings/constants/roles";
import BankNavigateBtn from "./BankNavigateBtn";
import { convertToMs } from "../../settings/constants/dateConstants";
import { getExamMethod } from "../../settings/constants/examMethods";


export default function QuizCard({ exam, submit, isLoading, navigateToAnswers, editUser }) {
    const theme = useTheme()
    const { user } = useSelector(s => s.global)

    const [activeAttemptId, setActiveAttemptId] = useState(exam.attempt?._id)

    const [time, setTime] = useState(exam.time)//15 * 60 * 1000
    //when time = 0 => no longer will send ind q

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [questions, setQuestions] = useState(exam.questions)
    const currentQ = questions[currentQuestionIndex]

    const [open, setOpen] = useState(false)
    const [modalMsg, setModalMsg] = useState("هناك اسئله لم يتم حلها, هل انت متاكد من الاستمرار ؟")

    const openModal = () => {
        changeModalMsg()
        setOpen(true)
    }

    const changeModalMsg = () => {
        const isAllAnswered = questions.every(question => question.chosenOptionId)
        if (isAllAnswered) {
            setModalMsg("هل انت متاكد من ارسال البيانات ؟")
        } else {
            setModalMsg("هناك اسئله لم يتم حلها, هل انت متاكد من الاستمرار ؟")
        }
    }

    const sendData = () => {
        const answers = questions.map(question => {
            //Modify questions to have Only Answers
            return {
                question: question._id,
                chosenOptionId: question.chosenOptionId ?? null,
                // answer: question.answer || null
            }
        });

        setOpen(false)

        const attempt = {
            attemptId: activeAttemptId || null,
            user: user._id,
            exam: exam._id,
            answers
        }
        if (time && (exam.isTime ?? true)) {
            attempt.tokenTime = time // *_* modify it
        }

        if (exam?.courseId) {
            attempt.course = exam.courseId
        }

        if (user.role === user_roles.STUDENT) {
            attempt.role = user_roles.STUDENT
        }
        // console.log(attempt)
        submit(attempt)
    }
    // chosen option => questionId: _id, chosenOptionId

    const disabledNext = questions.length <= 0 || questions.length === (currentQuestionIndex + 1) || isLoading ? true : false
    const disabledPre = questions.length <= 0 || (currentQuestionIndex) === 0 || isLoading ? true : false

    //Fc for methods 
    const method = getExamMethod({ methodValue: exam.method })
    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <QuizHeader exam={exam} submit={sendData} time={time} setTime={setTime} />
            <Card sx={{ bgcolor: theme.palette.background.alt, width: "100%" }} >

                <ShowQuestion
                    activeAttemptId={activeAttemptId} setActiveAttemptId={setActiveAttemptId} examId={exam._id} tokenTime={time} course={exam.courseId}
                    index={currentQuestionIndex}
                    question={currentQ} isLoading={isLoading} setQuestions={setQuestions} method={method} editUser={editUser} />

                <CardActions sx={{ justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                    <Button sx={buttonStyle} disabled={disabledPre} onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
                        السؤال السابق
                    </Button>

                    {!disabledNext ? (
                        <Button sx={buttonStyle} disabled={disabledNext} onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
                            السؤال التالى
                        </Button>
                    ) : !method?.markQ ? (
                        <Button sx={sendSuccess} disabled={isLoading} onClick={openModal}>
                            {isLoading ? <Loader color={'#fff'} /> : "ارسال"}
                        </Button>
                    ) : <BankNavigateBtn exam={exam} navigateToAnswers={navigateToAnswers} questions={questions} submit={sendData} />}

                </CardActions>

                <Box >
                    <QuizPagination
                        questions={questions}
                        count={questions.length}
                        index={currentQuestionIndex}
                        setIndex={setCurrentQuestionIndex} isLoading={isLoading} isShowError={false} />
                </Box>

                <ModalStyled title={modalMsg} desc={'هل انت متاكد من الاستمرار !'} action={sendData} open={open} setOpen={setOpen} />
            </Card>
        </Box>

    )
}
