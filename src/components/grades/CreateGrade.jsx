import { useCreateGradeMutation } from '../../toolkit/apis/gradesApi'
import usePostData from '../../hooks/usePostData'

import GradeForm from './GradeForm'
import Section from '../../style/mui/styled/Section'
import TitleWithDividers from '../ui/TitleWithDividers'

function CreateGrade({ setReset }) {

    const [sendData, status] = useCreateGradeMutation()
    const [createGradeFc] = usePostData(sendData, null, setReset)

    const onSubmit = async (values, props) => {
        await createGradeFc(values, true)
        props.resetForm()
    }

    return (
        <Section>
            <TitleWithDividers title={'إنشاء ماده اساسيه جديده'} />
            <GradeForm onSubmit={onSubmit} status={status} />
        </Section>
    )
}

export default CreateGrade
