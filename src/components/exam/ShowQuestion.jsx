import { Box, Button, Card, CardContent, Chip, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TextBorderAround from '../ui/TextBorderAround'
import Image from '../ui/Image'
import Separator from '../ui/Separator'

function ShowQuestion({ currentQuestion, isLoading, index }) {
    const theme = useTheme()

    const [question, setQuestion] = useState({})


    useEffect(() => {
        setQuestion(currentQuestion)
    }, [currentQuestion])

    const handleChange = (chosenOption) => {
        setQuestion(pre => {
            return { ...pre, chosenOptionId: chosenOption }
        })
        currentQuestion.chosenOptionId = chosenOption
    }

    return (

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

                <Typography color="text.secondary">
                    درجه السؤال: {question.points} نقاط
                </Typography>
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
                <FormControl sx={{ width: '100%', color: 'neutral.0', overflow: 'auto' }}>
                    <FormLabel id="demo-controlled-radio-buttons-group">اختر مما يلى</FormLabel>

                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={currentQuestion.chosenOptionId || ''}
                        onChange={(e, optionId) => {
                            handleChange(optionId)
                        }}
                    >
                        <Grid container spacing={2}>
                            {question.options && question.options.map((option, i) => {

                                return (
                                    <Grid key={i} item xs={12} >
                                        <Button onClick={() => {
                                            handleChange(option.id)
                                        }} sx={{ color: 'inherit' }}>
                                            {i + 1} -
                                            <FormControlLabel value={option.id} control={<Radio sx={{ mx: '6px' }} />} label={option.title} />
                                        </Button>
                                    </Grid>
                                )
                            })}
                        </Grid>

                    </RadioGroup>
                </FormControl>
            </Box>
        </CardContent >
    )
}
// image
export default ShowQuestion
