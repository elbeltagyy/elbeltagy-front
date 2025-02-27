import { Box } from '@mui/material'
import { useState } from 'react'
import { FilledHoverBtn } from '../../style/buttonsStyles'
import MakeForm from '../../tools/makeform/MakeForm'
import { lang } from '../../settings/constants/arlang'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import gradeConstants from '../../settings/constants/gradeConstants'
import { user_roles } from '../../settings/constants/roles'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import { useCreateReportMutation } from '../../toolkit/apis/reportsApi'
import usePostData from '../../hooks/usePostData'
import Section from '../../style/mui/styled/Section'
import GetUsersPage from '../../pages/admin/GetUsersPage'
import TitleWithDividers from '../ui/TitleWithDividers'
import SwitchStyled from '../../style/mui/styled/SwitchStyled'
import { FlexColumn } from '../../style/mui/styled/Flexbox'

function CreateReport() {

    const [excludedUsers, setExcludedUsers] = useState([])
    const [isExcluded, setIsExcluded] = useState(true)

    const [open, setOpen] = useState(false)

    const [sendData, status] = useCreateReportMutation()
    const [createReport] = usePostData(sendData)

    const trigger = async (values) => {
        await createReport({ ...values, excludedUsers, isExcluded })
    }

    const inputs = [
        {
            name: 'title',
            label: 'اسم التقرير',
        }, {
            name: 'description',
            label: 'وصف التقرير',
        }, {
            name: 'startDate',
            label: 'من',
            type: 'fullDate'
        }, {
            name: 'endDate',
            label: 'الي',
            type: 'fullDate'
        }, {
            name: 'grade',
            label: lang.GRADE,
            type: 'select',
            options: makeArrWithValueAndLabel(gradeConstants, { value: 'index', label: 'name' }),
        }, {
            name: 'role',
            label: lang.ROLE,
            type: 'select',
            options: [user_roles.ONLINE, user_roles.STUDENT],
        }, {
            name: 'isActive',
            label: 'ارسال للطلاب الفعالين فقط',
            type: 'switch',
            value: true,
        },
    ]
    return (
        <FlexColumn>
            <FilledHoverBtn onClick={() => setOpen(!open)}>ارسال تقرير</FilledHoverBtn>
            <ModalStyled open={open} setOpen={setOpen} sx={{ minWidth: '100vw' }}>

                <Section sx={{ width: '100%' }}>
                    <TitleWithDividers title={'اختر الاعدادات بعنايه'} />
                    <MakeForm inputs={inputs} onSubmit={trigger} status={status} />
                    <TitleWithDividers title={isExcluded ? 'استثناء الطلاب' : 'ارسال لطلاب المختارين'} />
                    <SwitchStyled checked={isExcluded} onChange={setIsExcluded} label={isExcluded ? 'استثناء الطلاب' : 'ارسال لطلاب المختارين'} />
                </Section>
                <GetUsersPage setExcludedUsers={setExcludedUsers} isShowTitle={false} />

            </ModalStyled>
        </FlexColumn>
    )
}

export default CreateReport
