import { Box, Button, Card, CardContent, Chip, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, Radio, RadioGroup, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Separator from '../ui/Separator'
import Image from '../ui/Image'
import TextBorderAround from '../ui/TextBorderAround'
import TabInfo from '../ui/TabInfo'

function AnsweredQuestion({ currentQuestion, index }) {
    const theme = useTheme()

    const [question, setQuestion] = useState({})

    const isRightQuestion = (question.chosenOptionId === question.rtOptionId)
    const isNotAnswered = question.chosenOptionId === 'Not answered' || !question.chosenOptionId

    // console.log(theme.palette)
    useEffect(() => {
        setQuestion(currentQuestion)
    }, [currentQuestion])

    return (

        <CardContent>

            <CardContent>
                <Box>
                    <Box sx={{ width: "fit-content", m: 'auto' }}>
                        <TextBorderAround>
                            السؤال {index + 1}
                        </TextBorderAround>
                    </Box>

                    {question.image?.url && (
                        <Image img={question.image?.url} sx={{ maxWidth: '350px', m: 'auto', my: '16px' }} />
                    )}

                    <TabInfo
                        count={(question.chosenOptionId === question.rtOptionId ? question.points : 0) + '/' + question.points + ' درجه'}
                        title={'الدرجه'}
                        i={question.chosenOptionId === question.rtOptionId ? 1 : 3}
                    />
                    <Typography variant="h5" component="div" my={'12px'} >
                        السؤال :  {question.title}
                    </Typography>

                    {question.hints && (
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            ملحوظه:  {question.hints}
                        </Typography>
                    )}
                    <Separator />
                </Box>

                <Box>
                    <FormControl error={!isRightQuestion} sx={{ width: '100%', color: 'neutral.0' }}>
                        <FormLabel id="demo-controlled-radio-buttons-group"> {isRightQuestion ? "ايجابه صحيحه" : 'ايجابه خاطئه'} </FormLabel>

                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={currentQuestion.chosenOptionId || ''}
                        >
                            <Grid container spacing={2}>
                                {question.options && question.options.map((option, i) => {
                                    const isChosenOption = (question.chosenOptionId === option.id)

                                    const isWrong = isChosenOption && !isRightQuestion

                                    const isThisRightOption = (question.rtOptionId === option.id)

                                    return (
                                        <Grid key={i} item xs={12}>
                                            {i + 1} -
                                            <FormControlLabel
                                                sx={{ pointerEvents: 'none' }}
                                                value={option.id}
                                                control={
                                                    <Radio color={isWrong ? 'error' : 'success'}
                                                        checked={isThisRightOption || isChosenOption || false}
                                                        disableTouchRipple sx={{ mx: '6px' }} />} label={option.title} />
                                        </Grid>
                                    )
                                })}
                            </Grid>

                        </RadioGroup>
                        {isNotAnswered && (
                            <FormHelperText>لم تجب هذا السؤال !</FormHelperText>
                        )}
                    </FormControl>
                </Box>
            </CardContent >

        </CardContent>
    )
}
// image
export default AnsweredQuestion
