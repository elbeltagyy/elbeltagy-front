import { Alert } from '@mui/material'
import React from 'react'
import Loader from './Loader'
import { FlexRow } from '../styled/Flexbox'
import { lang } from '../../../settings/constants/arlang'

function LoaderWithText({ text }) {
    return (
        <Alert variant="outlined" severity="warning" sx={{ justifyContent: 'center' }}>
            <FlexRow >

                {text ? text : lang.DATA_LOADING}
                <Loader color={'neutral.0'} sx={{ mx: '12px' }} />
            </FlexRow>
        </Alert>
    )
}

export default LoaderWithText
