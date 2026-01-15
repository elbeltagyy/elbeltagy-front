import { useEffect, useState } from 'react'
import { FilledHoverBtn } from '../../style/buttonsStyles'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import Section from '../../style/mui/styled/Section'
import GetUsersPage from '../../pages/admin/GetUsersPage'
import TitleWithDividers from '../ui/TitleWithDividers'
import SwitchStyled from '../../style/mui/styled/SwitchStyled'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import CourseName from '../content/CourseName'

import TabsAutoStyled from '../../style/mui/styled/TabsAutoStyled'
import MessagesCompo from './MessagesCompo'
import ReportCompo from './ReportCompo'
import TabInfo from '../ui/TabInfo'

function CreateReport({ course = '' }) {

    const [excludedUsers, setExcludedUsers] = useState([])
    const [isExcluded, setIsExcluded] = useState(true)

    const [open, setOpen] = useState(false)

    const messageToSend = isExcluded ?
        <TabInfo isBold={false} title={'استبعاد طلاب '} count={
            '(' + "سيتم الارسال الي " + (excludedUsers.length > 0 ? 'جميع الطلاب ماعدا ' + excludedUsers.length + ' طالب' : 'جميع الطلاب') + ')'
        } i={3} />
        : <TabInfo isBold={false} title={'ارسال لطلاب المختارين '} count={
            '(' + "سيتم الارسال الي " + excludedUsers.length + ' طالب' + ')'
        } i={1} />

    const tabs = [
        {
            value: 0, label: 'ارسال تقرير', component: <ReportCompo modalInfo={{desc: messageToSend}} isExcluded={isExcluded}
                course={course} excludedUsers={excludedUsers} />,
        },
        {
            value: 1, label: 'ارسال رسائل', component: <MessagesCompo modalInfo={{desc: messageToSend}}  isExcluded={isExcluded}
                course={course} excludedUsers={excludedUsers} />,
        },
    ]

    useEffect(() => {
        setExcludedUsers([])
    }, [open])

    return (
        <FlexColumn>
            <FilledHoverBtn onClick={() => setOpen(!open)}>ارسال تقرير</FilledHoverBtn>

            <ModalStyled open={open} setOpen={setOpen} sx={{ minWidth: '100vw' }}>

                <Section sx={{ width: '100%' }}>
                    <TitleWithDividers title={'اختر الاعدادات بعنايه'} />
                    {course && (
                        <CourseName course={course} title={'اسم الكورس : '} />
                    )}

                    <TabsAutoStyled originalTabs={tabs} />
                    <SwitchStyled
                        checked={isExcluded}
                        onChange={setIsExcluded}
                        label={messageToSend} />
                </Section>

                <GetUsersPage  setExcludedUsers={setExcludedUsers} isShowTitle={false} isShowCreate={false} isShowGrades={course ? false : true} courses={[course]} />

            </ModalStyled>
        </FlexColumn>
    )
}

export default CreateReport
