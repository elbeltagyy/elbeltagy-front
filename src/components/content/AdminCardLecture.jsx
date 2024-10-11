import React, { useState } from 'react'
import CardStyled from '../../style/mui/styled/CardStyled'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import { FlexBetween, FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import Image from '../ui/Image'
import LectureUpdate from './LectureUpdate'
import { FilledHoverBtn, OutLinedHoverBtn } from '../../style/buttonsStyles'
import { lang } from '../../settings/constants/arlang'
import TabInfo from '../ui/TabInfo'

import sectionConstants from '../../settings/constants/sectionConstants'
import { FaVideo } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { ExamIcon } from '../ui/svg/ContentSvgs'
import { FaLink } from "react-icons/fa6";
import { getFullDate } from '../../settings/constants/dateConstants'
import { BiSolidShow } from "react-icons/bi";
import ModalStyled from '../../style/mui/styled/ModalStyled'
import LectureCreate from './LectureCreate'
import { FcStatistics } from 'react-icons/fc'
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom'
import SwitchStyled from '../../style/mui/styled/SwitchStyled'
import { useUpdateLectureMutation } from '../../toolkit/apis/lecturesApi'
import usePostData from '../../hooks/usePostData'


function AdminCardLecture({ lecture, i, setLectures }) {
  const [open, setOpen] = useState(false)

  const [isCenter, setCenter] = useState(lecture.isCenter)

  const [sendData, { isLoading }] = useUpdateLectureMutation()
  const [updateLecture] = usePostData(sendData)

  const changeIsCenter = async (value) => {
    const res = await updateLecture({ id: lecture._id, isCenter: value }, true)
    setCenter(res.isCenter)
  }
  if (!lecture) return <></>

  return (

    <Card sx={{ minWidth: '250px', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main', color: 'grey.0' }} aria-label="recipe">
            {i + 1}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" color='orange' sx={{ mx: '16px' }}>
            {lecture.sectionType === sectionConstants.VIDEO ? <FaVideo size='1.5rem' color='orange' /> :
              lecture.sectionType === sectionConstants.FILE ? <FaFilePdf size='1.5rem' color='orange' /> :
                lecture.sectionType === sectionConstants.EXAM ? <ExamIcon size='1.5rem' color='orange' /> :
                  lecture.sectionType === sectionConstants.LINK && <FaLink size='1.5rem' color='orange' />}
          </IconButton>
        }
        title={<Typography variant='subtitle1' >{lecture.name}</Typography>}
        subheader={<TabInfo count={getFullDate(lecture.createdAt)} i={2} />}
      />
      <CardContent sx={{ flex: 1 }}>
        <TabInfo count={lecture.isActive ? lang.ACTIVE : lang.NOT_ACTIVE} i={lecture.isActive ? 1 : 3} />
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {lecture.description}
        </Typography>

        <SwitchStyled label={"تفعيله لطلاب السنتر"} checked={isCenter} onChange={changeIsCenter} isLoading={isLoading} />
      </CardContent>

      <CardActions sx={{ width: '100%' }} >
        <FlexBetween sx={{ width: '100%' }}>
          <FlexRow>
            <FilledHoverBtn endIcon={<BiSolidShow />} onClick={() => setOpen(true)} >
              عرض التفاصيل
            </FilledHoverBtn>
            <OutLinedHoverBtn
              colorm='orange'
              disabled={lecture.sectionType !== sectionConstants.EXAM}
              component={Link} to={'/statistics/exams/' + lecture._id} endIcon={<FcStatistics />}>{lang.STATISTICS}</OutLinedHoverBtn>
          </FlexRow>

          <IconButton sx={{ bgcolor: 'red', '&:hover': { bgcolor: 'red', opacity: .8 } }}>
            <MdDelete color='#fff' style={{}} />
          </IconButton>
        </FlexBetween>
      </CardActions>

      <ModalStyled open={open} setOpen={setOpen} >
        <LectureUpdate lecture={lecture} setLectures={setLectures} />
      </ModalStyled>
    </Card>
  )
}
export default AdminCardLecture
