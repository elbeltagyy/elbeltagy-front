import usePostData from "../../hooks/usePostData"
import Section from "../../style/mui/styled/Section"
import { useUpdateGradeMutation } from "../../toolkit/apis/gradesApi"
import TitleWithDividers from "../ui/TitleWithDividers"
import GradeForm from "./GradeForm"

function UpdateGrade({ grade, setReset }) {
    const [sendData, status] = useUpdateGradeMutation()
    const [updateFc] = usePostData(sendData)

    const onSubmit = async (values, props) => {
        const res = await updateFc({ _id: grade._id, ...values }, true)
        if (setReset) {
            setReset(s => !s)
        }
        props.resetForm({ values: res })
    }
    return (
        <Section>
            <TitleWithDividers title={'تعديل ' + grade?.name} />
            <GradeForm onSubmit={onSubmit} status={status} grade={grade} />
        </Section>
    )
}

export default UpdateGrade
