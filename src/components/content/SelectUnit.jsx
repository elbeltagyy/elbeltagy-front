import { memo, useEffect, useState } from 'react'
import MakeSelect from '../../style/mui/styled/MakeSelect'
import { useLazyGetUnitsQuery } from '../../toolkit/apis/unitsApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import TabInfo from '../ui/TabInfo'
import { lang } from '../../settings/constants/arlang'

import { Alert } from '@mui/material'
import LoaderWithText from '../../style/mui/loaders/LoaderWithText'

function SelectUnit({ grade = 'all', activeUnit, setActiveUnit, reset = [], units, setUnits }) {

  const [counts, setCounts] = useState('loading ...')

  const [getData, status] = useLazyGetUnitsQuery()
  const [getUnits] = useLazyGetData(getData)

  useEffect(() => {

    const trigger = async () => {
      const unitsRes = await getUnits({ grade: grade ? grade : 'all' }, false)
      setUnits(unitsRes.units)
      setCounts(unitsRes.count)
    }

    trigger()

  }, [grade, units])


  if (status.isLoading) return <LoaderWithText />

  if (status.isSuccess && units.length === 0) return <Alert variant="filled" severity="warning">
    لا يوجد وحدات فى هذا الصف الدراسى !
  </Alert>

  return (
    <>
      <TabInfo count={counts} i={1} title={lang.CHOOSE_UNIT} />
      <MakeSelect title={lang.CHOOSE_UNIT} reset={reset} value={activeUnit} setValue={setActiveUnit} options={makeArrWithValueAndLabel(units, { value: '_id', label: 'name' })} />
    </>
  )
}

export default memo(SelectUnit)
