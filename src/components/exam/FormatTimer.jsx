import { Box, Typography, useTheme } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { convertToMs, formatDuration } from '../../settings/constants/dateConstants';
import { useEffect, useRef } from 'react';

function FormatTimer({ time, setTime, submit, exam }) {
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

        } else if (time <= 0) {
            clearInterval(timer.current)
            submit()
        }

        //unmount
        return () => clearInterval(timer.current);
    }, [time]);


    return (
        <Box display={"flex"}
            justifyContent={"center"}
            alignItems={'center'}
            gap={'6px'}
            bgcolor={time <= 60 * 1000 ? theme.palette.error.main : theme.palette.primary[600]}
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
    )
}

export default FormatTimer
