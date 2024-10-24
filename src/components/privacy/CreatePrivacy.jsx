import React from 'react'
import Section from '../../style/mui/styled/Section'
import PrivacyForm from './PrivacyForm'
import { useCreatePrivacyMutation } from '../../toolkit/apis/privacyApi'
import usePostData from '../../hooks/usePostData'

function CreatePrivacy({ setReset }) {

    const [sendData, status] = useCreatePrivacyMutation()
    const [createPrivacy] = usePostData(sendData)

    const onSubmit = async (values, props) => {
        await createPrivacy(values)
        if (setReset) {
            setReset(prev => {
                return !prev
            })
        }
        props.resetForm()
    }

    return (
        <Section>
            <PrivacyForm onSubmit={onSubmit} status={status} />
        </Section>
    )
}

export default CreatePrivacy
