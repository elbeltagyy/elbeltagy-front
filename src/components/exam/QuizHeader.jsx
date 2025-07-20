import { Paper, useTheme } from '@mui/material'

import TitleWithDividers from '../ui/TitleWithDividers';
import FormatTimer from './FormatTimer';


function QuizHeader({ exam, time, setTime, submit }) {

  const theme = useTheme()

  // time - exam name
  return (
    <Paper sx={{ mb: 2, bgcolor: theme.palette.background.alt, width: '100%', p: '12px' }}>
      <TitleWithDividers title={exam.name} variant="h6" />

      {((time || time === 0) && (exam.isTime ?? true)) && (
        <FormatTimer exam={exam} setTime={setTime} submit={submit} time={time} />
      )}
    </Paper>
  )
}

export default QuizHeader
