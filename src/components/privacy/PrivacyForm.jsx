import React from 'react'
import MakeForm from '../../tools/makeform/MakeForm'
import * as Yup from 'yup'
import { lang } from '../../settings/constants/arlang'
function PrivacyForm({ onSubmit, status, privacy }) {

    const inputs = [
        {
            name: 'id',
            label: 'العنوان',
            hidden: true,
            disabled: true,
            value: privacy?._id
        }, {
            name: 'title',
            label: 'العنوان',
            value: privacy?.title ?? '',
            validation: Yup.string().required(lang.REQUERIED)
        }, {
            name: 'description',
            label: 'التفاصيل',
            type: 'editor',
            value: privacy?.description ?? '',
            validation: Yup.string().required(lang.REQUERIED)

        }, {
            name: 'isActive',
            label: 'الحاله',
            type: 'switch',
            value: privacy?.isActive ?? true
        },
    ]

    return (
        <MakeForm inputs={inputs} onSubmit={onSubmit} status={status} />
    )
}

export default PrivacyForm
