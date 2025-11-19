import { Component, useEffect, useMemo, useState } from 'react'
import LoaderWithText from '../../style/mui/loaders/LoaderWithText'
import { Alert, Box } from '@mui/material'
import Grid from '../../style/vanilla/Grid'
import { useLazyGetLecturesQuery } from '../../toolkit/apis/lecturesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import LectureUserCard from '../content/LectureUserCard'
import { TextBorderWithIcons } from '../ui/TextBorderAround'
import { FaSchool } from 'react-icons/fa6'
import gradeConstants from '../../settings/constants/gradeConstants'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import TabsStyled from '../../style/mui/styled/TabsStyled'

function UserLectures({ query, accordionTitle = 'محاضرات' }) {

    const [lectures, setLectures] = useState([])
    const [getData, status] = useLazyGetLecturesQuery()
    const [getUserLectures] = useLazyGetData(getData)
    const [grade, setGrade] = useState(query.grade)

    const isShowSameGrades = useMemo(() => {
        const grade = gradeConstants.find(g => g.index === query.grade)
        if (grade?.share) {
            return grade.share
        }
        return false
    }, [query])

    const sharedGrades = useMemo(() =>
        makeArrWithValueAndLabel(gradeConstants.filter(g => g.share), { value: 'index', label: 'name' }),
        [])

    useEffect(() => {
        const trigger = async () => {
            const res = await getUserLectures({ ...query, grade, populate: 'video exam link' }, false)
            setLectures(res.lectures)
        }
        trigger()
    }, [accordionTitle, grade])

    return (
        <FlexColumn sx={{ gap: '12px' }}>
            <TextBorderWithIcons title={accordionTitle} startIcon={<FaSchool size="30px" />} />
            {isShowSameGrades && (
                <TabsStyled tabs={sharedGrades} setValue={setGrade} value={grade} />
            )}
            {
                status.isLoading && (
                    <LoaderWithText />
                )
            }
            {
                lectures?.length === 0 && status.isSuccess && (
                    <Alert variant='filled' severity='warning'> لا يوجد محاضرات حاليا...!</Alert>
                )
            }

            <Grid>

                {lectures.map((lecture, i) => {
                    return <LectureUserCard key={i} lecture={lecture} i={i} isSubscribed={true} /> //isSubscribed={}
                })}
            </Grid>
        </FlexColumn>

        //     <AccordionStyled title={accordionTitle} bgcolor="background.alt" expanded={open} setExpanded={setOpen}>
        // </AccordionStyled>
    )
}

export default UserLectures
