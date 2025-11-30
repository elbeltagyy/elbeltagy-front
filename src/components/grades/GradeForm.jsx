import MakeForm from "../../tools/makeform/MakeForm"
import imageValidation from "../../tools/validations/imageValidation"

function GradeForm({ onSubmit, status, grade }) {
    const inputs = [
        { name: 'name', label: 'الاسم' },
        { name: 'description', label: 'الوصف', rows: 4, variant: 'filled' },
        { name: 'isActive', label: 'هل فعال؟',type: 'switch', value: true },
        { name: 'image', label: 'الصوره', type: 'file', validation: imageValidation },
    ]

    return (
        <MakeForm inputs={inputs} onSubmit={onSubmit} status={status} preValue={grade} />
    )
}

export default GradeForm
