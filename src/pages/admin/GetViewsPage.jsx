import { useSearchParams } from "react-router-dom"
import GetViewsCompo from "../../components/views/GetViews"
import { useLazyGetOneCourseQuery } from "../../toolkit/apis/coursesApi"
import TabsStyled from '../../style/mui/styled/TabsStyled'

import TitleWithDividers from "../../components/ui/TitleWithDividers"
import Section from "../../style/mui/styled/Section"
import SwitchStyled from "../../style/mui/styled/SwitchStyled"
import { user_roles } from "../../settings/constants/roles"
import { useEffect, useState } from "react"
import { useLazyGetOneLectureQuery } from "../../toolkit/apis/lecturesApi"
import GetStudentsNotViewed from "../../components/views/GetStudentsNotViewed"
import GetEveryUserViews from "../../components/views/GetEveryUserViews"
import { useGetByUsersViewsCountQuery, useGetViewsCountQuery } from "../../toolkit/apis/statisticsApi"

function GetViewsPage() {

  const [tabOpen, setTab] = useState(0)

  const [searchParams] = useSearchParams();

  const role = searchParams?.get("role")
  const lectureId = searchParams?.get("lecture")
  const courseId = searchParams?.get("course")

  const [getCourse, { data, isLoading }] = useLazyGetOneCourseQuery()
  const [getLecture, { data: lectureData }] = useLazyGetOneLectureQuery()

  const isCenterRole = role === user_roles.STUDENT
  const [courseType, setCourseType] = useState('')

  const { data: viewsCount, refetch: refetchViews } = useGetViewsCountQuery({ lecture: lectureId, course: courseType, view_role: role || '' })
  const { data: usersCount, refetch: refetchUsers } = useGetByUsersViewsCountQuery({ lecture: lectureId, course: courseType, view_role: role || '' })
  // console.log(viewsCount)
  // console.log(usersCount)

  const tabOptions = [
    { label: 'عرض المشاهدات', value: 0, count: viewsCount?.values?.count ?? 'يتم التحميل...' },
    { label: 'عرض الطلاب', value: 1, count: usersCount?.values?.count ?? 'يتم التحميل...' },
  ]

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


      {(role !== user_roles.STUDENT && lectureId) && (
        <SwitchStyled
          isLoading={isLoading}
          label={'عرض المشاهدات الخاصه بالكورس فقط'}
          checked={courseType === courseId ? true : false}
          onChange={() => {
            if (courseType === courseId) {
              setCourseType()
            } else {
              setCourseType(courseId)
            }
          }} />
      )}

      <TabsStyled value={tabOpen} setValue={setTab}
        tabs={tabOptions}
      />

      {tabOpen === 0 ?
        <GetViewsCompo lectureId={lectureId} courseId={courseType} role={role || ''} refetchViews={refetchViews} />
        :
        <GetEveryUserViews lectureId={lectureId} courseId={courseType} role={role || ''} refetchUsers={refetchUsers} />
      }


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
