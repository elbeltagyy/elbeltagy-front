import { Button } from "@mui/material"
import { FlexRow } from "../../style/mui/styled/Flexbox"
import { useUpdateAnswerMutation } from "../../toolkit/apis/answersApi"
import usePostData from "../../hooks/usePostData"

import TabInfo from "../ui/TabInfo"

function AnswerHighlight({ question, setQuestion }) {

    const answer = question.answer
    const isHighlighted = answer?.isHighlighted

    const [updateFc] = useUpdateAnswerMutation()
    const [updateAnswer] = usePostData(updateFc)

    const highlightAnswer = async () => {
        const res = await updateAnswer({ _id: answer?._id, isHighlighted: !answer.isHighlighted })
        if (setQuestion) {
            setQuestion(question._id, { ...question, answer: res })
        }
    }

    if (!answer) return

    return (
        <FlexRow justifyContent={'flex-end'} my={'16px'}>
            <TabInfo count={isHighlighted ? 'هذا السؤال محفوظ فى الاسئله المهمه' : 'هل تريد حفظ السؤال ؟'} i={isHighlighted ? 1 : 3} />
            <Button onClick={highlightAnswer} sx={{ m: '0 16px' }} variant={isHighlighted ? "outlined" : 'contained'} color={isHighlighted ? "error" : 'primary'}>
                {isHighlighted ? "ازاله السؤال" : 'حفظ السؤال'}
            </Button>
        </FlexRow>
    )
}

export default AnswerHighlight
