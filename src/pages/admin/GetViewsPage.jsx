import { useParams, useSearchParams } from "react-router-dom"
import GetViewsCompo from "../../components/views/GetViews"
import { useLazyGetOneCourseQuery } from "../../toolkit/apis/coursesApi"

import TitleWithDividers from "../../components/ui/TitleWithDividers"
import Section from "../../style/mui/styled/Section"
import SwitchStyled from "../../style/mui/styled/SwitchStyled"
import { user_roles } from "../../settings/constants/roles"
import { useEffect, useState } from "react"
import { useLazyGetOneLectureQuery } from "../../toolkit/apis/lecturesApi"
import GetStudentsNotViewed from "../../components/views/GetStudentsNotViewed"

function GetViewsPage() {
  const { lectureId, courseId } = useParams()
  const [searchParams] = useSearchParams();
  const role = searchParams?.get("role")

  const [getCourse, { data, isLoading }] = useLazyGetOneCourseQuery()
  const [getLecture, { data: lectureData }] = useLazyGetOneLectureQuery()

  const isCenterRole = role === user_roles.STUDENT
  const [courseType, setCourseType] = useState('')


  useEffect(() => {
    if (courseId && !isCenterRole) {
      getCourse({ _id: courseId }, true)
    }

    if (lectureId) {
      getLecture({ id: lectureId }, true)
    }

    if (!isCenterRole) {
      setCourseType(courseId)
    } else {
      setCourseType('')
    }

  }, [location.href])

  return (
    <Section>

      <TitleWithDividers
        title={
          lectureId && 'اسم المحاضره : ' + lectureData?.values?.name || 'المحاضرات'
        }
        desc={
          (courseId && courseType === courseId) ?
            'اسم الكورس : ' + data?.values?.name :
            courseType !== courseId ?
              'احصائيات المحاضره' + (isCenterRole ? ' لطلاب السنتر' : '') : 'احصائيات المنصه فى المشاهدات'}
      />


      {(role !== user_roles.STUDENT && courseId) && (
        <SwitchStyled
          isLoading={isLoading}
          label={'عرض المشاهدات الخاصه بالكورس فقط'}
          checked={courseType === courseId ? true : false}
          onChange={() => {
            if (courseType === courseId) {
              setCourseType('all')
            } else {
              setCourseType(courseId)
            }
          }} />
      )}

      <GetViewsCompo lectureId={lectureId} courseId={courseType} role={role || ''} />

      {lectureId && (
        <GetStudentsNotViewed
          grade={data?.values?.grade}
          lectureId={lectureId}
          course={isCenterRole ? '' : courseId}
          lectureName={lectureData?.values?.name}
          role={role ? role : ''}
        />
      )}
    </Section>
  )
}

export default GetViewsPage
