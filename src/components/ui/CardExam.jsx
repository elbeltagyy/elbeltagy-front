import styled from '@emotion/styled'
import { Box, Button, Chip, Divider, Typography, useTheme } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { useNavigate } from 'react-router-dom'
import { FlexBetween } from '../../style/mui/styled/Flexbox'

export default function CardExam({  isManage, editExam, startExam }) {

    const theme = useTheme()


    const ExamTypoKey = styled(Typography)({
        p: 1, fontSize: "14px", fontWeight: "600"
    })

    const ExamTypoValue = styled(Typography)({
        m: 2, p: 1, fontsize: "12px"
    })

    const [formOptions, setFormOptions] = useState({
        isLoading: false,
        isShowModal: false
    })

    return (
        <Box
            sx={{
                m: "30px 0",
                p: 2,
                bgcolor: theme.palette.background.alt,
                borderRadius: '8px',
                display: "flex", justifyContent: "center", flexWrap: "wrap", flexDirection: "column"
            }}>

            <Box>

                <ExamTypoKey sx={{ textAlign: "center", m: "5px 0" }}></ExamTypoKey>

                <Divider color={theme.palette.primary[300]} />

                <FlexBetween sx={{ m: "5px 0" }}>
                    <ExamTypoKey>heelo</ExamTypoKey>
                    <ExamTypoValue>2020</ExamTypoValue>
                </FlexBetween>

                <FlexBetween sx={{ m: "5px 0" }}>
                    <ExamTypoKey>key</ExamTypoKey>
                    <ExamTypoValue>value</ExamTypoValue>
                </FlexBetween >

                <FlexBetween sx={{ m: "5px 0" }}>
                    <ExamTypoKey>test</ExamTypoKey>
                    <ExamTypoValue>me</ExamTypoValue>
                </FlexBetween>
            </Box>
        </Box>
    )
}
