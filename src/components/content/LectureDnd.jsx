import { useSortable } from "@dnd-kit/sortable";
import AdminCardLectureRow from "./AdminCardLectureRow"
import { CSS } from "@dnd-kit/utilities";

function LectureDnd({ lecture, i, setLectures, courseId, chapters, changeLectureChapter, changeChapterStatus}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: lecture._id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,width: '100%'
    };

    return (
        <div ref={setNodeRef} style={style} >
            <AdminCardLectureRow
                attributes={attributes} listeners={listeners}
                lecture={lecture} i={i}
                setLectures={setLectures}
                courseId={courseId}
                chapters={chapters} changeLectureChapter={changeLectureChapter} changeChapterStatus={changeChapterStatus}
            />
        </div>
    )
}

export default LectureDnd
