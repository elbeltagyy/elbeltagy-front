import React, { useEffect, useState } from 'react'

import { Box, Button, Chip, Typography } from '@mui/material'
import { RtArrow } from '../header/Icons'
import { Link, useNavigate } from 'react-router-dom'

import { CoursesIcon, ExamIcon, FilesIcon, VidsIcon2 } from '../ui/svg/ContentSvgs'
import { FaArrowRight } from "react-icons/fa";
import { AiFillPoundCircle } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";


import { FlexBetween, FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import Separator from '../ui/Separator'
import CardStyled from '../../style/mui/styled/CardStyled'
import TabInfo from '../ui/TabInfo'
import RowInfo from '../ui/RowInfo'
import { dateOptions, getFullDate } from '../../settings/constants/dateConstants'
import { useLazyGetLecturesCountQuery } from '../../toolkit/apis/statisticsApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import { FilledHoverBtn, OutLinedHoverBtn } from '../../style/buttonsStyles'
import { lang } from '../../settings/constants/arlang'
import sectionConstants from '../../settings/constants/sectionConstants'

import { RiFolderUnknowFill } from "react-icons/ri";
import { IoIosRadio } from "react-icons/io";
import { deepOrange, orange, pink } from '@mui/material/colors'
import dayjs from 'dayjs'

function UnitCourseDetails({ course, subscribedAt, lastLectureAt = false, currentIndex = false }) {
    const navigate = useNavigate()
    // const { user } = useSelector(s => s.global)


    const [getData] = useLazyGetLecturesCountQuery()
    const [getLecturesCount] = useLazyGetData(getData)

    const [lecturesCounts, setLecturesCounts] = useState('loading ..')//{videos, files, quizes}
    useEffect(() => {

        const trigger = async () => {
            // const { count } = await getLecturesCount({ course: course._id })
            const [{ count: videos }, { count: files }, { count: exams }] = await Promise.all([
                await getLecturesCount({ course: course._id, sectionType: sectionConstants.VIDEO }),
                await getLecturesCount({ course: course._id, sectionType: sectionConstants.FILE }),
                await getLecturesCount({ course: course._id, sectionType: sectionConstants.EXAM })
            ])
            setLecturesCounts({ videos, files, exams })
        }

        if (course) {
            trigger()
        }
    }, [course])


    if (!course) return <>loading ...!</>
    const isCourseDisabled = () => {

        let isDisabled = false
        if (course.dateStart && dayjs(dayjs()).isBefore(course.dateStart)) {
            isDisabled = true
        }
        return isDisabled
    }

    return (
        <CardStyled img={course?.thumbnail?.url} title={<Button startIcon={<RtArrow size='1.5rem' />} disabled={isCourseDisabled()} endIcon={<CoursesIcon size='1.5rem' />} sx={{ color: 'primary.main' }}
            component={Link} to={"/grades/" + course.grade + "/courses/" + course.index}
        >

            {/* course Name */}
            <FlexRow>
                <Typography variant='h6' color={'neutral.0'}> {course.name}</Typography>
            </FlexRow>

        </Button>}
            // btn2={!subscribedAt && (<OutLinedHoverBtn sx={{ width: '100%' }} endIcon={<MdOutlinePayment />} >subsrcibe</OutLinedHoverBtn>)}
            btn1={
                <FilledHoverBtn sx={{ width: '100%' }} disabled={isCourseDisabled()} component={Link} to={"/grades/" + course.grade + "/courses/" + course.index} endIcon={< FaArrowRight />} > الذهاب للكورس  </FilledHoverBtn >
            }>

            <FlexColumn sx={{ flex: 1, gap: '16px' }}>

                <FlexBetween gap={'12px'} mt={'16px'} flex={'1'}>
                    <TabInfo count={lecturesCounts?.videos} i={'1'} title={lang.LECTURES} icon={<VidsIcon2 size='1.5rem' />} />
                    <TabInfo count={lecturesCounts.files} i={'2'} title={lang.FILES} icon={<FilesIcon size={'1.5rem'} />} />
                    <TabInfo count={lecturesCounts.exams} i={'3'} title={lang.EXAMS} icon={<ExamIcon size='1.5rem' />} />
                    <TabInfo count={getFullDate(course.createdAt)} i={'1'} title={'تاريخ انشاء الكورس'} icon={<MdDateRange size='1.3rem' />} isBold={false} />
                    {subscribedAt && (
                        <TabInfo count={getFullDate(subscribedAt)} i={'2'} title={'تاريخ الاشتراك بالكورس'} icon={<MdDateRange size='1.3rem' />} isBold={false} />
                    )}
                    {lastLectureAt && (
                        <TabInfo count={getFullDate(lastLectureAt)} i={'2'} title={'تاريخ اخر محاضره تم انهاءها'} icon={<MdDateRange size='1.3rem' />} isBold={false} />
                    )}
                    {currentIndex && (
                        <TabInfo count={currentIndex} i={'0'} title={"المحاضره الحاليه"} icon={<RiFolderUnknowFill size='1.3rem' />} isBold={false} />
                    )}
                    {isCourseDisabled() && (
                        <TabInfo count={getFullDate(course.dateStart)} i={'0'} title={"موعد بدايه الكورس"} icon={<RiFolderUnknowFill size='1.3rem' />} isBold={false} />
                    )}
                    {course.dateEnd && (
                        <TabInfo count={getFullDate(course.dateEnd)} i={2} title={"موعد نهايه الكورس"} icon={<RiFolderUnknowFill size='1.3rem' />} isBold={false} />
                    )}
                    {course.price === 0 && (
                        <Chip label="كورس مجانى" size='small' variant="contained" sx={{ bgcolor: orange[800], color: 'white' }} icon={<IoIosRadio size="1.3rem" color="#fff" />} />
                    )}
                </FlexBetween>
                {!subscribedAt && (
                    <Box flex={1}>

                        <RowInfo title={'سعر الكورس'} desc={<Typography variant='subtitle2' >{course.price} جنيها</Typography>} icon={<AiFillPoundCircle size='1rem' />} bgcolor='primary.500' />

                        {(course.preDiscount !== 0 && course.preDiscount > course.price) && (
                            <>
                                <Separator sx={{ width: '100px', borderWidth: '2px', mr: 'auto' }} />
                                <TabInfo title={lang.PRE_DISCOUNT} count={course.preDiscount + ' $'} icon={<AiFillPoundCircle size={'1.5rem'} />} i={0} sx={{ mr: 'auto' }} />
                            </>
                        )}
                    </Box>
                )}

            </FlexColumn>
        </CardStyled >
    )
}

//sx={{textDecorationLine: 'line-through', color: 'red'}}
// lectures, exams, files
export default UnitCourseDetails
