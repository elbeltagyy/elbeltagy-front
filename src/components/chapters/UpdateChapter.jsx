import usePostData from "../../hooks/usePostData"
import Section from "../../style/mui/styled/Section"
import { useUpdateChapterMutation } from "../../toolkit/apis/chaptersApi"
import ChapterForm from "./ChapterForm"

function UpdateChapter({ chapter, setChapter }) {

    const [sendData, status] = useUpdateChapterMutation()
    const [updateChapter] = usePostData(sendData)

    const onSubmit = async (values) => {
        const res = await updateChapter({ ...values, _id: chapter._id, id: chapter._id })
        setChapter({ ...chapter, ...res })
    }

    return (
        <Section>
            <ChapterForm onSubmit={onSubmit} status={status} chapter={chapter} />
        </Section>
    )
}

export default UpdateChapter
