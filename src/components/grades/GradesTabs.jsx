import React, { useEffect, useMemo, useState } from 'react'
import TabsStyled from '../../style/mui/styled/TabsStyled'
import { filterArrWithValue, handelObjsOfArr, makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import gradeConstants from '../../settings/constants/gradeConstants'

import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton';
import { lang } from '../../settings/constants/arlang';

function GradesTabs({ setGrade, counts, grade }) {

    // const [value, setValue] = React.useState(grade);
    const addedCounts = useMemo(() => gradeConstants.map((g, i) => ({ ...g, count: counts[i + 1]?.count })), [counts])
    const grades = handelObjsOfArr(addedCounts, { value: 'index', label: 'name', count: 'count' })
    const [gradeOptions, setGradeOptions] = useState([])
    
    useEffect(() => {
        setGradeOptions(
            [{ label: lang.ALL, value: 0, count: counts[0]?.count }, ...grades]
        )

    }, [counts])

    if (gradeOptions.length === 0) return <LoaderSkeleton />

    return (
        <TabsStyled value={grade} setValue={setGrade}
            tabs={gradeOptions}
        />
    )
}

export default GradesTabs
