import { AppBar, Box, IconButton, Paper, Toolbar, Typography, useTheme } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { convertToMs, formatDuration } from '../../settings/constants/dateConstants';
import TitleWithDividers from '../ui/TitleWithDividers';


function QuizHeader({ exam, time, setTime, submit }) {

  const theme = useTheme()

  const timer = useRef()

  useEffect(() => {
    if (/[a-zA-Z]/.test(time)) {
      // Run something if there is a letter
      setTime(convertToMs(time))
    }
  }, [exam])

  useEffect(() => {
    //if not coverted => convert

    if (time > 0) {

      timer.current = setInterval(() => {
        setTime(time - 1000);
      }, 1000);
      // clearing interval
      return () => clearInterval(timer.current);

    } else if (time === 0) {
      clearInterval(timer.current)
      submit()
    }

    //unmount
    return () => clearInterval(timer.current);
  }, [time]);

  // time - exam name
  return (
    <Paper sx={{ mb: 2, bgcolor: theme.palette.background.alt, width: '100%', p: '12px' }}>
      <TitleWithDividers title={exam.name} variant="h6" />

      {/* <Typography variant="h6" color="inherit" component="div" fontWeight={"600"}>
          {exam.lessonName}
        </Typography> */}

      <Box display={"flex"}
        justifyContent={"center"}
        alignItems={'center'}
        gap={'6px'}
        bgcolor={time > 60 * 1000 ? theme.palette.primary[600] : theme.palette.error.main}
        sx={{ transition: "all ease 2s" }}
        borderRadius={"8px"}
        p="10px"
        width={"fit-content"}
        color={'grey.0'}
      >
        <AccessTimeIcon />
        <Typography variant="h6" color="inherit" component="div" fontWeight={"600"} sx={{ width: '80px' }} >
          {formatDuration(time)}
        </Typography>
      </Box>

    </Paper>
  )
}

export default QuizHeader
