import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAddAttemptMutation, useLazyGetExamQuery } from '../../toolkit/apis/coursesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'
import usePostData from '../../hooks/usePostData'
import QuizCard from '../../components/exam/QuizCard'
import Section from '../../style/mui/styled/Section'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../toolkit/globalSlice'
import { useMarkAttemptMutation } from '../../toolkit/apis/answersApi'
import { convertToMs } from '../../settings/constants/dateConstants'

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
    return array;
}

const handelQuestions = (exam) => {
    const attempt = exam.attempt

    if (!attempt) {
        exam.questions = shuffleArray(exam.questions)
        return exam
    }
    const tokenTime = new Date().getTime() - new Date(attempt.createdAt).getTime()
    const time = exam.time ? convertToMs(exam.time) - tokenTime : 0
    exam.time = time
    // exam.time = 10 * 1000

    const questionMap = new Map(exam.questions.map(q => [q._id.toString(), q]));
    const answeredQuestions = attempt.answers
        .map(ans => questionMap.get(ans.question))
        .filter(Boolean); // remove any that weren’t found

    // 2. Get the rest (questions not in answers)
    const answeredIds = new Set(answeredQuestions.map(q => q._id.toString()));
    const remainingQuestions = exam.questions.filter(q => !answeredIds.has(q._id.toString()));

    // 3. Merge them
    const orderedQuestions = [...answeredQuestions, ...remainingQuestions];
    const modifiedQuestions = orderedQuestions.map(question => {
        const itsAnswer = attempt.answers.find(a => a?.question === question._id)
        if (!itsAnswer) return question

        return { ...question, rtOptionId: itsAnswer?.rtOptionId, chosenOptionId: itsAnswer?.chosenOptionId, answer: itsAnswer }
    })
    exam.questions = modifiedQuestions
    return exam
}

function ExamStartPage() {

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const state = location.state
    const { user } = useSelector(s => s.global)

    const [sendData, { isLoading }] = useMarkAttemptMutation()
    const [addAttempt] = usePostData(sendData)

    let exam = useMemo(() => {
        let handledExam = null
        if (state) {
            handledExam = handelQuestions(JSON.parse(JSON.stringify(state)))
        } else {
            handledExam = null
        }
        return handledExam
    }, [location])

    const navigateToAnswers = (id = null, markedExam) => {
        const idUrl = id || 'bank'
        navigate('/attempts/' + idUrl, {
            state: markedExam, replace: true,
        })

    }

    const editUser = (updatedUser) => {
        dispatch(setUser({ ...user, ...updatedUser }))
    }

    const submit = async (attempt) => {
        const resAttempt = await addAttempt(attempt)

        const questions = resAttempt.questions
        const createdAttempt = resAttempt.attempt

        //Handel navigate when Exam ==> isShowAnswers || showAnswersDate
        editUser(resAttempt.user)

        if ((exam._id && exam.isShowAnswers) || !exam._id) {
            navigateToAnswers(resAttempt.attempt._id, { ...exam, questions, attempt: createdAttempt })
        } else {
            navigate(-1, { replace: true })
        }
    }

    if (!state || !exam) return <LoaderSkeleton />


    // for changing options indexes
    // exam.questions.forEach(q => {
    //     q.options = shuffleArray(q.options)
    // })
    return (
        <Section>
            <QuizCard exam={exam} isLoading={isLoading} submit={submit} editUser={editUser} navigateToAnswers={navigateToAnswers} />
        </Section>
    )
}

export default ExamStartPage
