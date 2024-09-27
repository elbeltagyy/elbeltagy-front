import React, { useEffect, useState } from 'react'
import TabsStyled from '../../style/mui/styled/TabsStyled'
import { filterArrWithValue } from '../../tools/fcs/MakeArray'
import gradeConstants from '../../settings/constants/gradeConstants'
import { useLazyGetUsersCountQuery } from '../../toolkit/apis/statisticsApi';
import useLazyGetData from '../../hooks/useLazyGetData';
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton';
import { lang } from '../../settings/constants/arlang';

function GradesTabs({ setGrade, counts = { allGrades: "", grade1: '', grade2: '' } }) {

    const [value, setValue] = React.useState(0);
    const [gradeOptions, setGradeOptions] = useState([])

    useEffect(() => {
        setGradeOptions(
            [{ label: lang.ALL, value: 0, count: counts?.allGrades?.count },
            { label: gradeConstants[0].name, value: gradeConstants[0].index, count: counts?.grade1?.count },
            { label: gradeConstants[1].name, value: gradeConstants[1].index, count: counts?.grade2?.count },
            ]
        )

    }, [counts])

    // filter Fc from tabs
    useEffect(() => {
        const filteredGrade = filterArrWithValue(gradeConstants, { key: 'index', value })[0]

        setGrade(
            filteredGrade?.index //return index of the grade
        )
    }, [value])

    if (gradeOptions.length === 0) return <LoaderSkeleton />

    return (
        <TabsStyled value={value} setValue={setValue}
            tabs={gradeOptions}
        />
    )
}

export default GradesTabs
