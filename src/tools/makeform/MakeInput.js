import { Box, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material'
import { ErrorMessage, FastField, Field, useField } from 'formik'
import React, { useEffect, useMemo, useState } from 'react'

import MakeFieldArray from './MakeFieldArray'
import MakeRadio from './components/MakeRadio'
import MakeFile from './components/MakeFile'

import { getValues } from './constants/getValue'
import { getInputName } from './constants/getInputName'
import MakeTitle from './components/MakeTitle'
import { hasError } from './constants/hasError'
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


const m = '6px 0'
export default function MakeInput({ input, props, nestedInputName, style }) {
    //nestedInputName in case used by field array

    const inputName = getInputName(nestedInputName, input)
    const value = getValues(inputName, props)

    if (input.type === 'url') {
        const file = { url: value }

        return <FlexColumn gap={'22px'} sx={{ alignItems: "flex-start" }}>
            <MakeField input={input} inputName={inputName} props={props} />
            {input.player === 'youtube' ? (
                <ShowVid file={file} />
            ) : input.player === 'image' ? (
                <ShowImg file={file} />
            ) : <ShowPdf file={file} />}
        </FlexColumn>
    }

    if (input.component) {
        return <input.component input={{ ...input, component: false }} props={props} value={value} inputName={inputName} />
    }

    if (input.type === "chunk") {
        return <MakeChunk inputName={inputName} input={input} props={props} values={value} />
    }

    if (input?.type === "header") {
        return <MakeTitle title={input.title} />
    }

    if (input?.type === "array") {
        return <MakeFieldArray inputName={inputName} input={input} props={props} values={value} />
    }

    if (input?.type === "radio") { // done
        return (
            <MakeRadio inputName={inputName} input={input} props={props} />
        )
    }

    if (input?.type === "file") {
        return (
            <MakeFile inputName={inputName} input={input} props={props} value={value} />
        )
    }

    if (input.type === 'fullDate') {
        return <MakeFullDate inputName={inputName} props={props} value={value} input={input} />
    }

    if (input.type === "select") { //done

        return (
            <MakeSelect props={props} inputName={inputName} input={input} value={value} />
        )
    }

    if (input.type === "choosed") { //bad

        return (
            <MakeChoosed props={props} inputName={inputName} input={input} value={value} />
        )
    }

    if (input.type === "selectRef") {
        return <MakeSelectRef inputName={inputName} input={input} props={props} value={value} />
    }

    if (input.type === 'editor') {
        return <div style={{ width: '100%' }}>
            <Text defaultData={getValues(inputName, props)} setText={(text) => props.setFieldValue(inputName, text)} />
        </div>
    }

    if (input.type === 'switch') {
        return <MakeSwitch input={input} props={props} inputName={inputName} />
    }
    return (
        <MakeField input={input} inputName={inputName} props={props} />
    )
}


// normal, nested
// types ===>>>  text,