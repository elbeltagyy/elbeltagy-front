import { useSearchParams } from "react-router-dom"
import GetViewsCompo from "../../components/views/GetViews"
import { useLazyGetOneCourseQuery } from "../../toolkit/apis/coursesApi"

import TitleWithDividers from "../../components/ui/TitleWithDividers"
import Section from "../../style/mui/styled/Section"
import SwitchStyled from "../../style/mui/styled/SwitchStyled"
import { user_roles } from "../../settings/constants/roles"
import { useEffect, useMemo, useState } from "react"
import { useLazyGetOneLectureQuery } from "../../toolkit/apis/lecturesApi"
import GetStudentsNotViewed from "../../components/views/GetStudentsNotViewed"
import GetEveryUserViews from "../../components/views/GetEveryUserViews"
import { useGetByUsersViewsCountQuery, useGetViewsCountQuery } from "../../toolkit/apis/statisticsApi"
import TabsAutoStyled from "../../style/mui/styled/TabsAutoStyled"


function GetViewsPage() {

  const [searchParams] = useSearchParams();

  const role = searchParams?.get("role")
  const lectureId = searchParams?.get("lecture")
  const courseId = searchParams?.get("course")

  const [filterByCourse, setFilterByCourse] = useState(true)
  const [getCourse, { data, isLoading }] = useLazyGetOneCourseQuery()
  const [getLecture, { data: lectureData }] = useLazyGetOneLectureQuery()

  const isCenterRole = role === user_roles.STUDENT //Case with only lecture (not course)

  const { data: viewsCount, refetch: refetchViews } = useGetViewsCountQuery({ lecture: lectureId, course: isCenterRole ? "" : courseId, role: role || '' })
  const { data: usersCount, refetch: refetchUsers } = useGetByUsersViewsCountQuery({ lecture: lectureId, course: isCenterRole ? "" : courseId, role: role || '' }) //*_* view_role
  // console.log(viewsCount)
  // console.log(usersCount)

  useEffect(() => {
    if (courseId && !isCenterRole) {
      getCourse({ _id: courseId }, true)
    }

    if (lectureId) {
      getLecture({ id: lectureId }, true)
    }
    //# 1- by lectureId => (roles || courseId) 2- 
    //2- byCourseId => 
    if (isCenterRole) {
      setFilterByCourse(false)
    }

  }, [location.href])
  const tabs = [
    {
      label: 'المشاهدات', count: viewsCount?.values?.count ?? 'يتم التحميل...',
      component: <GetViewsCompo lectureId={lectureId} courseId={filterByCourse ? courseId : ''} role={role || ''} refetchViews={refetchViews} />
    }, {
      label: 'الطلاب', count: usersCount?.values?.count ?? 'يتم التحميل...',
      component: <GetEveryUserViews lectureId={lectureId} courseId={filterByCourse ? courseId : ''} role={role || ''} refetchUsers={refetchUsers} />
    },]

  const modifiedTabs = useMemo(() => {
    if (lectureId) {

      return [...tabs, {
        label: 'الطلاب الذين لما يشاهدوا المحاضره: ' + lectureData?.values?.name,
        component: <GetStudentsNotViewed
          // grade={data?.values?.grade}
          lectureId={lectureId}
          course={isCenterRole ? '' : courseId}
          lectureName={lectureData?.values?.name}
          role={role ? role : ''}
        />
      }]
    } else {
      return tabs
    }
  }, [lectureId, viewsCount, usersCount, filterByCourse, courseId, isCenterRole, lectureData])


  return (
    <Section>
      <TitleWithDividers
        title={
          lectureId && 'اسم المحاضره : ' + lectureData?.values?.name || 'المحاضرات'
        }
        desc={
          (courseId && filterByCourse) ?
            'اسم الكورس : ' + data?.values?.name :
            courseId ?
              'احصائيات المحاضره' + (isCenterRole ? ' لطلاب السنتر' : ' لكل الطلاب')
              : 'احصائيات المنصه فى المشاهدات'
        } />

      {(!isCenterRole && lectureId) && (
        <SwitchStyled
          isLoading={isLoading}
          label={'عرض المشاهدات الخاصه بالكورس فقط'}
          checked={filterByCourse}
          onChange={() => {
            setFilterByCourse(!filterByCourse)
          }} />
      )}

      <TabsAutoStyled originalTabs={modifiedTabs} />

    </Section>
  )
}

export default GetViewsPage
