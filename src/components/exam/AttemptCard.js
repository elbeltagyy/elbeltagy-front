import { Box, Button, Card, CardActions, useTheme } from '@mui/material'
import { useState } from 'react'
import { buttonStyle, FilledHoverBtn } from '../../style/buttonsStyles'
import QuizPagination from './QuizPagination'
import AnsweredQuestion from './AnsweredQuestion'
import { red } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'

export default function AttemptCard({ exam, setQuestion, isShowBack }) {
    const navigate = useNavigate()
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    const disabledNext = exam.questions.length <= 0 || exam.questions.length === (currentQuestionIndex + 1) ? true : false
    const disabledPre = exam.questions.length <= 0 || (currentQuestionIndex) === 0 ? true : false

    const theme = useTheme()

    return (
        <Card sx={{ bgcolor: theme.palette.background.alt, width: "100%" }} >

            <AnsweredQuestion setQuestion={setQuestion} currentQuestion={exam.questions[currentQuestionIndex]} index={currentQuestionIndex} />

            <CardActions sx={{ width: '100%', flexWrap: 'wrap',justifyContent: 'space-evenly' }}>
                <Button sx={buttonStyle} disabled={disabledPre} onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
                    السؤال السابق
                </Button>
                <Button sx={buttonStyle} disabled={disabledNext} onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
                    السؤال التالى
                </Button>

                {isShowBack && (
                    <FilledHoverBtn onClick={() => navigate(-1, { state: { refetch: true }, replace: true })} colorm={red[500]} sx={{ m: '0 0 0 auto !important' }}>
                        الرجوع
                    </FilledHoverBtn>
                )}
            </CardActions>

            <Box >
                <QuizPagination questions={exam.questions} index={currentQuestionIndex} setIndex={setCurrentQuestionIndex} isShowError={true} />
            </Box>
        </Card>
    )
}
