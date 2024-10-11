import React, { useEffect, useMemo, useState } from 'react'
import Section from '../../style/mui/styled/Section'
import { useLocation, useParams } from 'react-router-dom'
import QuizCard from '../../components/exam/QuizCard'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'
import AttemptHeader from '../../components/exam/AttemptHeader'
import AttemptCard from '../../components/exam/AttemptCard'
import { useLazyGetOneAttemptQuery } from '../../toolkit/apis/attemptsApi'
import useLazyGetData from '../../hooks/useLazyGetData'

const totalDegree = (exam) => {

    const total = exam.questions.reduce((acc, question) => {
        return acc += question.points || 1
    }, 0)

    exam.total = total
    return total
}

const modifyAndGetScore = (exam, chosenOptions) => {

    // chosenOptionId = rtOptionId ==> + score, right
    const score = exam?.questions.reduce((acc, question, i,) => {

        const AnsweredQuestion = chosenOptions.filter(({ questionId }) => questionId === question._id)[0]

        if (AnsweredQuestion?.chosenOptionId === "Not answered" || !AnsweredQuestion?.chosenOptionId) {

            question.isAnswered = false
            return acc
        }


        if (question.rtOptionId === AnsweredQuestion?.chosenOptionId) {

            question.isAnswered = true
            question.chosenOptionId = AnsweredQuestion.chosenOptionId

            return acc += question.points
        } else {

            question.isAnswered = true
            question.chosenOptionId = AnsweredQuestion.chosenOptionId

            return acc
        }
    }, 0)
    // != 


    const percentage = (score / exam.total) * 100
    const rating = percentage >= 85 ? "ممتاز" : percentage >= 75 ? "جيد" : percentage >= 65 ? "متوسط" : "سئ"
    const ratingColor = percentage >= 85 ? 1 : percentage >= 75 ? 2 : percentage >= 65 ? 2 : 3

    exam.assessment = { score, percentage, rating, total: exam.total, ratingColor }
    return score

}

function AttemptPage() {

    const location = useLocation()
    const { attemptId } = useParams()
    let foundExam = location.state

    let [exam, setExam] = useState()
    // console.log('exam ==>', exam)

    useEffect(() => {
        setExam(JSON.parse(JSON.stringify(foundExam)))
    }, [location])

    const [getData] = useLazyGetOneAttemptQuery()
    const [getAttempts] = useLazyGetData(getData)

    useEffect(() => {
        const trigger = async () => {
            const res = await getAttempts({ id: attemptId }) //attempt and exam inside
            setExam(JSON.parse(JSON.stringify({ ...res.exam, attempt: res })))
        }

        if (!foundExam) {
            trigger()
        }
    }, [location])


    if (!exam) return <LoaderSkeleton />

    totalDegree(exam)
    modifyAndGetScore(exam, exam?.attempt?.chosenOptions)
    exam.tokenTime = exam?.attempt.tokenTime


    return (
        <Section>
            {/* <TitleWithDividers title={'حلك فى الاختبار'} /> */}
            <AttemptHeader exam={exam} />
            <AttemptCard exam={exam} isAnsweres={true} />
        </Section>
    )
}

export default AttemptPage
