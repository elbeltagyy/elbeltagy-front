import { Alert, Box, Button, CardContent, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, Radio, RadioGroup, Typography, } from '@mui/material'
import Separator from '../ui/Separator'
import Image from '../ui/Image'
import TextBorderAround from '../ui/TextBorderAround'
import TabInfo from '../ui/TabInfo'
import AnswerHighlight from './AnswerHighlight'
import BtnModal from '../ui/BtnModal'
import Section from '../../style/mui/styled/Section'
import TitleWithDividers from '../ui/TitleWithDividers'
import InfoText from '../ui/InfoText'
import YoutubePlyr from '../content/YoutubePlyr'
import { FlexBetween, FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import { MdOutlineRemoveRedEye } from 'react-icons/md'

function AnsweredQuestion({ currentQuestion, index, setQuestion }) {

    const isRightQuestion = (currentQuestion.chosenOptionId === currentQuestion.rtOptionId)
    const isNotAnswered = currentQuestion.chosenOptionId === 'Not answered' || !currentQuestion.chosenOptionId
    const ifInAnswerState = currentQuestion.answer?._id && true

    return (
        <CardContent>
            <Box sx={{ width: "fit-content", m: 'auto' }}>
                <TextBorderAround>
                    السؤال {index + 1}
                </TextBorderAround>
            </Box>

            <FlexColumn sx={{ alignItems: 'flex-start' }}>
                {/* Header to Separator */}
                <Box sx={{ ml: 'auto' }}>
                    <AnswerHighlight setQuestion={setQuestion} question={currentQuestion} />
                </Box>
                <TabInfo
                    count={(currentQuestion.chosenOptionId === currentQuestion.rtOptionId ? currentQuestion.points : 0) + '/' + currentQuestion.points + ' درجه'}
                    title={'الدرجه'}
                    i={currentQuestion.chosenOptionId === currentQuestion.rtOptionId ? 1 : 3}
                />
                <Typography variant="h5" component="div" my={'12px'} >
                    السؤال :  {currentQuestion.title}
                </Typography>

                {currentQuestion.hints && (
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        ملحوظه:  {currentQuestion.hints}
                    </Typography>
                )}
                <Separator />
            </FlexColumn>


            <FlexRow gap={'16px'} my={'12px'} sx={{ flexWrap: 'wrap-reverse', flexDirection: 'row-reverse', justifyContent: 'space-evenly', alignItems: 'flex-end' }}>
                {/* Image and Options */}
                <Box sx={{ flex: .9 }}>
                    <Box>
                        <FormControl error={!isRightQuestion} sx={{ width: '100%', color: 'neutral.0' }}>
                            <FormLabel id="demo-controlled-radio-buttons-group" sx={{ color: 'primary.light' }}> {isRightQuestion ? "ايجابه صحيحه" : 'ايجابه خاطئه'} </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={currentQuestion.chosenOptionId || ''}
                            >
                                <Grid container spacing={2}>
                                    {currentQuestion.options && currentQuestion.options.map((option, i) => {
                                        const isChosenOption = (currentQuestion.chosenOptionId === option.id)

                                        const isWrong = isChosenOption && !isRightQuestion

                                        const isThisRightOption = (currentQuestion.rtOptionId === option.id)

                                        return (
                                            <Grid key={i} item xs={12}>
                                                {i + 1} -
                                                <FormControlLabel
                                                    sx={{ pointerEvents: 'none' }}
                                                    value={option.id}
                                                    control={
                                                        <Radio color={isWrong ? 'error' : 'success'}
                                                            checked={isThisRightOption || isChosenOption || false}
                                                            disableTouchRipple sx={{ mx: '6px', fontSize: '11px' }} />} label={option.title} />
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
                </Box>

                {currentQuestion.image?.url && (
                    <Box sx={{ minWidth: '200px', flex: 1 }}>
                        <BtnModal btn={<FlexColumn gap={'12px'}>
                            <Image img={currentQuestion.image?.url} />
                            <Button size='small' variant='outlined' endIcon={<MdOutlineRemoveRedEye />}>عرض الصوره</Button>
                        </FlexColumn>}>
                            <Image img={currentQuestion.image?.url} />
                        </BtnModal>
                    </Box>
                )}
            </FlexRow>


            {currentQuestion.note && (
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {currentQuestion.note}
                </Typography>
            )}

            {(ifInAnswerState && currentQuestion.clarifyText) && (
                <Alert severity='success' variant='outlined' sx={{ my: '16px', width: 'fit-content' }}><InfoText sx={{ flexDirection: 'column', alignItems: 'flex-start' }} label={'التوضيح'} description={currentQuestion.clarifyText} /></Alert>
            )}
            {(ifInAnswerState && currentQuestion.clarifyUrl) && (
                <BtnModal variant='outlined' parenetSx={{ alignItems: 'flex-start' }} btnName={'عرض فيديو التوضيح'} component={<Section>
                    <TitleWithDividers title={'فيديو التوضيح'} />
                    <YoutubePlyr url={currentQuestion.clarifyUrl} />
                </Section>} />
            )}

        </CardContent >
    )
}
// image
export default AnsweredQuestion
