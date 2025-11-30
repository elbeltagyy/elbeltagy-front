import { Alert, Box, Button, Card, CardActions, CardContent, Typography, useTheme } from '@mui/material'
import { FieldArray, useField } from 'formik'
import { memo, useCallback, useEffect, useState } from 'react'

import MakePagination from "./components/MakePagination"

import NestedInput from './NestedInput'
import { ErrorBtn, FilledHoverBtn } from '../../style/buttonsStyles'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import QNotSchema from './QNotSchema'

function MakeChunk({ input, inputName, values, showError, error }) {
    const theme = useTheme()
    const [currentValueIndex, setCurrentValueIndex] = useState(0)
    const [isRemove, setRemove] = useState(false)
    const [freeze, setFreeze] = useState({})

    const [linkedQsState, meta, { setValue: setLinkedQs }] = useField('linkedQuestions')

    // console.log('input Name from makeChunk ==>', inputName)
    const removeLinkedQ = useCallback((toRemove) => {
        const linkedQs = linkedQsState.value || []
        const matchIndex = linkedQs.findIndex(q => q._id === toRemove._id)

        if (matchIndex !== -1) {
            const updated = [...linkedQs]
            updated.splice(matchIndex, 1)
            setLinkedQs(updated)
        }
    }, [linkedQsState.value])

    const disabledNext = values.length <= 0 || values.length === (currentValueIndex + 1) ? true : false
    const disabledPre = values.length <= 0 || (currentValueIndex) === 0 ? true : false

    const handleNext = useCallback(() => setCurrentValueIndex(i => i + 1), [])
    const handlePrev = useCallback(() => setCurrentValueIndex(i => i - 1), [])

    const removeValue = (remove, index) => {
        removeLinkedQ(values[index])

        if (index !== 0) {
            setCurrentValueIndex(index - 1)
        }
        delete freeze[index]
        remove(index)
    }

    useEffect(() => {
        if (values?.length === 1) {
            setCurrentValueIndex(0)
        }
    }, [values?.length])

    return (
        <FieldArray name={inputName}>
            {({ insert, remove, push }) => {

                return (
                    <Box width={'100%'}>
                        {values.length > 0 && (
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                {/* start of chunk */}
                                <Card sx={{ bgcolor: theme.palette.background.alt, width: '100%', position: 'relative' }} >

                                    {values[currentValueIndex]?.notSchema && <QNotSchema
                                        freeze={freeze[currentValueIndex] ?? true}
                                        setFreeze={(v) => setFreeze({ ...freeze, [currentValueIndex]: v })}
                                        origin={values[currentValueIndex]}
                                    />}


                                    <CardContent sx={{ position: 'relative' }}>
                                        {((freeze[currentValueIndex] ?? true) && values[currentValueIndex]?.notSchema) && (
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    bgcolor: 'rgba(255,255,255,0.6)',
                                                    zIndex: 10,
                                                    borderRadius: 'inherit',
                                                    cursor: 'not-allowed',
                                                }}
                                            />
                                        )}

                                        <Typography
                                            sx={{
                                                fontWeight: "600",
                                                mb: "8px"
                                            }}
                                            variant="h5"
                                            component="div"
                                            textAlign={"center"}
                                        >
                                            السؤال {currentValueIndex + 1}</Typography>

                                        <NestedInput
                                            inputName={inputName}
                                            input={input}
                                            index={currentValueIndex} />
                                    </CardContent>

                                    <CardActions sx={{ width: '100%', justifyContent: 'space-evenly' }}>
                                        <FilledHoverBtn colorm={'orange'} disabled={disabledPre} onClick={handlePrev}>
                                            السؤال السابق
                                        </FilledHoverBtn>

                                        <FilledHoverBtn
                                            disabled={disabledNext}
                                            onClick={handleNext}>
                                            السؤال التالى
                                        </FilledHoverBtn>
                                    </CardActions>

                                    <Box sx={{ display: "flex", justifyContent: "center" }} >
                                        <MakePagination errorsList={error || []} count={values.length} setIndex={setCurrentValueIndex} index={currentValueIndex} />
                                    </Box>

                                    {input.removeLabel && (
                                        <FlexColumn >
                                            <ErrorBtn
                                                style={{ width: "auto", m: 'auto' }}
                                                onClick={() => setRemove(true)}
                                            >
                                                {input.removeLabel}
                                            </ErrorBtn>

                                            <ModalStyled
                                                open={isRemove}
                                                setOpen={setRemove}
                                                title={"هل انت متاكد من حذف هذا السؤال ؟"}
                                                desc="لا يمكن استرجاع البيانات المحذوفه ."
                                                action={() => removeValue(remove, currentValueIndex)}
                                            />
                                        </FlexColumn>
                                    )}
                                </Card>
                                {/* end of chunk */}
                            </Box>
                        )}

                        {showError && (
                            <Alert sx={{ m: "5px" }} severity='error'>{error}</Alert>
                        )}
                        <FlexRow gap={'16px'} my={'16px'} sx={{ width: '100%' }}>

                            {input.addLabel && (
                                <Box >
                                    <Button
                                        variant='outlined'
                                        style={{ width: "auto" }}
                                        onClick={() => push(input.schema)}
                                    >
                                        {input.addLabel}
                                    </Button>
                                </Box>
                            )}

                            {input.addLabeltAf && (
                                <Box >
                                    <Button
                                        variant='outlined'
                                        style={{ width: "auto" }}
                                        onClick={() => push(input.tAfSchema)}
                                    >
                                        {input.addLabeltAf}
                                    </Button>
                                </Box>
                            )}
                        </FlexRow>

                    </Box>
                )
            }
            }


        </FieldArray >
    )
}

export default memo(MakeChunk)