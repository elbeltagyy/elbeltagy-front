
import MakeForm from '../../tools/makeform/MakeForm'
import useQuestionsSchema from './useQuestionsSchema'

function QuestionsForm({ onSubmit, status, defaultQuestion = {}, type = 'mcq', questions = null, metaData = { isAdd: true, isDelete: true } }) {

    const questionsSchema = useQuestionsSchema({ type, grade: defaultQuestion.grade, tags: defaultQuestion?.tags?._id ?? '', metaData, questions })

    return (
        <div>
            <MakeForm inputs={questionsSchema} onSubmit={onSubmit} status={status} enableReinitialize={false} />
        </div>
    )
}

export default QuestionsForm
