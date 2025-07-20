import { useEffect, useState } from 'react'
import AccordionStyled from '../../style/mui/styled/AccordionStyled'
import LoaderWithText from '../../style/mui/loaders/LoaderWithText'
import { Alert, Box } from '@mui/material'
import Grid from '../../style/vanilla/Grid'
import { useLazyGetLecturesQuery } from '../../toolkit/apis/lecturesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import LectureUserCard from '../content/LectureUserCard'
import TextBorderAround, { TextBorderWithIcons } from '../ui/TextBorderAround'
import { FaSchool } from 'react-icons/fa6'

function UserLectures({ query, accordionTitle = 'محاضرات' }) {

    const [open, setOpen] = useState(false)

    const [lectures, setLectures] = useState([])
    const [getData, status] = useLazyGetLecturesQuery()
    const [getUserLectures] = useLazyGetData(getData)

    useEffect(() => {
        const trigger = async () => {
            const res = await getUserLectures({ ...query, populate: 'video exam link' })
            setLectures(res.lectures)
        }
        trigger()
    }, [open, accordionTitle])

    return (
        <Box sx={{ my: '16px' }}>
            <TextBorderWithIcons title={accordionTitle} startIcon={<FaSchool size="30px" />} />
                
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
        </Box>

        //     <AccordionStyled title={accordionTitle} bgcolor="background.alt" expanded={open} setExpanded={setOpen}>
        // </AccordionStyled>
    )
}

export default UserLectures
