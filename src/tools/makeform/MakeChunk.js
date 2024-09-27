import { Alert, Box, Button, Card, CardActions, CardContent, Typography, useTheme } from '@mui/material'
import { FieldArray } from 'formik'
import React, { useEffect, useState } from 'react'

import { hasError } from './constants/hasError'
// import { buttonError, buttonStyle } from '../../../styles/buttonsStyles'
import MakePagination from "./components/MakePagination"
// import QuizPagination from "./quiz/QuizPagination";
import NestedInput from './NestedInput'

export default function MakeChunk({ props, input, inputName, values }) {
    const theme = useTheme()
    const [currentValueIndex, setCurrentValueIndex] = useState(0)

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
                <Box>
                    {values.length > 0 && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            {/* start of chunk */}

                            <Card sx={{ bgcolor: theme.palette.background.alt }}>

                                <CardContent>
                                    <Typography
                                        sx={{
                                            fontWeight: "600",
                                            mb: "8px"
                                        }}
                                        variant="h3"
                                        component="div"
                                        textAlign={"center"}
                                    >
                                        question {currentValueIndex + 1}</Typography>
                                    <NestedInput inputName={inputName} input={input} props={props} index={currentValueIndex} />
                                </CardContent>

                                <CardActions>

                                    <Button  disabled={disabledPre} onClick={() => setCurrentValueIndex(currentValueIndex - 1)}>
                                        previous question
                                    </Button>

                                    <Button 
                                        disabled={disabledNext}
                                        onClick={() => setCurrentValueIndex(currentValueIndex + 1)}>
                                        next question
                                    </Button>
                                </CardActions>
                                <Box sx={{ display: "flex", justifyContent: "center" }} >
                                    <MakePagination count={values.length} setIndex={setCurrentValueIndex} index={currentValueIndex} />
                                </Box>

                                {input.removeLabel && (
                                    <Box >
                                        <Button
                                            style={{ width: "auto" }}
                                            // sx={buttonError}
                                            // onClick={addFc}
                                            onClick={() => removeValue(remove, currentValueIndex)}
                                        >
                                            {input.removeLabel}
                                        </Button>
                                    </Box>
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
                                
                                // onClick={addFc}
                                onClick={() => push(input.add)}
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
