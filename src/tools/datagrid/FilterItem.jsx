import { Autocomplete, TextField } from "@mui/material";
import { FlexRow } from "../../style/mui/styled/Flexbox";
import MakeSelect from "../../style/mui/styled/MakeSelect";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "@mui/material/utils";
import { hasValidValue } from "../fcs/hasValidValue";

const booleanArr = [
    { value: 'all', label: "الكل" },
    { value: true, label: "صواب" },
    { value: false, label: "خطأ" },
];


const FieldType = ({ column, ...params }) => {

    switch (column.type) {
        case "boolean":
            return (
                <MakeSelect
                    {...params}
                    allowClear={true}
                    options={booleanArr}
                    title={params.label}
                    setValue={params.onChange}
                    value={params.value}
                />
            );

        case "singleSelect":
            return (
                <MakeSelect
                    {...params}
                    allowClear={true}
                    options={column.valueOptions}
                    title={params.label}
                    setValue={params.onChange}
                    value={params.value}
                />
            );

        default:
            return (
                <TextField
                    {...params}
                    onChange={(e) => params.onChange(e.target.value)}
                />
            );
    }
};

function FilterItem({ operators = [], column, item, handelFilteredItem }) {
    const [{ operator, value }, setFilter] = useState(() => {
        const [ope, v] = item?.split("_split_") || [];
        return {
            operator: ope || operators[0]?.value,
            value: v ?? "",
        };
    });

    // ✅ stable debounce
    const debouncedFilter = useMemo(
        () =>
            debounce((operator, value) => {
                handelFilteredItem({ operator, value }, column.field);
            }, 500),
        [column.field]
    );

    // ✅ trigger debounce only when value/operator change
    useEffect(() => {
        if (!item && !hasValidValue(value)) return
        // if (operator === "isAnyOf") return; // handled separately
        debouncedFilter(operator, value);

        return () => {
            debouncedFilter.clear(); // cleanup
        };
    }, [operator, value, debouncedFilter]);

    return (
        <FlexRow gap={"0"}>
            <MakeSelect
                sx={{ width: "80px", minWidth: "32px" }}
                title={"العامل"}
                options={operators}
                value={operator}
                setValue={(newOperator) =>
                    setFilter((prev) => ({ ...prev, operator: newOperator }))
                }
            />
            {operator !== "isAnyOf" ? (
                <FieldType
                    column={column}
                    InputLabelProps={
                        column.type === "date" ? { shrink: true } : {}
                    }
                    type={column.type || "text"}
                    disabled={
                        operator === "isEmpty" || operator === "isNotEmpty"
                    }
                    label={column.headerName}
                    value={value}
                    onChange={(v) =>
                        setFilter((prev) => ({ ...prev, value: v }))
                    }
                />
            ) : (
                <Autocomplete
                    multiple
                    freeSolo
                    options={
                        column.type === 'singleSelect' ? column.valueOptions :
                            column.type === 'boolean' ? booleanArr :
                                []
                    }
                    value={value ? value.split(",") : []}
                    onChange={(e, newValue) =>
                        setFilter({ operator, value: newValue.join(",") })
                    }
                    renderInput={(params) => (
                        <TextField
                            variant="outlined"
                            sx={{ minWidth: "120px", maxWidth: '200px' }}
                            {...params}
                            label={column.headerName}
                        />
                    )}
                />
            )}
        </FlexRow>
    );
}

export default FilterItem;