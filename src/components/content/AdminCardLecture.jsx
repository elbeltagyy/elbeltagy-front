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
import { Link, useNavigate } from 'react-router-dom'
import SwitchStyled from '../../style/mui/styled/SwitchStyled'
import { useDeleteLectureMutation, useUpdateLectureMutation } from '../../toolkit/apis/lecturesApi'
import usePostData from '../../hooks/usePostData'
import Separator from '../ui/Separator'
import SectionIcon from './SectionIcon'
import { red } from '@mui/material/colors'
import Loader from '../../style/mui/loaders/Loader'
import { Link as LinkMui } from '@mui/material'
import { user_roles } from '../../settings/constants/roles'


function AdminCardLecture({ lecture, i, setLectures, courseId }) {
  const [open, setOpen] = useState(false)

  const [isCenter, setCenter] = useState(lecture.isCenter)

  const [sendData, { isLoading }] = useUpdateLectureMutation()
  const [updateLecture] = usePostData(sendData)

  const navigate = useNavigate()
  const changeIsCenter = async (value) => {
    const res = await updateLecture({ id: lecture._id, isCenter: value }, true)
    setCenter(res.isCenter)
  }

  const [isActive, setIsActive] = useState(lecture.isActive)
  const changeActivity = async (value) => {
    const res = await updateLecture({ id: lecture._id, isActive: value }, true)
    setLectures((pre) => {

      const modified = pre.map(storedLec => {
        if (storedLec._id === res._id) {
          storedLec = res
        }
        return storedLec
      })
      return modified
    })
    setIsActive(res.isActive)
  }

  const [openDelete, setOpenDelete] = useState(false)
  const [sendDelete, status] = useDeleteLectureMutation()
  const [deleteLecture] = usePostData(sendDelete)

  const triggerDelete = async () => {
    await deleteLecture({ id: lecture._id })
    setLectures(prev => {
      let lectures = [...prev]
      const filtered = lectures.filter(lect => lect._id !== lecture._id)
      return filtered
    })

  }

  if (!lecture) return <></>

  return (

    <Card elevation={4} sx={{ minWidth: '250px', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main', color: 'grey.0' }} aria-label="recipe">
            {i + 1}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" color='orange' sx={{ mx: '16px' }}>
            <SectionIcon lecture={lecture} />
          </IconButton>
        }
        title={<Typography variant='subtitle1' >{lecture.name}</Typography>}
        subheader={<TabInfo count={getFullDate(lecture.createdAt)} i={2} />}
      />
      <CardContent sx={{ flex: 1 }}>
        {lecture?.course?._id !== courseId && (
          <div>
            <TabInfo count={lecture.course.name} title={'مربوط بكورس : '} isBold={false} i={1} />
          </div>
        )}

        <TabInfo count={lecture.isActive ? lang.ACTIVE : lang.NOT_ACTIVE} i={lecture.isActive ? 1 : 3} />

        {(lecture?.course?._id === courseId) && (
          <>

            <Box>
              <SwitchStyled label={"الحاله"} checked={isActive} onChange={changeActivity} isLoading={isLoading} />
            </Box>

            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {lecture.description}
            </Typography>

            <Separator />
            <Typography sx={{ width: '100%', textAlign: 'center', textDecoration: 'underline' }} variant='subtitle2'>خاص بطلاب السنتر</Typography>
            <SwitchStyled label={"تفعيله لطلاب السنتر"} checked={isCenter} onChange={changeIsCenter} isLoading={isLoading} />

            {lecture.sectionType === sectionConstants.EXAM && (
              <div>
                <LinkMui href={'/statistics/courses/' + user_roles.STUDENT + '/exams/' + lecture._id} underline="hover" mr={'auto'} onClick={(e) => {
                  e.preventDefault()
                  navigate('/statistics/courses/' + user_roles.STUDENT + '/exams/' + lecture._id)
                }}>
                  احصائيات طلاب السنتر
                </LinkMui>
              </div>
            )}
          </>
        )}
      </CardContent>

      <CardActions sx={{ width: '100%' }} >
        <FlexBetween sx={{ width: '100%' }}>
          <FlexRow>

            {(lecture?.course?._id === courseId) && (
              <FilledHoverBtn endIcon={<BiSolidShow />} disabled={status.isLoading || isLoading} onClick={() => setOpen(true)} >
                عرض التفاصيل
              </FilledHoverBtn>
            )}

            <OutLinedHoverBtn
              colorm='orange'
              disabled={lecture.sectionType !== sectionConstants.EXAM}
              component={Link} to={'/statistics/courses/' + courseId + '/exams/' + lecture._id} endIcon={<FcStatistics />}>{lang.STATISTICS}</OutLinedHoverBtn>
          </FlexRow>

          {(lecture?.course?._id === courseId) && (
            <IconButton disabled={status.isLoading || isLoading} onClick={() => setOpenDelete(true)} sx={{ bgcolor: 'red', '&:hover': { bgcolor: red[500], opacity: .8 } }}>
              {status.isLoading ? <Loader /> : <MdDelete color='#fff' />}
            </IconButton>
          )}

        </FlexBetween>
      </CardActions>

      <ModalStyled open={open} setOpen={setOpen} >
        <LectureUpdate lecture={lecture} setLectures={setLectures} />
      </ModalStyled>

      <ModalStyled open={openDelete} setOpen={setOpenDelete} action={triggerDelete} title={'هل انت متاكد من حذف المحاضره'} />
    </Card>
  )
}
export default AdminCardLecture
