import usePostData from "../../hooks/usePostData"
import { useCreatePostMutation } from "../../toolkit/apis/socials/facebookApi"
import MakeForm from "../../tools/makeform/MakeForm"

function CreatePost({ pageId, setReset }) {
    const [sendData, status] = useCreatePostMutation()
    const [sendFc] = usePostData(sendData)

    const onSubmit = async (values) => {
        await sendFc(values, true)
        if (setReset) setReset(r => !r)
    }
    const inputs = [
        {
            name: "pageId",
            label: "الرسال",
            value: pageId,
            hidden: true,
            disabled: true
        }, {
            name: "message",
            label: "الرساله",
            rows: 5
        },
        {
            label: 'الملفات',
            name: 'files',
            type: 'file',
            multiple: true
        }, {
            label: 'تاريخ النشر',
            name: 'scheduledTime',
            type: 'fullDate',
        },
    ]
    return (
        <MakeForm inputs={inputs} status={status} onSubmit={onSubmit} />
    )
}

export default CreatePost