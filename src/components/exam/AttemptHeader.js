import { Box, Chip, Paper, Typography, useTheme } from '@mui/material'

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { convertToMs, formatDuration, getFullDate } from '../../settings/constants/dateConstants';
import TitleWithDividers from '../ui/TitleWithDividers';
import TabInfo from '../ui/TabInfo';
import { FlexRow } from '../../style/mui/styled/Flexbox';
import Grid from '../../style/vanilla/Grid';
import ms from 'ms';

export default function AttemptHeader({ exam }) {

    const { assessment } = exam
    const theme = useTheme()

    return (
        <Paper sx={{ mb: 2, bgcolor: theme.palette.background.alt, width: '100%', p: '12px' }}>
            <TitleWithDividers title={exam.name} variant="h6" />

            <Grid>
                <TabInfo count={assessment?.score + ' / ' + assessment?.total} title={'الدرجه'} i={0} />
                <FlexRow justifyContent={'center'} gap={'12px'}>
                    <TabInfo count={assessment?.percentage.toFixed(2) + ' %'} title={'النسبه المئويه'} i={0} />
                    <Chip label={assessment?.rating} size='small' color={assessment?.percentage >= 75 ? "success" : 'error'} sx={{ m: "0 5px", transition: "none" }} />
                </FlexRow>
                <TabInfo count={getFullDate(exam.attempt.createdAt)} title={'تم فى'} i={1} />
                {exam.time && (
                    <TabInfo count={formatDuration(exam.time)} title={'وقت الاختبار'} i={1} />
                )}
            </Grid>

            {exam.tokenTime && (
                <FlexRow gap={'16px'}>

                    <Box display={"flex"}
                        justifyContent={"center"}
                        alignItems={'center'}
                        gap={'6px'}
                        bgcolor={theme.palette.primary[600]}
                        sx={{ transition: "all ease 2s", my: "12px" }}
                        borderRadius={"8px"}
                        p="10px"
                        width={"fit-content"}
                        color={'grey.0'}
                    >
                        <AccessTimeIcon />
                        <Typography variant="h6" color="inherit" component="div" fontWeight={"600"} sx={{ width: '80px' }} >
                            {formatDuration(exam.tokenTime)}
                        </Typography>
                    </Box>
                    <TabInfo count={ms(convertToMs(exam.time) - exam.tokenTime)} i={1} title={'الوقت الماخوذ'} />
                    <TabInfo count={ms(exam.tokenTime)} i={2} title={'الوقت المتبقى'} />
                </FlexRow>
            )}
        </Paper>
    )
}
