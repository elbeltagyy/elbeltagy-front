
import React, { useEffect, useMemo, useState } from 'react';
import { debounce } from '@mui/material/utils';
import { TextField } from '@mui/material';

function TextFieldDebounce({
    value: preValue = '',
    onChange,
    setValue: onDebouncedChange,
    debounceTime = 500,
    ...props
}) {
    const [value, setValue] = useState(preValue);

    const debouncedChange = useMemo(
        () => debounce(onDebouncedChange, debounceTime),
        [onDebouncedChange, debounceTime]
    );

    useEffect(() => {
        setValue(preValue);
    }, [preValue]);

    useEffect(() => {
        debouncedChange(value);
        return () => debouncedChange.clear();
    }, [value, debouncedChange]);

    return (
        <TextField
            {...props}
            value={value}
            onChange={(e) => {
                setValue(e.target.value);
                onChange?.(e);
            }}
        />
    );
}

export default TextFieldDebounce;