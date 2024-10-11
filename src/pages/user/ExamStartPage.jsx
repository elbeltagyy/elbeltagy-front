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

    const submit = async (attempt) => {
        //sendData 
        const res = await addAttempt(attempt)
        dispatch(setUser({ ...user, totalPoints: res }))
        navigate(-1)
    }

    if (!state || !exam) return <LoaderSkeleton />

    return (
        <Section>
            <QuizCard exam={exam} submit={submit} isLoading={isLoading} />
        </Section>
    )
}

export default ExamStartPage
