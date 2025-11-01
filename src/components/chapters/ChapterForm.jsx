import MakeForm from "../../tools/makeform/MakeForm"

function ChapterForm({ onSubmit, status, chapter }) {

    const inputs = [
        { name: 'name', label: 'اسم الجزء' },
        { name: 'description', rows: 5, label: 'وصف الجزء', variant: 'filled' },
        { name: 'isActive', type: 'switch', label: 'فعال؟', value: true },
    ]

    return <MakeForm inputs={inputs} onSubmit={onSubmit} status={status} preValue={chapter} />
}

export default ChapterForm
