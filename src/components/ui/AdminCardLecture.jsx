import React from 'react'
import CardStyled from '../../style/mui/styled/CardStyled'
import { Box, Button } from '@mui/material'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import Image from './Image'
import LectureUpdate from '../courses/LectureUpdate'
import { FilledHoverBtn } from '../../style/buttonsStyles'
import { lang } from '../../settings/constants/arlang'

function AdminCardLecture({ lecture }) {
  return (
    <FlexRow gap={'30px'} sx={{ alignItems: 'flex-start' }} width={'100%'} >
      <FlexColumn>
        <Image img={lecture?.thumbnail?.url} sx={{ maxWidth: '300px' }} />
        <FilledHoverBtn>{lang.STATISTICS} </FilledHoverBtn>
      </FlexColumn>

      <Box maxWidth={'500px'}>
        <LectureUpdate lecture={lecture} />
      </Box>
    </FlexRow>
  )
}

export default AdminCardLecture
