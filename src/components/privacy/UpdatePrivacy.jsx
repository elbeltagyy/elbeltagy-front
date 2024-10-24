import React from 'react'
import Section from '../../style/mui/styled/Section'
import { useUpdatePrivacyMutation } from '../../toolkit/apis/privacyApi'
import usePostData from '../../hooks/usePostData'
import PrivacyForm from './PrivacyForm'
import { Alert } from '@mui/material'
import TitleWithDividers from '../ui/TitleWithDividers'

function UpdatePrivacy({ setReset, privacy }) {

    const [sendData, updateStatus] = useUpdatePrivacyMutation()
    const [updatePrivacy] = usePostData(sendData)
    const onSubmit = async (values) => {
        const res = await updatePrivacy(values)
        if (setReset) {
            setReset(prev => !prev)
        }
    }

    if (!privacy) return <Alert severity='error' variant='filled'>Some Thing Went Wrong</Alert>

    return (
        <Section>
            <TitleWithDividers title={'التعديل على ' + privacy.title} />
            <PrivacyForm onSubmit={onSubmit} status={updateStatus} privacy={privacy} />
        </Section>
    )
}

export default UpdatePrivacy
