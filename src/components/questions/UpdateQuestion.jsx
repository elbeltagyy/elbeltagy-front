import { useState } from "react"
import Section from "../../style/mui/styled/Section"
import QuestionsForm from "./QuestionsForm"
import useHandelQuestions from "../../hooks/useHandelQuestions"
import { useUpdateQuestionMutation } from "../../toolkit/apis/questionsApi"
import usePostData from "../../hooks/usePostData"

function UpdateQuestion({ question, setReset }) {
    const [loading, setLoading] = useState(false)
    const [saveFiles] = useHandelQuestions(setLoading)

    const [updateData, status] = useUpdateQuestionMutation()
    const [updateQuestionFc] = usePostData(updateData, setLoading)

    const onSubmit = async (values, props) => {

        //Values => {questions: []} -- 
        try {
            setLoading(true)
            const { questions } = await saveFiles(values)
            await updateQuestionFc(questions[0])
            if (setReset) {
                setReset(pre => !pre)
            }
            // props.resetForm(questions[0])
            // props.resetForm({ values: questions[0] })

            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <Section>
            <QuestionsForm onSubmit={onSubmit} status={{ ...status, isLoading: loading }} questions={[question]} metaData={{ isAdd: false, isDelete: false }} />
        </Section>
    )
}

export default UpdateQuestion 
