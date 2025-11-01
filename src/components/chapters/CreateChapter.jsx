import usePostData from '../../hooks/usePostData'
import Section from '../../style/mui/styled/Section'
import { useCreateChapterMutation } from '../../toolkit/apis/chaptersApi'
import TitleWithDividers from '../ui/TitleWithDividers'

import ChapterForm from './ChapterForm'

function CreateChapter({ courseId, setChapters, grade }) {
    const [sendData, status] = useCreateChapterMutation()
    const [createChapter] = usePostData(sendData)

    const onSubmit = async (values, props) => {
        const res = await createChapter({ ...values, courses: [courseId], grade })
        props.resetForm()
        if (setChapters) {
            setChapters(pre => ([...pre, { ...res, lectures: [] }]))
        }
    }
    return <Section>
        <TitleWithDividers title={'إنشاء جزء جديد'} />
        <ChapterForm onSubmit={onSubmit} status={status} />
    </Section>
}

export default CreateChapter
