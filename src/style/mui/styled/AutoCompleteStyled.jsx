import { Autocomplete, Box, CircularProgress, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import Loader from '../loaders/Loader'
import { FilledHoverBtn } from '../../buttonsStyles'
import { FlexColumn } from './Flexbox'

function AutoCompleteStyled({ label, fetchFc, sendFc, status, btnTitle = 'ارسال', defaultValues = [], isLoading, filterKey = 'name', reset = [] }) {

    const [options, setOptions] = useState([])
    const [chosenOptions, setChosenOptions] = useState(defaultValues)
    const [disabled, setDisabled] = useState(true)
    // const [filteredName, setFilteredName] = useState()

    useEffect(() => {
        const trigger = async () => {
            const res = await fetchFc() //filteredName
            setOptions(res)
        }
        trigger()

    }, [...reset])//filteredName,

    const getFilteredName = (activeOption) => {
        const name = options?.filter(opt => opt._id === activeOption).map(opt => opt?.name)[0]
        return name
    }

    const onSubmit = async () => {
        const linkers = chosenOptions.map(opt => opt?._id || opt)
        await sendFc(linkers)
    }

    const isDisabled = () => {
        const linkers = chosenOptions.map(opt => opt?._id || opt)
        const defaults = defaultValues.map(opt => opt?._id || opt)
        return arraysHaveSameElements(linkers, defaults)
    }

    useEffect(() => {
        if (isDisabled()) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [defaultValues, chosenOptions])

    return (
        <FlexColumn>
            <Autocomplete
                sx={{ width: '100%' }}
                multiple
                id="tags-standard"
                options={options}
        
                getOptionLabel={(option) => option[filterKey] || getFilteredName(option)}
                isOptionEqualToValue={(option, value) => option._id === (value._id || value)}
                value={chosenOptions || []}

                onChange={(e, v) => setChosenOptions(v)} //array


                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label || "ابحث بالاسم"}
                        // onChange={(e) => setFilteredName(e.target.value)}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
            <FilledHoverBtn onClick={onSubmit} disabled={status.isLoading || disabled} sx={{ m: '8px auto' }}>
                {status?.isLoading ? <Loader color={'neutral.0'} /> : btnTitle}
            </FilledHoverBtn>
        </FlexColumn>
    )
}

const arraysHaveSameElements = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false; // Early exit if lengths differ

    const createFrequencyMap = (arr) => {
        const map = {};
        for (const item of arr) {
            map[item] = (map[item] || 0) + 1;
        }
        return map;
    };

    const map1 = createFrequencyMap(arr1);
    const map2 = createFrequencyMap(arr2);

    // Compare the two frequency maps
    for (const key in map1) {
        if (map1[key] !== map2[key]) return false;
    }

    return true;
};

export default AutoCompleteStyled
