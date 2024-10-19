import { Alert, Box, Button } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react'

import * as Yup from "yup"
import MakeInput from './MakeInput';
import Loader from '../../style/mui/loaders/Loader';
import { FilledHoverBtn } from '../../style/buttonsStyles';

const SEND = 'إرسال'

export default function CreateFormik({ inputs, onSubmit, status, btnWidth, enableReinitialize = true }) {


    let data = {}
    const validation = {}

    // arrange data of input with ===> name , validation, initial value
    inputs.forEach((input, i) => {
        if (input.name) {
            if (input.value === 0) {
                data[input.name] = 0
            } else {
                data[input.name] = input.value ?? ""
            }
        }

        if (input.validation) {
            validation[input.name] = input.validation
        }
    });

    const validationSchema = Yup.object().shape(validation)

    return (
        <>
            <Box width={"100%"}>
                <Formik enableReinitialize={enableReinitialize} initialValues={data} onSubmit={onSubmit} validationSchema={validationSchema} validateOnChange={false}>
                    {(props) => (
                        <Form onChange={() => props.validateForm()} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

                            <Box display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"} width={'100%'} >
                                {inputs && inputs.map((input, i) => {
                                    return (
                                        <Box key={i} sx={{ width: input.width || '100%', margin: !input.hidden && '14px 0' }}>
                                            <MakeInput input={input} props={props} />
                                        </Box>
                                    )
                                })}
                            </Box>

                            <FilledHoverBtn
                                type='submit'
                                disabled={status?.isLoading || !props.dirty ? true : false}
                                sx={{
                                    width: btnWidth || '100%'
                                }}
                            >
                                {status?.isLoading ? <Loader color={'orange'} /> : SEND}
                            </FilledHoverBtn>
                        </Form>
                    )}
                </Formik>

            </Box>
        </>
    )
}
