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

function ExamStartPage() {

    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(s => s.global)

    const [sendData, { isLoading }] = useAddAttemptMutation()
    const [addAttempt] = usePostData(sendData)

    // console.log('exam ==>', exam)
    let exam = useMemo(() => JSON.parse(JSON.stringify(state)), [location])

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
            [array[i], array[j]] = [array[j], array[i]];  // Swap elements
        }
        return array;
    }


    const submit = async (attempt) => {
        //sendData 
        const res = await addAttempt(attempt)
        dispatch(setUser({ ...user, totalPoints: res }))
        navigate(-1)
        
        setTimeout(() => {
            window.location.reload(); // Force reload the page
        }, 200);
    }

    if (!state || !exam) return <LoaderSkeleton />
    exam.questions = shuffleArray(exam.questions)
    exam.questions.forEach(q => {
        q.options = shuffleArray(q.options)
    })
    return (
        <Section>
            <QuizCard exam={exam} submit={submit} isLoading={isLoading} />
        </Section>
    )
}

export default ExamStartPage
