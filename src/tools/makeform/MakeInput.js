import MakeFieldArray from './MakeFieldArray'
import MakeRadio from './components/MakeRadio'
import MakeFile from './components/MakeFile'

import { getValues } from './constants/getValue'
import { getInputName } from './constants/getInputName'
import MakeTitle from './components/MakeTitle'
import MakeChunk from './MakeChunk'
import MakeSelect from './components/MakeSelect'
import MakeSelectRef from './components/MakeSelectRef'
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
import { hasError } from './constants/hasError'
import { Alert } from '@mui/material'

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

export default function MakeInput({ input, props, nestedInputName, style }) {
    //nestedInputName in case used by field array

    const inputName = getInputName(nestedInputName, input)
    const value = getValues(inputName, props)
    const setValue = (value) => {
        props.setFieldValue(inputName, value)
    }

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
                <MakeField input={input} inputName={inputName} props={props} />
                {value && renderPreview()}
            </FlexColumn>
        )
    }


    if (input.component) {
        return <input.component setValue={setValue} input={{ ...input, component: false }} props={props} value={value} inputName={inputName} />
    }
    if (input.Component) {
        return <FlexColumn>
            <input.Component setValue={setValue} input={{ ...input, component: false }} props={props} value={value} inputName={inputName} />
            {hasError(props, inputName) && (
                <Alert sx={{ my: "5px", width: '100%' }} severity='error'>{props.errors[inputName]}</Alert>
            )}
        </FlexColumn>
    }

    // Dynamic switch per type
    switch (input.type) {
        case 'chunk':
            return <MakeChunk inputName={inputName} input={input} props={props} values={value} />

        case 'header':
            return <MakeTitle title={input.title} />

        case 'array':
            return <MakeFieldArray inputName={inputName} input={input} props={props} values={value} />

        case 'radio':
            return <MakeRadio inputName={inputName} input={input} props={props} />

        case 'file':
            return <MakeFile inputName={inputName} input={input} props={props} value={value} />

        case 'fullDate':
            return <MakeFullDate inputName={inputName} props={props} value={value} input={input} />

        case 'select':
            return <MakeSelect props={props} inputName={inputName} input={input} value={value} />

        case 'choosed': //Bad in Syntax *_*
            return <MakeChoosed props={props} inputName={inputName} input={input} value={value} />

        case 'selectRef': //Bad *_*
            return <MakeSelectRef inputName={inputName} input={input} props={props} value={value} />

        case 'editor':
            return <Text defaultData={value} setText={(text) => props.setFieldValue(inputName, text)} />

        case 'switch':
            return <MakeSwitch input={input} props={props} inputName={inputName} />

        default:
            return <MakeField input={input} inputName={inputName} props={props} />
    }
}