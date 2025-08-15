import BtnModal from '../ui/BtnModal'
import FeedBackForm from './FeedBackForm'
import { FilledHoverBtn } from '../../style/buttonsStyles'
import { useCreateFeedBackMutation } from '../../toolkit/apis/feedBackApi'
import usePostData from '../../hooks/usePostData'
import { useSelector } from 'react-redux'

function CreateFeedBack({ setReset }) {
    const user = useSelector(s => s.global.user)
    const [sendData, status] = useCreateFeedBackMutation()
    const [createFeedBack] = usePostData(sendData)

    const onSubmit = async (values, props) => {
        await createFeedBack({ ...values, user: user._id })
        props.resetForm()
        if (setReset) {
            setReset(p => !p)
        }
    }

    return (
        <BtnModal
            btn={<FilledHoverBtn>
                انشاء شكوى او اقتراح
            </FilledHoverBtn>}>
            <FeedBackForm onSubmit={onSubmit} status={status} />
        </BtnModal>
    )
}

export default CreateFeedBack
