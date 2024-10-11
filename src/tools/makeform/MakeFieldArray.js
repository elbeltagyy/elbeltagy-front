import { Alert, Box, Button, Grid } from '@mui/material'
import { FieldArray } from 'formik'
import React from 'react'

import MakeInput from './MakeInput'
import { hasError } from './constants/hasError'
import NestedInput from './NestedInput'

export default function MakeFieldArray({ props, input, inputName, values }) {

    return (
        <FieldArray name={inputName}>
            {({ insert, remove, push }) => (
                <Box >
                    <Grid container spacing={2}>

                        {values?.length > 0 && values?.map((question, index) => {
                            // console.log(props)
                            return (
                                <Grid key={index} item xs={12} md={6}>

                                    <NestedInput inputName={inputName} input={input} props={props} index={index} />

                                    {input.removeLabel && (
                                        <Box >
                                            <Button
                                                style={{ width: "auto" }}
                                                onClick={() => remove(index)}
                                            >
                                                {input.removeLabel}
                                            </Button>
                                        </Box>
                                    )}

                                </Grid>
                            )
                        })}
                    </Grid>

                    {hasError(props, inputName) && (
                        <Alert sx={{ m: "8px 0" }} severity='error'>{props.getFieldMeta(inputName).error}</Alert>
                    )}


                    {input.addLabel && (
                        <Box sx={{ m: "8px 0" }} >
                            <Button
                                style={{ width: "auto" }}
                                onClick={() => push(input.schema)}
                            >
                                {input.addLabel}
                            </Button>
                        </Box>
                    )}

                </Box>
            )}
        </FieldArray>
    )
}
