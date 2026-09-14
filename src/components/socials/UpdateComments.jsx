import Section from '../../style/mui/styled/Section'
import MakeForm from '../../tools/makeform/MakeForm'
import { useUpdateCommentMutation } from '../../toolkit/apis/socials/facebookApi'
import usePostData from '../../hooks/usePostData'

function UpdateComment({ comment, setReset, pageId }) {

    const [sendData, status] = useUpdateCommentMutation()
    const [updateComment] = usePostData(sendData, null, setReset)

    const inputs = [{
        name: 'message',
        label: 'الموضوع',
        value: comment.message,
        rows: 5,
        helperText: 'لا يمكنك تعديل الملفات - لتغيير الصور من اعدادات المنشور علي فيسبوك'
    }, {
        name: 'id',
        value: comment.id,
        disabled: true,
        hidden: true
    }, {
        name: 'pageId',
        value: pageId,
        disabled: true,
        hidden: true
    }]

    const onSubmit = async (values) => {
        await updateComment(values)
    }
    return (
        <Section>
            <MakeForm inputs={inputs} status={status} onSubmit={onSubmit} />
        </Section>
    )
}

export default UpdateComment