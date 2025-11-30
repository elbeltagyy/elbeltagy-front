import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useEffect } from "react";

function AutoCompleteFixed({
    options = [],
    label,
    value = null,
    byId = true,
    setValue, addSetFc = null,
    multiple = false,
    isLoading = false,
    sx,
    reset = [],
    variant = "standard",
    getLabel
}) {


    // Reset value when reset dependencies change
    useEffect(() => {
        // console.log('rendering ...')
        if (reset.length !== 0) {
            setValue(multiple ? [] : null);
        }
    }, [multiple, setValue, ...reset]);

    return (
        <Autocomplete
            disabled={isLoading}
            // defaultValue={defaultValue}
            value={
                multiple ? // If byId=true, map ids to full option objects
                    (byId
                        ? options.filter((opt) => value?.includes(opt.id))
                        : value || [])
                    : // Single mode
                    (byId
                        ? options.find((opt) => opt.id === value) || null
                        : value)
            }
            multiple={multiple}
            onChange={(event, newValue) => {
                if (addSetFc) {
                    addSetFc(newValue)
                }
                if (byId) {
                    if (multiple) {
                        setValue(newValue.map((v) => v.id));
                    } else {
                        setValue(newValue ? newValue.id : null);
                    }
                } else {
                    setValue(newValue);
                }
            }}
            isOptionEqualToValue={(option, val) => option.id === val.id}
            getOptionLabel={(opt) => {
                if (getLabel) {
                    return getLabel(opt)
                } else {
                    return opt?.label || ""
                }
            }}
            options={options}
            loading={isLoading}
            sx={{ width: "100%", ...sx }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant={variant}
                    label={label || "ابحث بالاسم"}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {isLoading && (
                                    <CircularProgress color="inherit" size={20} sx={{ mr: 1 }} />
                                )}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
}

export default AutoCompleteFixed;
