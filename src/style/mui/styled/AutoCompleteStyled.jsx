import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'

function AutoCompleteStyled({ fetchFc, setChosenOptions, chosenOptions, isLoading, filterKey = 'name', reset = [] }) {

    const [options, setOptions] = useState([])
    const [filteredName, setFilteredName] = useState()

    useEffect(() => {
        const trigger = async () => {
            const res = await fetchFc(filteredName)
            setOptions(res)
        }
        trigger()

    }, [filteredName, ...reset])

    const getFilteredName = (activeOption) => {
        const name = options?.filter(opt => opt._id === activeOption).map(opt => opt?.name)[0]
        return name
    }

    return (
        <Autocomplete
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
                    label="ابحث بالاسم"
                    onChange={(e) => setFilteredName(e.target.value)}
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
    )
}

export default AutoCompleteStyled
