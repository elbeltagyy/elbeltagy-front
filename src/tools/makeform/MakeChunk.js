import { Alert, Box, Button, Card, CardActions, CardContent, Typography, useTheme } from '@mui/material'
import { FieldArray } from 'formik'
import React, { useEffect, useState } from 'react'

import { hasError } from './constants/hasError'
// import { buttonError, buttonStyle } from '../../../styles/buttonsStyles'
import MakePagination from "./components/MakePagination"
// import QuizPagination from "./quiz/QuizPagination";
import NestedInput from './NestedInput'
import { ErrorBtn, FilledHoverBtn } from '../../style/buttonsStyles'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import ModalStyled from '../../style/mui/styled/ModalStyled'

export default function MakeChunk({ props, input, inputName, values }) {
    const theme = useTheme()
    const [currentValueIndex, setCurrentValueIndex] = useState(0)
    const [isRemove, setRemove] = useState(false)

    const disabledNext = values.length <= 0 || values.length === (currentValueIndex + 1) ? true : false
    const disabledPre = values.length <= 0 || (currentValueIndex) === 0 ? true : false

    const removeValue = (remove, index) => {
        if (index !== 0) {
            setCurrentValueIndex(index - 1)
        }
        remove(index)
    }


    return (
        <FieldArray name={inputName}>
            {({ insert, remove, push }) => (
                <Box width={'100%'}>
                    {values.length > 0 && ( // values  props.getFieldValue(inputname)
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            {/* start of chunk */}
                            <Card sx={{ bgcolor: theme.palette.background.alt, width: '100%' }}>
                                <CardContent>
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
                                    <NestedInput inputName={inputName} input={input} props={props} index={currentValueIndex} />
                                </CardContent>

                                <CardActions sx={{ width: '100%', justifyContent: 'space-evenly' }}>
                                    <FilledHoverBtn colorm={'orange'} disabled={disabledPre} onClick={() => setCurrentValueIndex(currentValueIndex - 1)}>
                                        السؤال السابق
                                    </FilledHoverBtn>

                                    <FilledHoverBtn
                                        disabled={disabledNext}
                                        onClick={() => setCurrentValueIndex(currentValueIndex + 1)}>
                                        السؤال التالى
                                    </FilledHoverBtn>
                                </CardActions>

                                <Box sx={{ display: "flex", justifyContent: "center" }} >
                                    <MakePagination count={values.length} setIndex={setCurrentValueIndex} index={currentValueIndex} />
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

                    {hasError(props, inputName) && (
                        <Alert sx={{ m: "5px" }} severity='error'>{props.getFieldMeta(inputName).error}</Alert>
                    )}

                    {input.addLabel && (
                        <Box >
                            <Button
                                style={{ width: "auto" }}
                                onClick={() => push(input.schema)}
                            >
                                {input.addLabel}
                            </Button>
                        </Box>
                    )}


                </Box>
            )
            }


        </FieldArray >
    )
}
