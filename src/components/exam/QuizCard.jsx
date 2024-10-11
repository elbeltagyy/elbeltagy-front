import { Box, Button, Card, CardActions, CardContent, Container, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import ShowQuestion from "./ShowQuestion";
import QuizPagination from "./QuizPagination";
import { buttonStyle, sendSuccess } from "../../style/buttonsStyles";

import { useSelector } from "react-redux";
import QuizHeader from "./QuizHeader";
import ModalStyled from "../../style/mui/styled/ModalStyled";
import Loader from "../../style/mui/loaders/Loader";
import { convertToMs } from "../../settings/constants/dateConstants";

export default function QuizCard({ exam, submit, isLoading }) {
    const theme = useTheme()
    const { user } = useSelector(s => s.global)

    const [time, setTime] = useState(exam.time || 15 * 60 * 1000)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    const [open, setOpen] = useState(false)
    const [modalMsg, setModalMsg] = useState("هناك اسئله لم يتم حلها, هل انت متاكد من الاستمرار ؟")

    const openModal = () => {
        changeModalMsg()
        setOpen(true)
    }
    const changeModalMsg = () => {
        const isAllAnswered = exam.questions.every(question => question.chosenOptionId)
        if (isAllAnswered) {
            setModalMsg("هل انت متاكد من ارسال البيانات ؟")
        } else {
            setModalMsg("هناك اسئله لم يتم حلها, هل انت متاكد من الاستمرار ؟")
        }
    }

    const sendData = () => {
        const chosenOptions = exam.questions.map(question => {

            if (question.chosenOptionId) {
                const { _id, chosenOptionId } = question
                return { questionId: _id, chosenOptionId }
            } else {
                const { _id } = question
                return { questionId: _id, chosenOptionId: null }
            }
        });

        setOpen(false)

        const attempt = {
            user: user._id,
            exam: exam._id,
            mark: "",
            tokenTime: convertToMs(exam.time) - time,
            chosenOptions
        }
        submit(attempt)
    }
    // chosen option => questionId: _id, chosenOptionId

    const disabledNext = exam.questions.length <= 0 || exam.questions.length === (currentQuestionIndex + 1) || isLoading ? true : false
    const disabledPre = exam.questions.length <= 0 || (currentQuestionIndex) === 0 || isLoading ? true : false

    return (
        <Box sx={{ display: "flex", alignItems: "center", mt: 6, justifyContent: "center", flexDirection: "column" }}>
            <QuizHeader exam={exam} submit={sendData} time={time} setTime={setTime} />

            <Card sx={{ bgcolor: theme.palette.background.alt, width: "100%" }} >

                <ShowQuestion index={currentQuestionIndex} currentQuestion={exam.questions[currentQuestionIndex]} isLoading={isLoading} />

                <CardActions sx={{ justifyContent: 'space-evenly' }}>
                    <Button sx={buttonStyle} disabled={disabledPre} onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
                        السؤال السابق
                    </Button>

                    {
                        !disabledNext ? (
                            <Button sx={buttonStyle} disabled={disabledNext} onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
                                السؤال التالى
                            </Button>
                        ) : (
                            <Button sx={sendSuccess} disabled={isLoading} onClick={openModal}>
                                {isLoading ? <Loader /> : "ارسال"}
                            </Button>
                        )
                    }

                </CardActions>

                <Box >
                    <QuizPagination examQuestions={exam.questions} count={exam.questions.length} index={currentQuestionIndex} setIndex={setCurrentQuestionIndex} isLoading={isLoading} />
                </Box>

                <ModalStyled title={modalMsg} desc={'هل انت متاكد من الاستمرار !'} action={sendData} open={open} setOpen={setOpen} />
            </Card>
        </Box>

    )
}
