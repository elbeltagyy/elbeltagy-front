import { memo, useEffect, useState } from 'react'
import Grid from '../../style/vanilla/Grid'
import { Alert, } from '@mui/material'
import TitleWithDividers from '../ui/TitleWithDividers'

import { useLazyGetAllLecturesQuery } from '../../toolkit/apis/lecturesApi'
import useLazyGetData from "../../hooks/useLazyGetData"
import AdminCardLecture from './AdminCardLecture'

import LoaderWithText from '../../style/mui/loaders/LoaderWithText'
import { lang } from '../../settings/constants/arlang'
import { OutLinedHoverBtn } from '../../style/buttonsStyles'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import LectureCreate from './LectureCreate'

function AdminLectures({ course, unit, grade, refetchLectures, setLecturesCount }) {

  const [open, setOpen] = useState(false)
  const [lectures, setLectures] = useState([])

  const [getData, status] = useLazyGetAllLecturesQuery()
  const [getLectures] = useLazyGetData(getData)

  useEffect(() => {
    const trigger = async () => {
      const res = await getLectures({ course }, false)
      setLectures(res.lectures)
      if (setLecturesCount) {
        setLecturesCount(res.lectures?.length || 'loading')
      }
    }
    trigger()
  }, [course, refetchLectures])


  if (status.isLoading) return <LoaderWithText />

  return (
    <div>
      <TitleWithDividers title={lang.LECTURES} />

      {status.isSuccess && lectures.length === 0 && (
        <Alert variant="filled" severity="warning" sx={{ justifyContent: 'center', my: '16px' }}>
          {lang.NO_LECTURES_IN_THIS_COURSE}
        </Alert>
      )}


      <Grid gap='10px'>
        {lectures?.map((lecture, i) => {
          return <AdminCardLecture key={i} i={i} courseId={course} lecture={lecture} setLectures={setLectures} />
        })}
      </Grid>

      <OutLinedHoverBtn disabled={!grade} sx={{ m: '16px auto', width: '100%' }} onClick={() => setOpen(true)} >{lang.ADD_LECTURE}</OutLinedHoverBtn>
      <ModalStyled open={open} setOpen={setOpen} >
        {(unit && grade && course) ?
          <LectureCreate unit={unit} grade={grade} course={course} setLectures={setLectures} />
          : <Alert severity='warning'>من فضلك اختر وحده !</Alert>
        }
      </ModalStyled>
    </div>
  )
}

// lecture => vids, files, exams
export default memo(AdminLectures)
