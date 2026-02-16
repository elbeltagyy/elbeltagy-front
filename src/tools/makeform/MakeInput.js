import MakeFieldArray from './MakeFieldArray'
import MakeRadio from './components/MakeRadio'
import MakeFile from './components/MakeFile'


import MakeTitle from './components/MakeTitle'
import MakeChunk from './MakeChunk'
import MakeSelect from './components/MakeSelect'

import MakeChoosed from './components/MakeChoosed'
import MakeFullDate from './components/MakeFullDate'
import Text from '../text/Text'
import MakeSwitch from './components/MakeSwitch'
import ShowImg from './components/ShowImg'
import ShowVid from './components/ShowVid'
import ShowPdf from './components/ShowPdf'
import MakeField from './MakeField'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import ShowBunny from './components/ShowBunny'
import { Alert } from '@mui/material'
import { useField } from 'formik'
import { memo } from 'react'

const getGoogleDrivePreviewLink = (originalLink) => {
    const fileIdRegex = /\/d\/(.*?)\//;
    const match = originalLink.match(fileIdRegex);

    if (match && match[1]) {
        const fileId = match[1];
        return `https://drive.google.com/file/d/${fileId}/preview`;
    } else {
        return null;
    }
};

function MakeInput({ input, nestedInputName = null }) {
    //nestedInputName in case used by field array
    if(input.type === 'header'){
        return <MakeTitle title={input.title} />
    }else return <RenderInputByType input={input} nestedInputName={nestedInputName} />
}

function RenderInputByType({input, nestedInputName = null }) {

    const inputName = nestedInputName || input.name
    const [{ value }, { error, touched }, { setValue }] = useField(inputName)
    const showError = error && touched && typeof error === 'string'

    // console.log('render ==>', inputName, 'value ==>', value)

    if (['url', 'iframe'].includes(input.type)) {
        const file = { url: value }
        if (input.player === 'google') {
            file.url = getGoogleDrivePreviewLink(value)
        }
        const renderPreview = () => {
            switch (input.player) {
                case 'youtube': return <ShowVid file={file} />
                case 'image': return <ShowImg file={file} />
                case 'bunny': return <ShowBunny file={file} />
                default: return <ShowPdf file={file} />
            }
        }

        return (
            <FlexColumn gap="22px" sx={{ alignItems: "flex-start" }}>
                <MakeField input={input} inputName={inputName} showError={showError} />
                {value && renderPreview()}
            </FlexColumn>
        )
    }

    // They need prop
    if (input.component) {
        return <input.component
            input={{ ...input, component: false }} inputName={inputName}
            value={value} setValue={setValue} />
    }

    // They need prop
    if (input.Component) {
        return <FlexColumn>
            <input.Component
                input={{ ...input, component: false }} inputName={inputName}
                value={value} setValue={setValue} />
            {showError && (
                <Alert sx={{ my: "5px", width: '100%' }} severity='error'>{error}</Alert>
            )}
        </FlexColumn>
    }

    // Dynamic switch per type
    switch (input.type) {
        case 'chunk':
            return <MakeChunk
                inputName={inputName}
                input={input}
                values={value} showError={showError} error={error} />

        case 'array':
            return <MakeFieldArray inputName={inputName} input={input} values={value} showError={showError} error={error} />

        case 'radio':
            return <MakeRadio inputName={inputName} input={input} showError={showError} />

        case 'file':
            return <MakeFile inputName={inputName} input={input} value={value} setValue={setValue} showError={showError} error={error} />

        case 'fullDate':
            return <MakeFullDate inputName={inputName} setValue={setValue} value={value} input={input} />

        case 'select':
            return <MakeSelect inputName={inputName} input={input} value={value} setValue={setValue} showError={showError} />

        case 'choosed': //Bad in Syntax *_*
            return <MakeChoosed inputName={inputName} input={input} value={value} />

        // case 'selectRef': //Bad *_*
        //     return <MakeSelectRef inputName={inputName} input={input}  value={value} />

        case 'editor':
            return <Text key={inputName} disabled={input.disabled} defaultData={value} setText={setValue} showError={showError} error={error} />

        case 'switch':
            return <MakeSwitch input={input} inputName={inputName} value={value} setValue={setValue} showError={showError} />

        default:
            return <MakeField input={input} inputName={inputName} showError={showError} />
    }
}

export default memo(MakeInput)