import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import { FlexBetween, FlexRow } from '../../style/mui/styled/Flexbox'
import LectureUpdate from './LectureUpdate'
import { FilledHoverBtn, OutLinedHoverBtn } from '../../style/buttonsStyles'
import { lang } from '../../settings/constants/arlang'
import TabInfo from '../ui/TabInfo'

import sectionConstants from '../../settings/constants/sectionConstants'
import { getFullDate } from '../../settings/constants/dateConstants'
import { BiSolidShow } from "react-icons/bi";
import ModalStyled from '../../style/mui/styled/ModalStyled'

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
import { useState } from 'react'
import InfoText from '../ui/InfoText'
import AdminLinkLectureToGroup from './AdminLinkLectureToGroup'
import BtnModal from '../ui/BtnModal'
import MakeForm from '../../tools/makeform/MakeForm'

// course => Lectures
// course => chapters => lectures(course, chapter)

//Liking
function AdminCardLecture({ lecture, i, setLectures, courseId }) {
  const [open, setOpen] = useState(false)
  const isNativeLecture = (lecture?.course?._id === courseId || lecture?.course === courseId)

  const [sendData, { isLoading }] = useUpdateLectureMutation()
  const [updateLecture] = usePostData(sendData)

  const navigate = useNavigate()

  const changeStatus = async (object) => {
    const res = await updateLecture({ id: lecture._id, ...object }, true)

    setLectures((pre) => {

      const modified = pre.map(storedLec => {
        if (storedLec._id === res._id) {
          storedLec = { ...storedLec }

          for (const key of Object.keys(object)) {
            // Update the corresponding key in `storedLec` with the value from `res`
            if (res[key] !== undefined) {
              storedLec[key] = res[key];
            }
          }

        }
        return storedLec
      })
      return modified
    })
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

    <Card elevation={4} sx={{ minWidth: '250px', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
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
        {!isNativeLecture && (
          <div>
            <TabInfo count={lecture.course.name} title={'مربوط بكورس : '} isBold={false} i={1} />
          </div>
        )}

        <TabInfo count={lecture.isActive ? lang.ACTIVE : lang.NOT_ACTIVE} i={lecture.isActive ? 1 : 3} />

        {isNativeLecture && (
          <>
            <InfoText label={'الوصف'} description={lecture.description} />
            <FlexRow>
              <InfoText label={'سعر المحاضره'} description={lecture.price + ' ' + 'جنيه'} />
              <BtnModal
                btn={<TabInfo sx={{ cursor: 'pointer', margin: '0 8px' }} count={'اضغط لتعديل السعر'} i={2} />}
                component={<MakeForm inputs={[
                  { name: 'price', label: 'السعر الجديد', type: 'number' }
                ]} onSubmit={changeStatus} status={{ isLoading }} formDirection={'row'} btnStyle={{ width: 'fit-content' }} />}
              />
              <SwitchStyled label={"قابله للبيع"} checked={lecture.isSalable} onChange={(value) => changeStatus({ isSalable: value })} isLoading={isLoading} />
            </FlexRow>

            <SwitchStyled label={"الحاله"} checked={lecture.isActive} onChange={(value) => changeStatus({ isActive: value })} isLoading={isLoading} />
            <SwitchStyled label={"جعل المحاضره مجانيه"} checked={lecture.isFree} onChange={(val) => changeStatus({ isFree: val })} isLoading={isLoading} />

            <div>
              <LinkMui href={"/management/codes?lecture=" + lecture._id} underline="hover" mr={'auto'} onClick={(e) => {
                e.preventDefault()
                navigate("/management/codes?lecture=" + lecture._id)
              }}>
                اكواد المحاضره
              </LinkMui>
            </div>

            <Separator />
            <Typography sx={{ width: '100%', textAlign: 'center', textDecoration: 'underline' }} variant='subtitle2'>خاص بطلاب السنتر</Typography>
            <SwitchStyled label={"تفعيله لطلاب السنتر"} checked={lecture.isCenter} onChange={(val) => changeStatus({ isCenter: val })} isLoading={isLoading} />

            {lecture.sectionType === sectionConstants.EXAM && (
              <div>
                <LinkMui href={'/management/attempts?courseId=' + courseId + '&lectureId=' + lecture._id + '&attemptRole=' + user_roles.STUDENT} underline="hover" mr={'auto'} onClick={(e) => {
                  e.preventDefault()
                  navigate('/management/attempts?courseId=' + courseId + '&lectureId=' + lecture._id + '&attemptRole=' + user_roles.STUDENT)
                }}>
                  احصائيات طلاب السنتر
                </LinkMui>
              </div>
            )}

            {lecture.sectionType === sectionConstants.VIDEO && (
              <div>
                <LinkMui href={'/statistics/views?role=' + user_roles.STUDENT + '&course=' + courseId + '&lecture=' + lecture._id} underline="hover" mr={'auto'} onClick={(e) => {
                  e.preventDefault()
                  navigate('/statistics/views?role=' + user_roles.STUDENT + '&course=' + courseId + '&lecture=' + lecture._id)
                }}>
                  احصائيات طلاب السنتر
                </LinkMui>
              </div>
            )}
            <FlexRow sx={{ mt: '20px', justifyContent: 'center' }}>
              <AdminLinkLectureToGroup lecture={lecture} setLectures={changeStatus} status={{ isLoading }} />
            </FlexRow>

          </>
        )}

      </CardContent>

      <CardActions sx={{ width: '100%' }} >
        <FlexBetween sx={{ width: '100%' }}>

          <FlexRow>

            {isNativeLecture && (
              <FilledHoverBtn endIcon={<BiSolidShow />} disabled={status.isLoading || isLoading} onClick={() => setOpen(true)} >
                عرض التفاصيل
              </FilledHoverBtn>
            )}

            {lecture.sectionType === sectionConstants.EXAM && (
              <OutLinedHoverBtn
                colorm='orange'
                component={Link} to={'/management/attempts?courseId=' + courseId + '&lectureId=' + lecture._id} endIcon={<FcStatistics />}>{lang.STATISTICS}</OutLinedHoverBtn>
            )}

            {lecture.sectionType === sectionConstants.VIDEO && (
              <OutLinedHoverBtn
                colorm='orange'
                component={Link} to={'/statistics/views?course=' + courseId + '&lecture=' + lecture._id} endIcon={<FcStatistics />}>{lang.STATISTICS}</OutLinedHoverBtn>
            )}
          </FlexRow>

          {isNativeLecture && (
            <IconButton disabled={status.isLoading || isLoading} onClick={() => setOpenDelete(true)} sx={{ bgcolor: 'error.main', '&:hover': { bgcolor: red[500], opacity: .8 } }}>
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
