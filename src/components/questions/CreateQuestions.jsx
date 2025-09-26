import usePostData from '../../hooks/usePostData'
import { useCreateQuestionMutation } from '../../toolkit/apis/questionsApi'
import useHandelQuestions from '../../hooks/useHandelQuestions'
import { memo, useState } from 'react'
import QuestionsForm from './QuestionsForm'

function CreateQuestions({ setReset }) {

    const [sendData, status] = useCreateQuestionMutation()
    const [createQuestionFc] = usePostData(sendData)

    const [loading, setLoading] = useState(false)
    const [saveFiles] = useHandelQuestions(setLoading)


    const onSubmit = async (values, props) => {
        try {
            setLoading(true)
            const { questions } = await saveFiles(values)
            await createQuestionFc(questions)

            // localStorage.setItem("grade", questions[questions.length - 1]?.grade)
            if (setReset) {
                setReset(pre => !pre)
            }
            props.resetForm()
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <div>
            <QuestionsForm onSubmit={onSubmit} status={{ ...status, isLoading: loading }} />
        </div>
    )
}
//Formik state between, component, if not type




export default memo(CreateQuestions)
