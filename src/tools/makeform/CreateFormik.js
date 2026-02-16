import { Box } from '@mui/material';
import { Form, Formik } from 'formik';

import * as Yup from "yup"
import Loader from '../../style/mui/loaders/Loader';
import { FilledHoverBtn } from '../../style/buttonsStyles';
import DynamicFormGrid from './DynamicFormGrid2';
import { useMemo } from 'react';


//errors You fixed => 
//1- when i call data={VIewCOmpo: ()=> } it recreates in every render || fixed by making const (ViwCompo)
//2- props.resetForm({values}) true Syntax
// another solution but i don`t do => currentPrev, setCurrentPrev


export default function CreateFormik({ inputs, onSubmit, status, btnWidth, enableReinitialize = true, formDirection = 'column', btnStyle = {}, submitBtnStatus = false, disabledBtn = false, allowDirty = true, preValue = null, isAllDisabled = false, SEND = 'إرسال' }) {
    // arrange data of input with ===> name , validation, initial value
    const { data, validation } = useMemo(() => {
        let data = {}
        let validation = {}

        inputs.forEach((input, i) => {
            if (input.name) {
                if (preValue) {
                    data[input.name] = preValue[input.name] ?? ''
                } else if ((typeof input.value === 'object' && Object.keys(input.value || {}).length === 0) && input?.value) {
                    data[input.name] = ''
                } else if (input.value ?? true) {
                    data[input.name] = input.value ?? ""
                    // After That No
                } else if (input.type === 'array') {
                    data[input.name] = input.value || []
                } else {
                    data[input.name] = ''
                }
            }

            if (input.validation) {
                validation[input.name] = input.validation
            }

            if (isAllDisabled) {
                input.disabled = true
            }
        });

        return { data, validation }
    }, [inputs, preValue])

    const validationSchema = Yup.object().shape(validation)
    return (
        <>
            <Box width={"100%"} mt={'16px'}>
                <Formik enableReinitialize={enableReinitialize} initialValues={data} onSubmit={onSubmit} validationSchema={validationSchema} validateOnChange={true}>
                    {(props) => (
                        <Form style={{ display: 'flex', alignItems: 'center', flexDirection: formDirection }}>
                            {/*  onChange={() => props.validateForm()} */}

                            <DynamicFormGrid inputs={inputs} />

                            {!isAllDisabled && (
                                <FilledHoverBtn
                                    type='submit'
                                    disabled={disabledBtn ? disabledBtn : status?.isLoading || (!props.dirty && !submitBtnStatus && allowDirty) ? true : false}
                                    sx={{
                                        width: btnWidth || '100%', py: '10px', ...btnStyle
                                    }}
                                >
                                    {status?.isLoading ? <Loader color={'#fff'} /> : SEND}
                                </FilledHoverBtn>
                            )}
                        </Form>

                    )}
                </Formik>

            </Box>
        </>
    )
}
