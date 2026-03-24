import { Box, Typography } from "@mui/material"
import { FlexRow } from "../../style/mui/styled/Flexbox"
import FilterItem from "./FilterItem"
import { useState } from "react"

const stringOperators = [
    { value: 'contains', label: 'يحتوي' },
    { value: 'doesNotContain', label: 'لا يحتوي' },
    { value: 'equals', label: 'يساوي' },
    { value: 'doesNotEqual', label: 'لا يساوي' },
    { value: 'startsWith', label: 'يبدأ ب' },
    { value: 'endsWith', label: 'ينتهي ب' },
    { value: 'isEmpty', label: 'فارغ' },
    { value: 'isNotEmpty', label: 'ليس فارغ' },
    { value: 'isAnyOf', label: 'أي من' },
]

const numericOperators = [
    { value: '=', label: '=' },
    { value: '!=', label: '!=' },
    { value: '>', label: '>' }, //'أكبر من >'
    { value: '>=', label: ">=" }, //"أكبر من أو يساوي >="
    { value: '<', label: '<' }, //'أصغر من <'
    { value: '<=', label: '<=' }, //'أصغر من أو يساوي <=' 
    { value: 'isEmpty', label: 'فارغ' },
    { value: 'isNotEmpty', label: 'ليس فارغ' },
    { value: 'isAnyOf', label: 'أي من' },
]

const selectOperators = [
    { value: 'is', label: 'يكون' },
    { value: 'not', label: 'لا يكون' },
    { value: 'isAnyOf', label: 'أي من' },
]
const booleanOperators = [
    { value: 'is', label: 'يكون' },
]

const dateOperators = [
    { value: 'is', label: 'يكون' },
    { value: 'not', label: 'لا يكون' },
    { value: 'after', label: 'بعد' },
    { value: 'onOrAfter', label: 'عند أو بعد' },
    { value: 'before', label: 'قبل' },
    { value: 'onOrBefore', label: 'عند أو قبل' },
    { value: 'isEmpty', label: "فارغ" },
    { value: 'isNotEmpty', label: 'ليس فارغ' },
]

function MultipleFilter({ columns, filter = {}, handelFilteredItem, tableName = 'multiple' }) {
    const [open, setOpen] = useState(!localStorage.getItem(tableName)) //if found ==> close

    const onChange = () => {
        if (!open) {
            localStorage.removeItem(tableName)
        } else {
            localStorage.setItem(tableName, !open)
        }
        setOpen(!open)
    }

    return (
        <Box sx={{ p: '12px 8px', bgcolor: 'background.alt' }}>
            <Typography onClick={onChange}
                sx={{ cursor: 'pointer' }}
                color={open ? 'error.main' : 'success.main'}>{open ? 'اخفاء' : 'اظهار'}</Typography>

            <Typography>البحث عن عناصر</Typography>
            <br />
            {open && (
                <FlexRow sx={{ flexWrap: 'wrap', flexDirection: 'row', gap: '16px' }}>
                    {columns.map((column, i) => {
                        if (!(column.filterable ?? true) || column.type === 'actions') return

                        return <FilterItem
                            key={i}
                            column={column}
                            operators={column.type === 'date' ? dateOperators : column.type === 'boolean' ? booleanOperators : column.type === 'singleSelect' ? selectOperators : column.type === 'number' ? numericOperators : stringOperators}
                            item={filter[column.field] || ''} handelFilteredItem={handelFilteredItem} />
                    })}
                </FlexRow>
            )}
        </Box>
    )
}

export default MultipleFilter
