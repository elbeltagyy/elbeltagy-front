import { Box, Button, CardContent, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import TextBorderAround from '../ui/TextBorderAround'
import Image from '../ui/Image'
import Separator from '../ui/Separator'
import { useMarkAQuestionMutation } from '../../toolkit/apis/answersApi'
import usePostData from '../../hooks/usePostData'
import AnsweredQuestion from './AnsweredQuestion'
import Loader from '../../style/mui/loaders/Loader'
import { FlexBetween, FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import { useState } from 'react'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import BtnModal from '../ui/BtnModal'

function ShowQuestion({ question, index, setQuestions, method, editUser, activeAttemptId, setActiveAttemptId, examId, tokenTime, course }) {

    const setOneQuestion = (qId, newQVal) => {
        setQuestions(prev => {
            return prev.map(question => {
                if (question._id === qId) {
                    return { ...question, ...newQVal }
                } else {
                    return question
                }
            })
        })
    }

    const handleChange = (chosenOption) => {
        setOneQuestion(question._id, { ...question, chosenOptionId: chosenOption })
    }

    const [sendAnswer, status] = useMarkAQuestionMutation()
    const [markAQ] = usePostData(sendAnswer)

    const [open, setOpen] = useState(false)

    const markFc = async () => {
        const markedQuestion = await markAQ({ ...question, activeAttemptId, examId, tokenTime, course }) //return rtOptionId, attemptId (if Found)
        if (markedQuestion.user) {
            editUser(markedQuestion.user)
        }
        setOneQuestion(question._id, { ...question, chosenOptionId: question.chosenOptionId || null, ...markedQuestion, }) //, hasMarked: true
    }

    if ((question?.chosenOptionId || question?.chosenOptionId === null) && question.rtOptionId) {
        return <AnsweredQuestion setQuestion={setOneQuestion} currentQuestion={question} index={index} />
    }
    return (
        <>
            <CardContent>
                <Box sx={{ width: "fit-content", m: 'auto' }}>
                    <TextBorderAround>
                        السؤال {index + 1}
                    </TextBorderAround>
                </Box>

                <FlexColumn sx={{ alignItems: 'flex-start' }}>
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
                </FlexColumn>

                <FlexRow gap={'16px'} my={'12px'} sx={{ flexWrap: 'wrap-reverse', flexDirection: 'row-reverse', justifyContent: 'space-evenly', alignItems: 'flex-end' }}>
                    <Box sx={{ flex: .9 }}>
                        <Box sx={{ position: 'relative' }}>
                            {status.isLoading && (

                                <FlexColumn sx={{ bgcolor: 'grey.400', height: '100%', width: '100%', position: 'absolute', pointerEvents: 'none', zIndex: 3, opacity: '70%' }}>
                                    <Loader sx={{ opacity: '100%' }} color={'orange'} />
                                </FlexColumn>
                            )}

                            <FormControl disabled={status.isLoading} sx={{ width: '100%', color: 'neutral.0', overflow: 'auto' }}>

                                <FormLabel id="demo-controlled-radio-buttons-group">اختر مما يلى</FormLabel>

                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={question.chosenOptionId || ''}
                                    onChange={(e, optionId) => {
                                        handleChange(optionId)
                                    }} >
                                    <Grid container spacing={2}>
                                        {question.options && question.options.map((option, i) => {

                                            return (
                                                <Grid key={i} item xs={12} >
                                                    <Button disabled={status.isLoading} onClick={() => {
                                                        handleChange(option.id)
                                                    }} sx={{ color: 'inherit', textTransform: 'none', textAlign: "left" }}>
                                                        {i + 1} -
                                                        <FormControlLabel value={option.id} control={<Radio sx={{ mx: '6px', textTransform: 'default' }} />} label={option.title} />
                                                    </Button>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        {method?.markQ && (
                            <Button color="warning" variant="contained" onClick={() => setOpen(true)} disabled={status.isLoading} sx={{ mx: '16px' }} >
                                {status.isLoading ? <Loader /> : 'تصحيح السؤال'}
                            </Button>
                        )}
                    </Box>

                    {question.image?.url && (
                        <Box sx={{ minWidth: '200px', flex: 1 }}>
                            <BtnModal btn={<FlexColumn>
                                <Image img={question.image?.url} sx={{ m: 'auto', my: '16px' }} />
                                <Button size='small' variant='outlined' endIcon={<MdOutlineRemoveRedEye />}>عرض الصوره</Button>
                            </FlexColumn>}>
                                <Image img={question.image?.url} sx={{ m: 'auto', my: '16px' }} />
                            </BtnModal>
                        </Box>
                    )}
                </FlexRow>

            </CardContent >

            <ModalStyled
                open={open}
                setOpen={setOpen}
                action={markFc} title={'هل انت متاكد من تعليم السؤال؟'}
                desc={question.chosenOptionId ? 'لقد اخترت ' + question.options?.find(opt => opt?.id === question?.chosenOptionId)?.title : 'انت لم تجب عن هذا السؤال !'} />
        </>
    )
}
// image
export default ShowQuestion
