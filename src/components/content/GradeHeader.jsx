import React, { useEffect, useMemo, useState } from 'react'
import HeaderContent from '../ui/HeaderContent'

import { useLazyGetCoursesCountQuery, useLazyGetLecturesCountQuery, useLazyGetUnitsCountQuery } from '../../toolkit/apis/statisticsApi'
import useLazyGetData from '../../hooks/useLazyGetData'

import { lang } from '../../settings/constants/arlang'
import { filterArrWithValue } from '../../tools/fcs/MakeArray'
import gradeConstants from '../../settings/constants/gradeConstants'
import { CoursesIcon, UnitsIcon, VidsIcon2 } from '../ui/svg/ContentSvgs'

function GradeHeader({gradeId}) {


    const [unitsCount, setUnitsCount] = useState('يتم التحميل ...!')
    const [coursesCount, setCoursesCount] = useState('يتم التحميل ...!')
    const [lecturesCount, setLecturesCount] = useState('يتم التحميل ...!')


    const [getUnits] = useLazyGetUnitsCountQuery()
    const [getCourses] = useLazyGetCoursesCountQuery()
    const [getLectures] = useLazyGetLecturesCountQuery()

    const [getUnitsCount] = useLazyGetData(getUnits)
    const [getCoursesCount] = useLazyGetData(getCourses)
    const [getLecturesCount] = useLazyGetData(getLectures)



    useEffect(() => {
        const trigger = async () => {
            const unitsCountRes = await getUnitsCount({ grade: gradeId })
            const coursesCountRes = await getCoursesCount({ grade: gradeId })
            const lecturesCountRes = await getLecturesCount({ grade: gradeId })

            setUnitsCount(unitsCountRes.count || 0)
            setCoursesCount(coursesCountRes.count || 0)
            setLecturesCount(lecturesCountRes.count || 0)
        }

        trigger()
    }, [])


    const gradeTitle = useMemo(() =>
        filterArrWithValue(gradeConstants, { key: 'index', value: Number(gradeId) }, true).name
        , [gradeId])

    const gradeDescription = useMemo(() =>
        filterArrWithValue(gradeConstants, { key: 'index', value: Number(gradeId) }, true).description
        , [gradeId])

    const gradeImage = useMemo(() =>
        filterArrWithValue(gradeConstants, { key: 'index', value: Number(gradeId) }, true).img
        , [gradeId])


    return (
        <HeaderContent title={gradeTitle} body={gradeDescription} img={gradeImage}
            infos={[{
                caption: lang.UNITS, desc: '+ ' + unitsCount, icon: <UnitsIcon size='1.5rem' />
            },
            {
                caption: lang.COURSES_NUMBER, desc: '+ ' + coursesCount, icon: <CoursesIcon size='1.5rem' />
            }, {
                caption: lang.LECTURES, desc: '+ ' + lecturesCount, icon: <VidsIcon2 size='1.5rem' />
            }
            ]} />
    )
}

export default GradeHeader
