import { memo, useState } from 'react'
import MakeSelect from '../../style/mui/styled/MakeSelect'
import { codeConstants } from '../../settings/constants/codeConstants'
import Section from '../../style/mui/styled/Section'
import MakeForm from '../../tools/makeform/MakeForm'
import { Alert, Button, Typography } from '@mui/material'
import { useCreateCodeMutation } from '../../toolkit/apis/codesApi'

import usePostData from '../../hooks/usePostData'
import { FaCopy } from "react-icons/fa";
import CopyToClipboard from 'react-copy-to-clipboard'
import * as Yup from 'yup'
import { lang } from '../../settings/constants/arlang'

function CreateCode({ setReset, lecture = false }) {


    const [sendData, status] = useCreateCodeMutation()
    const [createCode] = usePostData(sendData)


    const [type, setType] = useState()

    const activateInput = [
        {
            name: 'type',
            label: 'نوع الكود',
            type: 'select',
            options: [codeConstants.ACTIVATE],
            validation: Yup.string().required(lang.REQUERIED)
        }, {
            name: 'copies',
            label: 'عدد النسخ',
            type: 'number',
            value: 1,
            validation: Yup.number().required(lang.REQUERIED).max(500, 'اقصى عدد هو 500')

        }, {
            name: 'numbers',
            label: 'العدد المسموح به للاستخدام',
            type: 'number',
            value: 1,
            validation: Yup.number().required(lang.REQUERIED).max(1000, 'اقصى عدد هو 1000')
        }
    ]
    const walletInputs = [
        {
            name: 'type',
            label: 'نوع الكود',
            type: 'select',
            options: [codeConstants.WALLET],
            validation: Yup.string().required(lang.REQUERIED)

        }, {
            name: 'copies',
            label: 'عدد النسخ',
            type: 'number',
            value: 1,
            validation: Yup.number().required(lang.REQUERIED).max(500, 'اقصى عدد هو 500')
        }, {
            name: 'numbers',
            label: 'العدد المسموح به للاستخدام',
            type: 'number',
            value: 1,
            validation: Yup.number().required(lang.REQUERIED).max(1000, 'اقصى عدد هو 1000')
        }, {
            name: 'price',
            label: 'سعر الكود',
            type: 'number',
            validation: Yup.number().required(lang.REQUERIED).max(2000, "اقصى مبلغ هو 2000 جنيه")
        }
    ]
    const centerInputs = [
        {
            name: 'type',
            label: 'نوع الكود',
            type: 'select',
            options: [codeConstants.CENTER],
            validation: Yup.string().required(lang.REQUERIED)

        }, {
            name: 'copies',
            label: 'عدد النسخ',
            type: 'number',
            value: 1,
            validation: Yup.number().required(lang.REQUERIED).max(500, 'اقصى عدد هو 500')
        }, {
            name: 'numbers',
            label: 'العدد المسموح به للاستخدام',
            type: 'number',
            value: 1,
            validation: Yup.number().required(lang.REQUERIED).max(1000, 'اقصى عدد هو 1000')
        },
    ]

    const lectureInputs = [
        {
            name: 'lecture',
            value: lecture,
            disabled: true,
            hidden: true
        }, {
            name: 'type',
            label: 'نوع الكود',
            type: 'select',
            options: [codeConstants.LECTURES],
            validation: Yup.string().required(lang.REQUERIED)
        }, {
            name: 'numbers',
            label: 'العدد المسموح به للاستخدام',
            type: 'number',
            value: 1,
            validation: Yup.number().required(lang.REQUERIED).max(1000, 'اقصى عدد هو 1000')
        },
    ]


    const onSubmit = async (values, props) => {
        await createCode(values)
        if (setReset) {
            setReset(pre => !pre)
        }
        props.resetForm()
    }

    return (
        <Section>
            <Typography variant='h6' textAlign={'center'} borderBottom={'4px solid'} my={'16px'}>انشاء كود {lecture?.name ? 'للمحاضره' + ' ' + lecture.name : ''}</Typography>
            <MakeSelect title={'اختر كود'} value={type} setValue={setType}
                options={[codeConstants.ACTIVATE, codeConstants.CENTER, codeConstants.WALLET, codeConstants.LECTURES]}
                disableValue={lecture?.name && [codeConstants.ACTIVATE, codeConstants.CENTER, codeConstants.WALLET]}

            />

            {type === codeConstants.ACTIVATE ?
                <MakeForm status={status}
                    onSubmit={onSubmit} inputs={activateInput} /> :
                type === codeConstants.CENTER ?
                    <MakeForm status={status}
                        onSubmit={onSubmit} inputs={centerInputs} /> :
                    type === codeConstants.LECTURES ?
                        <MakeForm status={status}
                            onSubmit={onSubmit} inputs={lectureInputs} /> :
                        type === codeConstants.WALLET &&
                        <MakeForm status={status}
                            onSubmit={onSubmit} inputs={walletInputs} />}

            {status?.data?.values && (
                <Alert severity='success' variant='filled' >

                    <CopyToClipboard text={status.data.values.code} onCopy={() => alert("تم النسخ بنجاح")}>
                        <Button startIcon={<FaCopy size={'1.5rem'} />} sx={{ color: 'grey.0' }} >
                            {status.data.values.code}
                        </Button>
                    </CopyToClipboard>

                </Alert>
            )}
        </Section>
    )
}

export default memo(CreateCode)
