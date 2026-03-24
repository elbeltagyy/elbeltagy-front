import { useEffect, useState } from 'react'

import TitleWithDividers from '../ui/TitleWithDividers'
import SwitchStyled from '../../style/mui/styled/SwitchStyled'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import CourseName from '../content/CourseName'

import TabsAutoStyled from '../../style/mui/styled/TabsAutoStyled'

import ReportCompo from './ReportCompo'
import TabInfo from '../ui/TabInfo'
import Users from '../all/Users'

import NotificationsForm from '../notifications/NotificationsForm'
import BtnModal from '../ui/BtnModal'

function CreateReport({ course = '' }) {

    const [excludedUsers, setExcludedUsers] = useState([])
    const [isExcluded, setIsExcluded] = useState(true)
    const [matches, setMatches] = useState({})
    const [count, setCount] = useState()

    const [open, setOpen] = useState(false)

    const messageToSend = isExcluded ? <FlexColumn sx={{ alignItems: 'flex-start' }}>

        <TabInfo isBold={false} title={'استبعاد طلاب '} count={
            '(' + "سيتم الارسال الي " + (excludedUsers.length ? `جميع الطلاب (${count - excludedUsers.length}) عدا ` + excludedUsers.length + ' طالب' : `جميع الطلاب (${count})`) + ')'
        } i={3} />
        <TabInfo count={'يتم الارسال طبقا للنتائج البحث'} i={0} />
        <TabInfo count={'- لايتم الارسال الي ادمن او مشرف -'} i={0} />
    </FlexColumn>
        : <TabInfo isBold={false} title={'ارسال لطلاب المختارين '} count={
            '(' + "سيتم الارسال الي " + excludedUsers.length + ' طالب' + ')'
        } i={1} />

    const tabs = [
        {
            value: 0, label: 'ارسال تقرير', component: <ReportCompo
                modalInfo={{ desc: messageToSend }} isExcluded={isExcluded}
                course={course} excludedUsers={excludedUsers} matches={matches} />,
        },
        {
            value: 1, label: 'ارسال رسائل',
            component: <NotificationsForm users={excludedUsers} isExcluded={isExcluded} matches={matches} />
            // <MessagesCompo modalInfo={{ desc: messageToSend }} isExcluded={isExcluded}
            //     course={course} excludedUsers={excludedUsers} />,
        },
    ]

    useEffect(() => {
        setExcludedUsers([])
    }, [open])

    // console.log(excludedUsers)
    return (
        <BtnModal btnName={'ارسال تقرير'} onClose={setOpen}>
            <TitleWithDividers title={'اختر الاعدادات بعنايه'} />
            {course && (
                <CourseName course={course} title={'اسم الكورس : '} />
            )}

            <TabsAutoStyled originalTabs={tabs} />
            <SwitchStyled
                checked={isExcluded}
                onChange={setIsExcluded}
                label={messageToSend} />
            {/* <GetUsersPage  setExcludedUsers={setExcludedUsers} isShowTitle={false} isShowCreate={false} isShowGrades={course ? false : true} courses={[course]} /> */}
            <Users setExcludedUsers={setExcludedUsers} filters={{ courses: course }} setMatches={setMatches} setCount={setCount} />
        </BtnModal>
    )
}

export default CreateReport
