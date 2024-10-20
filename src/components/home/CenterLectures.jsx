import React, { useEffect, useState } from 'react'
import AccordionStyled from '../../style/mui/styled/AccordionStyled'
import LoaderWithText from '../../style/mui/loaders/LoaderWithText'
import { Alert } from '@mui/material'
import Grid from '../../style/vanilla/Grid'
import { useLazyGetLecturesQuery } from '../../toolkit/apis/lecturesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import LectureUserCard from '../content/LectureUserCard'

function CenterLectures({ user }) {

    const [open, setOpen] = useState(false)

    const [lectures, setLectures] = useState([])
    const [getData, status] = useLazyGetLecturesQuery()
    const [getCenterLectures] = useLazyGetData(getData)

    useEffect(() => {
        const trigger = async () => {
            const res = await getCenterLectures({ grade: user.grade, isActive: true, isCenter: true, populate: 'video exam link' })
            setLectures(res.lectures)
        }
        if (open) { // && lectures here
            trigger()
        }
    }, [open])

    return (
        <AccordionStyled title={'محاضرات السنتر'} bgcolor="background.alt" expanded={open} setExpanded={setOpen}>
            {status.isLoading && (
                <LoaderWithText />
            )}
            {lectures?.length === 0 && status.isSuccess && (
                <Alert variant='filled' severity='warning'> لا يوجد محاضرات للسنتر حاليا...!</Alert>
            )}

            <Grid>
                {lectures.map((lecture, i) => {
                    return <LectureUserCard key={i} lecture={lecture} i={i} isSubscribed={true} /> //isSubscribed={}
                })}
            </Grid>
        </AccordionStyled>
    )
}

export default CenterLectures
