import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Section from '../../style/mui/styled/Section'
import { Alert, Box, useTheme } from '@mui/material'
import TitleSection from '../../components/ui/TitleSection'

import { useNavigate, useParams } from 'react-router-dom'
import useLazyGetData from '../../hooks/useLazyGetData'

import { lang } from '../../settings/constants/arlang'
import GradeHeader from '../../components/content/GradeHeader'
import { useLazyGetUnitsQuery } from '../../toolkit/apis/unitsApi'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'

import UnitCourses from '../../components/content/UnitCourses'
import { useSelector } from 'react-redux'


function UnitsPage() {

  const { gradeId } = useParams()
  const user = useSelector(s => s.global.user)

  const navigate = useNavigate()
  const [units, setUnits] = useState([])

  // units
  const [getUnitsFc, status] = useLazyGetUnitsQuery()
  const [getUnits] = useLazyGetData(getUnitsFc)

  useEffect(() => {
    const trigger = async () => {
      const res = await getUnits({ grade: gradeId })
      setUnits(res.units)
    }

    if (gradeId !== "undefined") {
      trigger()
    } else {
      if (user) { navigate('/grades/' + user.grade) }
    }
  }, [gradeId, user])

  if (gradeId === "undefined" || gradeId === undefined) {
    return
  }
  return (
    <Section>

      <GradeHeader gradeId={gradeId} />

      <Box minHeight={'100vh'} sx={{ padding: '8px' }}>
        <TitleSection title={lang.GRADE_CONTENT} />

        {(status.isSuccess && units?.length === 0) && (
          <Alert variant='filled' severity='warning'>الوحدات هتنزل قريب , خليك متابع !</Alert>
        )}

        {status.isLoading && <LoaderSkeleton />}
        {units?.length > 0 &&
          <>
            {units?.map((unit, i) => <UnitCourses key={i} unit={unit} />)}
          </>
        }

      </Box>
    </Section >
  )
}


export default UnitsPage
