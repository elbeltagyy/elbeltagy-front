import usePostData from '../../hooks/usePostData'
import { useCreateQuestionMutation } from '../../toolkit/apis/questionsApi'
import useHandelQuestions from '../../hooks/useHandelQuestions'
import { memo, useState } from 'react'
import QuestionsForm from './QuestionsForm'
import TitleWithDividers from '../ui/TitleWithDividers'

function CreateQuestions({ setReset, defaultQuestion = {}, questions }) {

    const [sendData, status] = useCreateQuestionMutation()
    const [createQuestionFc] = usePostData(sendData)

    const [loading, setLoading] = useState(false)
    const [saveFiles] = useHandelQuestions(setLoading)


    const onSubmit = async (values, props) => {
        try {
            setLoading(true)
            const { questions } = await saveFiles(values)
            await createQuestionFc(questions)

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
            {defaultQuestion?.tags && (
                <TitleWithDividers title={'سيتم اضافه كل الاسئله الي الدرس ' + defaultQuestion.tags.name} />
            )}
            <QuestionsForm
                onSubmit={onSubmit}
                status={{ ...status, isLoading: loading }}
                defaultQuestion={defaultQuestion} questions={questions} />
        </div>
    )
}
//Formik state between, component, if not type




export default memo(CreateQuestions)
