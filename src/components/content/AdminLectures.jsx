import { memo, useEffect, useState } from 'react'
import TitleWithDividers from '../ui/TitleWithDividers'

import { useLazyGetAllLecturesQuery } from '../../toolkit/apis/lecturesApi'
import useLazyGetData from "../../hooks/useLazyGetData"
// import AdminCardLecture from './AdminCardLecture'

import LoaderWithText from '../../style/mui/loaders/LoaderWithText'
import { lang } from '../../settings/constants/arlang'
import { StyledBtn } from '../../style/buttonsStyles'

import BtnModal from '../ui/BtnModal'
import CreateChapter from '../chapters/CreateChapter'

import { useChangeChapterIndexMutation } from '../../toolkit/apis/chaptersApi'


import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates} from '@dnd-kit/sortable'
import usePostData from '../../hooks/usePostData'
import ChapterDnD from '../chapters/ChapterDnD'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import { Box } from '@mui/material'

function AdminLectures({ course, unit, grade, refetchLectures, setLecturesCount }) {

  const [chapters, setChapters] = useState([])

  const [getData, status] = useLazyGetAllLecturesQuery()
  const [getLectures] = useLazyGetData(getData)

  useEffect(() => {
    const trigger = async () => {
      const res = await getLectures({ course }, false)
      setChapters(res.lessons)
    }
    trigger()
  }, [course, refetchLectures])


  const setChapter = (chapter) => {
    setChapters(chapters.map(ch => {
      if (ch._id === chapter._id) {
        return { ...ch, ...chapter }
      }
      return ch
    }))
  }

  const deleteChapter = (chapter) => {
    setChapters(chapters.filter(ch => ch._id !== chapter._id))
  }


  // Drag & Drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const [sendChange, { isLoading }] = useChangeChapterIndexMutation()
  const [changeChapterIndex] = usePostData(sendChange)

  //ELemnt D&D

  const handleDragEnd = async (event) => {
    try {
      const { active, over } = event
      if (!over || active.id === over.id) return
      await changeChapterIndex({
        id: chapters.find(ch => ch._id === active.id)._id,
        targetId: chapters.find(ch => ch._id === over.id)._id,
      })

      setChapters((items) => {
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


  if (status.isLoading) return <LoaderWithText />
  const CreateChapterBtn = <BtnModal size="medium"
    btn={<StyledBtn>انشاء جزء جديد</StyledBtn>}
    component={<CreateChapter setChapters={setChapters} courseId={course} grade={grade} />}
  />
  return (
    <div style={{ position: 'relative' }}>
      <TitleWithDividers title={lang.LECTURES} />
      {CreateChapterBtn}

      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <SortableContext disabled={isLoading} items={chapters.map(l => l._id)} >

          {chapters.length && chapters.map((chapter, i) => {

            return <Box key={chapter._id}>
              {isLoading && <FlexColumn sx={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%', bgcolor: '#00000030', zIndex: 5,
                padding: '16px'
              }}>
                <LoaderWithText variant='filled' text={'يتم تغيير ترتيب المحاضرات'} />
              </FlexColumn>
              }
              <ChapterDnD
                course={course}
                deleteChapter={deleteChapter} setChapter={setChapter}
                setChapters={setChapters} chapters={chapters}
                grade={grade} chapter={chapter}
              />
            </Box>
          })}

        </SortableContext>
      </DndContext>
      {CreateChapterBtn}
    </div>
  )
}

// lecture => vids, files, exams
export default memo(AdminLectures)
