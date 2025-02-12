import React, { useEffect, useState } from 'react'
import TabsStyled from '../../style/mui/styled/TabsStyled'
import { filterArrWithValue } from '../../tools/fcs/MakeArray'
import gradeConstants from '../../settings/constants/gradeConstants'

import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton';
import { lang } from '../../settings/constants/arlang';

function GradesTabs({ setGrade, counts = { allGrades: "", grade1: '', grade2: '' }, grade }) {

    // const [value, setValue] = React.useState(grade);
    const [gradeOptions, setGradeOptions] = useState([])

    useEffect(() => {
        setGradeOptions(
            [{ label: lang.ALL, value: 0, count: counts?.allGrades?.count },
            { label: gradeConstants[0].name, value: gradeConstants[0].index, count: counts?.grade1?.count },
            { label: gradeConstants[1].name, value: gradeConstants[1].index, count: counts?.grade2?.count },
            ]
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
