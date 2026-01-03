import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import { debounce } from '@mui/material/utils';
import { Box } from '@mui/material';


export default function AutoInput({ label = 'البحث', fetchFc, setSearch, value, placeholder = 'ابحث', RenderOption = null }) {

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredName, setFilteredName] = useState(value)

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOptions([]);
    };

    const trigger = async () => {
        setLoading(true);
        const res = await fetchFc(filteredName); // For demo purposes.
        setLoading(false);
        setOptions(res);
    }

    const debouncedFetchOptions = debounce(trigger, 300);

    // Effect to trigger fetching options when inputValue changes
    useEffect(() => {
        if (filteredName) {
            debouncedFetchOptions(filteredName);
        }
    }, [filteredName]);

    return (
        <Autocomplete
            fullWidth
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}

            isOptionEqualToValue={(option, value) => (option?.id ?? option) === (value?.id || value)}
            getOptionLabel={(option) => option?.label || option}
            onChange={(e, newVal) => {
                setSearch(newVal)
            }}
            value={value}
            onInputChange={(event, newInputValue) => {
                setFilteredName(newInputValue);
            }}

            options={options}
            loading={loading}
            renderOption={RenderOption && ((props, option) => {
                const { key, ...optionProps } = props;

                return <Box key={key} {...optionProps}>
                    <RenderOption props={props} option={option} />
                </Box>
            })}


            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={placeholder}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
}