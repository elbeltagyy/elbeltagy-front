import React, { memo, useEffect, useState } from 'react'
import CardStyled from '../../style/mui/styled/CardStyled'
import Grid from '../../style/vanilla/Grid'
import TitleSection from '../ui/TitleSection'
import { Alert, Box, Divider, Typography } from '@mui/material'
import TitleWithDividers from '../ui/TitleWithDividers'

import { useLazyGetLecturesQuery } from '../../toolkit/apis/lecturesApi'
import useLazyGetData from "../../hooks/useLazyGetData"
import AdminCardLecture from './AdminCardLecture'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import Separator from '../ui/Separator'
import LoaderWithText from '../../style/mui/loaders/LoaderWithText'
import { lang } from '../../settings/constants/arlang'
import { OutLinedHoverBtn } from '../../style/buttonsStyles'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import LectureCreate from './LectureCreate'
import AdminLinkCourse from './AdminLinkCourse'

function AdminLectures({ course, unit, grade }) {

  const [open, setOpen] = useState(false)
  const [lectures, setLectures] = useState([])

  const [getData, status] = useLazyGetLecturesQuery()
  const [getLectures] = useLazyGetData(getData)

  useEffect(() => {
    const trigger = async () => {
      const res = await getLectures({ course }, false)
      setLectures(res.lectures)
    }
    trigger()
  }, [course])


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
          return <AdminCardLecture key={i} i={i} lecture={lecture} setLectures={setLectures} />
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
