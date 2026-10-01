import { useCreateLectureMutation } from '../../toolkit/apis/lecturesApi'
import usePostData from '../../hooks/usePostData'
import LectureForm from './LectureForm'

function LectureCreate({ setLectures, grade, course, chapter, parent, afterCreateFc }) {
    const [sendData, status] = useCreateLectureMutation()
    const [createLecture] = usePostData(sendData)

    const onSubmit = async (values, props) => {
        const res = await createLecture({ ...values, parent }, true)
        if (setLectures) setLectures(prev => { return [...prev, res] })
        if (afterCreateFc) afterCreateFc(res)
        props.resetForm()
    }
    return (
        <LectureForm grade={grade} course={course} onSubmit={onSubmit} setLectures={setLectures} status={status} lecture={{ grade, course, chapter, parent }} />
    )
}

export default LectureCreate
