import { useEffect, useState } from 'react'
import Section from '../../style/mui/styled/Section'
import { useLocation, useParams } from 'react-router-dom'

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

const arrangeQuestions = (questions, answers) => {
    // console.log(questions)
    const examQuestions = questions.map(q => ({ ...q, _id: q._id.toString() }));
    const answerIds = answers.map(a => a.question.toString());

    // Create a map for quick access
    const questionMap = Object.fromEntries(examQuestions.map(q => [q._id, q]));

    // First: questions in the same order as answers
    const sortedFromAnswers = answerIds.map(id => questionMap[id]).filter(Boolean);

    // Second: questions not in answers
    const remainingQuestions = examQuestions.filter(q => !answerIds.includes(q._id));

    // Merge both
    return [...sortedFromAnswers, ...remainingQuestions];
}

const modifyAndGetScore = (exam, answers) => {
    //arrange exam.questions = answers
    // const attempt = exam.attempt
    // const modifiedQuestions = exam.questions.map(question => {
    //     const itsAnswer = attempt.answers.find(a => a?.question === question._id)
    //     if (!itsAnswer) return question

    //     return { ...question, rtOptionId: itsAnswer?.rtOptionId, chosenOptionId: itsAnswer?.chosenOptionId, answer: itsAnswer }
    // })

    exam.questions = arrangeQuestions(exam.questions, answers)
    // console.log(exam, answers)
    // chosenOptionId = rtOptionId ==> + score, right
    const score = exam.questions.reduce((acc, q, i,) => {

        const AnsweredQuestion = answers.find(answer => answer.question === String(q._id))
        q.answer = AnsweredQuestion
        if (AnsweredQuestion?.chosenOptionId === "Not answered" || !AnsweredQuestion?.chosenOptionId) {

            q.isAnswered = false
            return acc
        }


        if (q.rtOptionId === AnsweredQuestion?.chosenOptionId) {

            q.isAnswered = true
            q.chosenOptionId = AnsweredQuestion.chosenOptionId

            return acc += q.points
        } else {

            q.isAnswered = true
            q.chosenOptionId = AnsweredQuestion.chosenOptionId

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

function AttemptPage({ attempt, isShowBack = true }) {

    const location = useLocation()
    const { attemptId } = useParams()
    const foundExam = location.state

    const [exam, setExam] = useState()

    const [getData] = useLazyGetOneAttemptQuery()
    const [getAttempts] = useLazyGetData(getData)

    const handelExam = (exam) => {
        // Optimal Schema ={...examInfo, attempt ={answers, info}, questions={rtOptionId}, assessment}
        const clonedExam = { ...exam }
        totalDegree(clonedExam)
        modifyAndGetScore(clonedExam, clonedExam?.attempt?.answers) //first change
        clonedExam.tokenTime = clonedExam?.attempt?.tokenTime

        setExam(clonedExam)
    }

    const setQuestion = (qId, newQ) => {
        setExam(prev => {
            prev.questions = prev.questions.map((question) => {
                if (question._id === qId) {
                    return { ...question, ...newQ }
                } else {
                    return question
                }
            })
            return prev
        })
    }

    useEffect(() => {
        const trigger = async () => {
            const res = await getAttempts({ id: attempt || attemptId }) //attempt and exam inside
            handelExam({ ...res.exam, attempt: res })
        }

        if (!foundExam) {
            trigger()
        } else {
            handelExam(foundExam)
        }
    }, [location])

    if (!exam) return <LoaderSkeleton />
    //1- have Exam ={..exam, questions: rtOptId, attempt: {answers}}
    //2- have Answers
    //3- arrange exam questions as answers in same manner
    //4- modify

    return (
        <Section>
            {/* <TitleWithDividers title={'حلك فى الاختبار'} /> */}
            <AttemptHeader exam={exam} />
            <AttemptCard exam={exam} setQuestion={setQuestion} isShowBack={isShowBack} />
        </Section>
    )
}

export default AttemptPage
