import { Box, Button } from "@mui/material"
import { useState } from "react"
import { FlexRow } from "./Flexbox";

// [{btn: <Button>test</Button>, component: <div>test</div>, label: 'Test Button (it or btn key)', icon: <div>icon</div>}]
function BtnsGroup({ btns = [], defaultActive = 0, sx = {}, innerSx = {}, state = {} }) {
    const [internalActive, setInternalActive] = useState(defaultActive ?? 0);

    // single source of truth: external state wins if provided, else internal
    const activeIndex = state.active ?? internalActive;

    const handleClick = (index) => {
        if (state.setActive) {
            state.setActive(index);
        } else {
            setInternalActive(index);
        }
    };

    const activeBtn = btns[activeIndex];

    return (
        <Box width={'100%'} sx={{ ...sx }}>
            <FlexRow gap={'6px'} sx={{ mb: '16px', ...innerSx }}>
                {btns.map((btn, index) =>
                    btn.btn ?
                        <Box key={index}>{btn.btn}</Box>
                        :
                        <Button
                            key={index}
                            endIcon={btn.icon}
                            variant={activeIndex === index ? "contained" : "outlined"}
                            onClick={() => handleClick(index)}
                        >{btn.label}</Button>
                )}
            </FlexRow>

            {activeBtn?.component}
        </Box>
    )
}

export default BtnsGroup