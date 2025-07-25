import { Box } from '@mui/material';
import { Form, Formik } from 'formik';

import * as Yup from "yup"
import MakeInput from './MakeInput';
import Loader from '../../style/mui/loaders/Loader';
import { FilledHoverBtn } from '../../style/buttonsStyles';
import DynamicFormGrid from './DynamicFormGrid2';
const SEND = 'إرسال'

export default function CreateFormik({ inputs, onSubmit, status, btnWidth, enableReinitialize = true, formDirection = 'column', btnStyle = {}, submitBtnStatus = false, disabledBtn = false }) {


    let data = {}
    const validation = {}

    // arrange data of input with ===> name , validation, initial value
    inputs.forEach((input, i) => {
        if (input.name) {
            if (input.type === 'array') {
                data[input.name] = []
                return
            }
            if (input.value === 0) {
                data[input.name] = 0
            } else if ((typeof input.value === 'object' && Object.keys(input.value || {}).length === 0) && input?.value) {
                data[input.name] = ''
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
                        <Form onChange={() => props.validateForm()} style={{ display: 'flex', alignItems: 'center', flexDirection: formDirection }}>

                            <DynamicFormGrid inputs={inputs} props={props} />
                            
                            <FilledHoverBtn
                                type='submit'
                                disabled={disabledBtn ? disabledBtn : status?.isLoading || (!props.dirty && !submitBtnStatus) ? true : false}
                                sx={{
                                    width: btnWidth || '100%', py: '10px', ...btnStyle
                                }}
                            >
                                {status?.isLoading ? <Loader color={'#fff'} /> : SEND}
                            </FilledHoverBtn>
                        </Form>
                    )}
                </Formik>

            </Box>
        </>
    )
}
