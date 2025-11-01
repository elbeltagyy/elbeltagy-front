import { Box, Button, Chip, Typography } from '@mui/material'
import { RtArrow } from '../header/Icons'
import { Link } from 'react-router-dom'

import { CoursesIcon, } from '../ui/svg/ContentSvgs'
import { FaArrowRight } from "react-icons/fa";
import { AiFillPoundCircle } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";


import { FlexBetween, FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import Separator from '../ui/Separator'
import CardStyled from '../../style/mui/styled/CardStyled'
import TabInfo from '../ui/TabInfo'
import RowInfo from '../ui/RowInfo'
import { getFullDate } from '../../settings/constants/dateConstants'

import { FilledHoverBtn } from '../../style/buttonsStyles'
import { lang } from '../../settings/constants/arlang'

import { RiFolderUnknowFill } from "react-icons/ri";
import { IoIosRadio } from "react-icons/io";
import { orange } from '@mui/material/colors'
import dayjs from 'dayjs'
import { MdGpsFixed } from "react-icons/md";
import InfoText from '../ui/InfoText';

function UnitCourseDetails({ course, subscribedAt, lastLectureAt = false, currentIndex = false }) {

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
                <>
                    <FilledHoverBtn sx={{ flexGrow: 1 }} disabled={isCourseDisabled()} component={Link} to={"/grades/" + course.grade + "/courses/" + course.index} endIcon={< FaArrowRight />} > الذهاب للكورس  </FilledHoverBtn >
                    <FlexColumn sx={{ width: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <TabInfo fontSize={'9px'} count={getFullDate(course.dateStart || course.createdAt)} i={'1'} title={'تاريخ انشاء الكورس'} icon={<MdDateRange size='.8rem' />} isBold={false} />
                        {subscribedAt && (
                            <TabInfo fontSize={'9px'} count={getFullDate(subscribedAt)} i={'2'} title={'تاريخ الاشتراك '} icon={<MdDateRange size='.8rem' />} isBold={false} />
                        )}
                        {course.dateEnd && (
                            <TabInfo count={getFullDate(course.dateEnd)} i={3} title={"موعد نهايه الكورس"} icon={<RiFolderUnknowFill size='1.3rem' />} isBold={false} />
                        )}
                    </FlexColumn>
                </>
            }>

            <FlexColumn sx={{ flex: 1, gap: '16px' }}>

                <FlexBetween gap={'12px'} flex={'1'} sx={{ width: '100%' }}>
                    <Box sx={{
                        '> *': {
                            color: 'neutral.0'
                        },
                        width: '100%'
                    }}>
                        <InfoText label={'الوصف'} description={<span dangerouslySetInnerHTML={{ __html: course?.description }} />} />
                    </Box>

                    {/* <TabInfo count={lecturesCounts?.videos} i={'1'} title={lang.LECTURES} icon={<VidsIcon2 size='1.5rem' />} />
                    <TabInfo count={lecturesCounts.files} i={'2'} title={lang.FILES} icon={<FilesIcon size={'1.5rem'} />} />
                    <TabInfo count={lecturesCounts.exams} i={'3'} title={lang.EXAMS} icon={<ExamIcon size='1.5rem' />} /> */}

                    {currentIndex && (
                        <TabInfo count={currentIndex} i={'0'} title={"المحاضره الحاليه"} icon={<RiFolderUnknowFill size='1.3rem' />} isBold={false} />
                    )}
                    {lastLectureAt && (
                        <TabInfo count={getFullDate(lastLectureAt)} i={'2'} title={'تاريخ اخر محاضره تم انهاءها'} icon={<MdDateRange size='1.3rem' />} isBold={false} />
                    )}

                    {/* {isCourseDisabled() && (
                        <TabInfo count={getFullDate(course.dateStart)} i={'0'} title={"موعد بدايه الكورس"} icon={<RiFolderUnknowFill size='1.3rem' />} isBold={false} />
                    )} */}

                    {(course.isFixed && !currentIndex) && (
                        <TabInfo sx={{ width: '100%' }} count={"كورس مثبت"} i={0} icon={<MdGpsFixed size='1.3rem' />} isBold={false} />

                    )}
                    {course.price === 0 && (
                        <FlexColumn sx={{ width: '100%' }}>
                            <Chip label="كورس مجانى !" size='small' variant="contained" sx={{ bgcolor: orange[800], backgroundImage: 'linear-gradient(to right,#f43f5e, #a855f7)', color: 'white' }} icon={<IoIosRadio size="1.3rem" color="#fff" />} />
                        </FlexColumn>
                    )}
                </FlexBetween>


                {!subscribedAt && (
                    <Box flex={1}>

                        <RowInfo title={'سعر الكورس'} desc={<Typography variant='subtitle2' >{course.price} جنيها</Typography>} icon={<AiFillPoundCircle size='1rem' />} bgcolor='primary.500' />

                        {(course.preDiscount !== 0 && course.preDiscount > course.price) && (
                            <>
                                <Separator sx={{ width: '100px', borderWidth: '2px', mr: 'auto' }} />
                                <TabInfo title={lang.PRE_DISCOUNT} count={course.preDiscount + " جنيه" + ' - ' + (((course.preDiscount - course.price) / course.preDiscount) * 100).toFixed(2) + "%"} icon={<AiFillPoundCircle size={'1.5rem'} />} i={0} sx={{ mr: 'auto' }} />
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
