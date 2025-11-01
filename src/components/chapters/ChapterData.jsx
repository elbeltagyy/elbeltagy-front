import { FlexColumn } from "../../style/mui/styled/Flexbox"
import AdminChapterInfo from "./AdminChapterInfo"
// import AdminCardLecture from "../content/AdminCardLecture"

import AdminCardLectureRow from "../content/AdminCardLectureRow"
import { OutLinedHoverBtn } from "../../style/buttonsStyles"
import { lang } from "../../settings/constants/arlang"
import BtnModal from "../ui/BtnModal"
import LectureCreate from "../content/LectureCreate"
import { useCallback, useEffect, useMemo, useState } from "react"
import LectureDnd from "../content/LectureDnd"
import { arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import usePostData from "../../hooks/usePostData"
import { useChangeLectureIndexMutation, useUpdateLectureMutation } from "../../toolkit/apis/lecturesApi"

function ChapterData({ chapter, setChapter, course, grade, deleteChapter, chapters, setChapters }) { //unit,
    const [lectures, setLectures] = useState(chapter.lectures || [])

    useEffect(() => {
        setLectures(chapter.lectures)
    }, [chapter.lectures])

    // 🪄 Keep parent updated when local state changes
    useEffect(() => {
        setChapter({
            ...chapter, lectures
        })
    }, [lectures])

    // #Change lecture Chapter
    const [sendUpdate, changeChapterStatus] = useUpdateLectureMutation()
    const [updateLecture] = usePostData(sendUpdate)

    const changeLectureChapter = useCallback(async (lecture, newChapterId) => {

        await updateLecture({ _id: lecture._id, id: lecture._id, chapter: newChapterId }, true)
        setChapters(() => {
            return chapters.map(ch => {
                if (ch._id === lecture.chapter) {
                    return { ...ch, lectures: lectures.filter(lec => lec.chapter !== ch._id) }
                }
                if (ch._id === newChapterId) {
                    const sortedLectures = [...(ch.lectures || []), lecture].sort((a, b) => a.index - b.index);
                    return { ...ch, lectures: sortedLectures }
                }
                return ch
            })
        })
    }, [chapters, lectures])


    // Drag & Drop Lectures
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    )

    const [sendChange, { isLoading }] = useChangeLectureIndexMutation()
    const [changeLectureIndex] = usePostData(sendChange)

    //ELemnt D&D
    const handleDragEnd = async (event) => {
        try {
            const { active, over } = event
            if (!over || active.id === over.id) return

            await changeLectureIndex({
                id: lectures.find(lec => lec._id === active.id)._id,
                targetId: lectures.find(lec => lec._id === over.id)._id,
            })

            setLectures((items) => {
                const oldIndex = items.findIndex((item) => item._id === active.id)
                const newIndex = items.findIndex((item) => item._id === over.id)
                return arrayMove(items.map(item => {
                    if (item._id === active.id) {
                        return { ...item, oldIndex: 1 + oldIndex, newIndex: 1 + newIndex }
                    }
                    return item
                }), oldIndex, newIndex)
            })

        } catch (error) {
            console.log('error from change order ==>', error)
        }
    }
    const isNativeChapter = useMemo(() => chapter.courses?.includes(course), [course, chapter])

    return (
        <FlexColumn sx={{ width: '100%' }}>
            <AdminChapterInfo
                course={course}
                lecturesCount={chapter?.lectures?.length}
                chapter={chapter}
                setChapter={setChapter} isNativeChapter={isNativeChapter}
                deleteChapter={deleteChapter} />
            {isNativeChapter && (
                <BtnModal
                    btn={<OutLinedHoverBtn disabled={!grade} sx={{ m: '16px auto', width: '100%' }}>
                        {lang.ADD_LECTURE}
                    </OutLinedHoverBtn>}
                    component={<LectureCreate chapter={chapter._id} grade={grade} course={course} setLectures={setLectures} />}
                />
            )}

            {/* Lectures is here */}
            <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <FlexColumn gap={'12px'} sx={{ width: '100%' }}>
                    <SortableContext
                        // id={`lectures-${chapter._id}`}
                        items={chapter.lectures ? chapter.lectures?.map((l) => l._id) : []}
                    >
                        {lectures && lectures.map((lecture, i) => (
                            <LectureDnd
                                key={lecture._id}
                                i={i}
                                chapter={chapter}
                                chapters={chapters} changeLectureChapter={changeLectureChapter} changeChapterStatus={changeChapterStatus}
                                setLectures={setLectures}
                                courseId={course} lecture={lecture} />

                        ))}
                    </SortableContext>
                </FlexColumn>
            </DndContext>

        </FlexColumn>
    )
}

export default ChapterData
