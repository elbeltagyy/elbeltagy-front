import { useState } from 'react'
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

function CreateReport({ course = '' }) {

    const [excludedUsers, setExcludedUsers] = useState([])
    // const [isExcluded, setIsExcluded] = useState(true)

    const [open, setOpen] = useState(false)

    const tabs = [
        {
            value: 0, label: 'ارسال تقرير', component: <ReportCompo
                course={course} excludedUsers={excludedUsers} />,
        },
        {
            value: 1, label: 'ارسال رسائل', component: <MessagesCompo
                course={course} excludedUsers={excludedUsers}  />,
        },
    ]

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

                    {/* <TitleWithDividers title={isExcluded ? 'استثناء الطلاب' : 'ارسال لطلاب المختارين'} /> */}

                    {/* <SwitchStyled checked={isExcluded} onChange={setIsExcluded} label={isExcluded ? 'استثناء الطلاب' : 'ارسال لطلاب المختارين'} /> */}
                </Section>
                <GetUsersPage setExcludedUsers={setExcludedUsers} isShowTitle={false} isShowGrades={course ? false : true} courses={[course]} />

            </ModalStyled>
        </FlexColumn>
    )
}

export default CreateReport
