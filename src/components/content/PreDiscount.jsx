import { memo, useEffect, useState } from "react"
import { FlexRow } from "../../style/mui/styled/Flexbox"
import { Box, FormControlLabel, Switch } from "@mui/material"
import MakeInput from "../../tools/makeform/MakeInput"

export const PreDiscount = ({ value, input, inputName, setValue }) => {

    const [preDiscountOrigin] = useState(value)
    const [isPreDiscount, setPreDiscount] = useState(value ? true : false)

    useEffect(() => {
        setValue(isPreDiscount ? value : preDiscountOrigin)
    }, [isPreDiscount])

    return <FlexRow sx={{
        justifyContent: 'space-between', gap: '10px'
    }}>
        <FormControlLabel control={<Switch checked={isPreDiscount} onChange={() => setPreDiscount(!isPreDiscount)} />} label="إضافه سعر قبل الخصم" />
        <Box sx={{ width: { xs: '100%', md: '40%' } }}>
            {isPreDiscount && (
                <MakeInput input={{ ...input, value: !isPreDiscount ? 0 : value }} />
            )}
        </Box>
    </FlexRow>
}

export default memo(PreDiscount)