import React from 'react'
import { FlexBetween, FlexRow } from '../../style/mui/styled/Flexbox'
import TabInfo from '../ui/TabInfo'
import { formatDuration } from '../../settings/constants/dateConstants'

function ExamInfo({ exam }) {

    const total = exam.questions.reduce((acc, question) => {
        return acc += question.points || 1
    }, 0)

    if (!exam) return <></>

    return (
        <FlexRow gap={'16px'} >
            <TabInfo count={formatDuration(exam.time)} i={1} title={"الوقت"} />
            <TabInfo count={(total)} i={0} title={"الدرجه الكليه"} />
            <TabInfo count={(exam.attemptsNums)} i={3} title={"عدد المحاولات"} />
        </FlexRow>
    )
}

export default ExamInfo
