import { useEffect, useState, } from 'react'
import { useLazyGetLectureAndCheckQuery, usePassLectureMutation } from '../../toolkit/apis/coursesApi'
import { useOutletContext, useParams } from 'react-router-dom'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import { OutLinedHoverBtn } from '../../style/buttonsStyles'
import usePostData from '../../hooks/usePostData'
import WrapperHandler from '../../tools/WrapperHandler'
import sectionConstants from '../../settings/constants/sectionConstants'
import LectureBody from '../../components/grades/LectureBody'
import dayjs from 'dayjs'
import useLazyGetData from '../../hooks/useLazyGetData'
import { Typography } from '@mui/material'

import LectureAssets from '../../components/content/LectureAssets'
import useCurrentAsset from '../../hooks/useCurrentLecture'

function LecturePage() {

    const params = useParams()

    const [lectureIndex, setCurrentIndex, currentIndex, course] = useOutletContext();
    const [lecture, setLecture] = useState()
    //Function fetches Lecture
    const [getData, getStatus] = useLazyGetLectureAndCheckQuery()
    const [getLecture] = useLazyGetData(getData)


    const [sendData, status] = usePassLectureMutation()
    const [passLecture] = usePostData(sendData)

    useEffect(() => {
        const trigger = async () => {
            const lecture = await getLecture({
                index: params.courseId, lectureId: params.lectureId
            })
            setLecture(lecture)
        }
        trigger()
        status.reset()
    }, [lectureIndex, params.lectureId])

    const currentLecture = useCurrentAsset(lecture)

    if (getStatus.isLoading || getStatus.isFetching || getStatus.isError || !lecture?._id) return <LoaderSkeleton />

    // console.log(lecture)
    const passed = async () => {
        const nextLectureIndex = lectureIndex + 1
        await passLecture({ courseId: course, lectureId: lecture._id, nextLectureIndex }) //linked to
        setCurrentIndex(nextLectureIndex)
    }

    return (
        <FlexColumn sx={{ minHeight: '90vh', backgroundColor: 'background.alt', borderRadius: '16px', p: '12px', width: '100%' }}>

            {lecture && (
                <LectureBody lecture={currentLecture} lectureIndex={lectureIndex} courseId={course} />
            )}
            <LectureAssets lecture={lecture} currentLecture={currentLecture} currentCourse={{ _id: course }} />

            {(lecture?.sectionType !== sectionConstants.EXAM || lecture.exam?.attempts.length !== 0 || (dayjs().isAfter(dayjs(lecture.dateEnd)))) && (
                <FlexColumn>
                    <OutLinedHoverBtn onClick={() => passed()} disabled={status.isLoading || (lectureIndex !== currentIndex && currentIndex !== 0) || false} > {(lectureIndex === currentIndex) ? 'تعليم كتم الانتهاء' : 'تم الانتهاء'} ! </OutLinedHoverBtn>
                    <Typography variant='body2'>لفتح المحاضره التاليه اضغط علي الزر</Typography>
                </FlexColumn>
            )}
            <WrapperHandler status={status} showSuccess={true} />
        </FlexColumn>
    )
}

export default LecturePage
