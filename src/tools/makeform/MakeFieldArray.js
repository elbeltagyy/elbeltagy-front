import { Alert, Box, Button, Grid } from '@mui/material'
import { FieldArray } from 'formik'

import NestedInput from './NestedInput'
import { memo } from 'react'

function MakeFieldArray({ input, inputName, values, showError, error }) {

    return (
        <FieldArray name={inputName}>
            {({ remove, push }) => ( //insert
                <Box >
                    <Grid container spacing={2}>

                        {values?.length > 0 && values?.map((question, index) => {
                            // console.log(props)
                            return (
                                <Grid key={index} item xs={12} md={6}>

                                    <NestedInput inputName={inputName} input={input} index={index} />

                                    {input.removeLabel && (
                                        <Box >
                                            <Button
                                                color='error'
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

                    {showError && (
                        <Alert sx={{ m: "8px 0" }} severity='error'>{error}</Alert>
                    )}


                    {input.addLabel && (
                        <Box sx={{ m: "8px 0" }} >
                            <Button
                                style={{ width: "auto" }}
                                onClick={() => {
                                    if(input.isSchemaFc){
                                        push(input.schema())
                                    }else {
                                        push(input.schema)
                                    }
                                }}
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
export default memo(MakeFieldArray)