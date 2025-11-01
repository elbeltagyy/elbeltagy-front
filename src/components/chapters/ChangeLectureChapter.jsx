import { handelObjsOfArr } from "../../tools/fcs/MakeArray"
import MakeForm from "../../tools/makeform/MakeForm"

function ChangeLectureChapter({ lecture, chapters, changeLectureChapter, status }) {
    const onSubmit = (newLecture) => {
        changeLectureChapter(lecture, newLecture.chapter)
    }

    const inputs = [
        {
            name: '_id',
            hidden: true
        }, {
            name: 'chapter',
            label: 'الفصل الخاص بالمحاضره',
            type: 'select',
            options: handelObjsOfArr(chapters, { value: '_id', label: 'name' })
        }
    ]

    return (
        <MakeForm preValue={lecture} inputs={inputs} onSubmit={onSubmit} status={status} />
    )
}

export default ChangeLectureChapter
