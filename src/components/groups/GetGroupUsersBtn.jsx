import { useState } from 'react'

import ModalStyled from '../../style/mui/styled/ModalStyled'
import TitleWithDividers from '../ui/TitleWithDividers'
import GetGroupUsers from './GetGroupUsers'
import { Box, Button } from '@mui/material'
import Section from '../../style/mui/styled/Section'

function GetGroupUsersBtn({ group }) {
    const [open, setOpen] = useState(false)
    return (
        <Box>
            <Button size='small' onClick={() => setOpen(true)}>
                عرض المستخدمين
            </Button>

            <ModalStyled open={open} setOpen={setOpen}>
                <Section>
                    <TitleWithDividers title={'الاعضاء فى جروب ' + group?.name} />
                    <GetGroupUsers group={group} />
                </Section>
            </ModalStyled>
        </Box>
    )
}

export default GetGroupUsersBtn
