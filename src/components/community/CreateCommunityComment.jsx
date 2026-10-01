import { useSelector } from "react-redux"
import usePostData from "../../hooks/usePostData"
import { useCreateCommunityCommentMutation } from "../../toolkit/apis/CommunityCommentsApi"
import TypingBar from "../ui/TypingBar"

function CreateCommunityComment({ q, setComments, body = {}, onCreate }) {

    const user = useSelector(s => s.global.user)

    const [sendCreate, status] = useCreateCommunityCommentMutation()
    const [createComment] = usePostData(sendCreate)

    const submitComment = async (values) => {
        const res = await createComment({
            attachments: values.attachments,
            content: values.text,
            user: user._id, question: q._id, ...body
        }, true)
        if (setComments) setComments({ ...res, user })
        if (onCreate) onCreate(res)
    }

    return (
        <TypingBar status={status} hide={{ file: true }}
            placeholder="ارسال رد"
            handleSubmit={submitComment}
        />
    )
}

export default CreateCommunityComment