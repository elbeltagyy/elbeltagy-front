import { Box, Button } from '@mui/material'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import { useState } from 'react'
import Section from '../../style/mui/styled/Section'
import TitleWithDividers from '../ui/TitleWithDividers'
import GetGroupNotUsers from './GetGroupNotUsers'

function GetGroupNotUsersBtn({ group }) {
    const [open, setOpen] = useState(false)

    return (
        <Box>
            <Button size='small' onClick={() => setOpen(true)}>
                الغير مشتركين
            </Button>

            <ModalStyled open={open} setOpen={setOpen}>
                <Section>
                    <TitleWithDividers title={'الاعضاء الغير مشتركين فى ' + group?.name} />
                    <GetGroupNotUsers group={group} />
                </Section>
            </ModalStyled>
        </Box>
    )
}

export default GetGroupNotUsersBtn
