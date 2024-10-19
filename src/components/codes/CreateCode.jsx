import React, { memo, useState } from 'react'
import MakeSelect from '../../style/mui/styled/MakeSelect'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import { codeConstants } from '../../settings/constants/codeConstants'
import Section from '../../style/mui/styled/Section'
import MakeForm from '../../tools/makeform/MakeForm'
import { Alert, Button, Typography } from '@mui/material'
import gradeConstants from '../../settings/constants/gradeConstants'
import { useCreateCodeMutation } from '../../toolkit/apis/codesApi'

import usePostData from '../../hooks/usePostData'
import { FaCopy } from "react-icons/fa";
import CopyToClipboard from 'react-copy-to-clipboard'

function CreateCode({ setReset }) {


    const [sendData, status] = useCreateCodeMutation()
    const [createCode] = usePostData(sendData)


    const [type, setType] = useState()

    const activateInput = [
        {
            name: 'type',
            label: 'نوع الكود',
            type: 'select',
            options: [codeConstants.ACTIVATE],
        }, {
            name: 'numbers',
            label: 'العدد المسموح به للاستخدام',
            type: 'number',
            value: 1
        }
    ]
    const walletInputs = [
        {
            name: 'type',
            label: 'نوع الكود',
            type: 'select',
            options: [codeConstants.WALLET],
        }, {
            name: 'numbers',
            label: 'العدد المسموح به للاستخدام',
            type: 'number',
            value: 1
        }, {
            name: 'price',
            label: 'سعر الكود',
            type: 'number'
        }
    ]
    const centerInputs = [
        {
            name: 'type',
            label: 'نوع الكود',
            type: 'select',
            options: [codeConstants.CENTER],
        }, {
            name: 'numbers',
            label: 'العدد المسموح به للاستخدام',
            type: 'number',
            value: 1
        }
    ]

    const onSubmit = async (values, props) => {
        const res = await createCode(values)
        if (setReset) {
            setReset(pre => !pre)
        }
        props.resetForm()
    }

    return (
        <Section>
            <Typography variant='h6' textAlign={'center'} borderBottom={'4px solid'} my={'16px'}>انشاء كود</Typography>
            <MakeSelect title={'اختر كود'} value={type} setValue={setType}
                options={[codeConstants.ACTIVATE, codeConstants.CENTER, codeConstants.WALLET]}
            />

            {type === codeConstants.ACTIVATE ?
                <MakeForm status={status}
                    onSubmit={onSubmit} inputs={activateInput} /> :
                type === codeConstants.CENTER ?
                    <MakeForm status={status}
                        onSubmit={onSubmit} inputs={centerInputs} /> :
                    type === codeConstants.WALLET &&
                    <MakeForm status={status}
                        onSubmit={onSubmit} inputs={walletInputs} />}

            {status?.data && (
                <Alert severity='success' variant='filled' >
                    <CopyToClipboard text={status.data.values.code} onCopy={() => alert("تم النسخ بنجاح")}>
                        <Button startIcon={<FaCopy size={'1.5rem'} />} sx={{ color: 'grey.0' }} onClick={() => {
                            navigator.clipboard.writeText(status.data.values.code).then(() => {
                                alert("تم النسخ بنجاح");
                            })
                                .catch(err => {
                                    console.error("فشل النسخ: ", err);
                                });
                        }}>
                            {status.data.values.code}
                        </Button>
                    </CopyToClipboard>
                </Alert>
            )}
        </Section>
    )
}

export default memo(CreateCode)
