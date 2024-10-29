import { useEffect, } from 'react'
import { useGetLectureAndCheckQuery, usePassLectureMutation } from '../../toolkit/apis/coursesApi'
import { useOutletContext, useParams } from 'react-router-dom'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import { FilledHoverBtn } from '../../style/buttonsStyles'
import usePostData from '../../hooks/usePostData'
import WrapperHandler from '../../tools/WrapperHandler'
import sectionConstants from '../../settings/constants/sectionConstants'
import LectureBody from '../../components/grades/LectureBody'
import dayjs from 'dayjs'

function LecturePage() {

    const params = useParams()
    const [lectureIndex, setCurrentIndex, currentIndex, course] = useOutletContext();
    const { data: lecture } = useGetLectureAndCheckQuery({
        index: params.courseId, lectureId: params.lectureId
    })

    const [sendData, status] = usePassLectureMutation()
    const [passLecture] = usePostData(sendData)

    useEffect(() => {
        status.reset()
    }, [lectureIndex])

    if (!lecture) return <LoaderSkeleton />
    // console.log(lecture)
    const passed = async () => {
        const nextLectureIndex = lectureIndex + 1
        await passLecture({ courseId: course, lectureId: lecture._id, nextLectureIndex }) //linked to
        setCurrentIndex(nextLectureIndex)
    }


    return (
        <FlexColumn sx={{ minHeight: '90vh', backgroundColor: 'background.alt', borderRadius: '16px', p: '12px' }}>

            <LectureBody lecture={lecture} lectureIndex={lectureIndex} />

            {(lecture.sectionType !== sectionConstants.EXAM || lecture.exam?.attempts.length !== 0 || (dayjs().isAfter(dayjs(lecture.dateEnd)))) && (
                <FilledHoverBtn onClick={() => passed()} disabled={status.isLoading || lectureIndex !== currentIndex || false} >تم الانتهاء ! </FilledHoverBtn>
            )}
            <WrapperHandler status={status} showSuccess={true} />
        </FlexColumn>
    )
}

export default LecturePage
