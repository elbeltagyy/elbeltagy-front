import { Box, Button } from "@mui/material"
import {  useState } from "react"
import { FlexRow } from "./Flexbox";



// [{btn: <Button>test</Button>, component: <div>test</div>, label: 'Test Button (it or btn key)', icon: <div>icon</div>}]
function BtnsGroup({ btns = [], defaultActive = 0, sx = {}, innerSx = {} }) {
    const [active, setActive] = useState(defaultActive ?? 0);

    const handleClick = (index) => {
        setActive(index);
    };
    const activeBtn = btns[active]; //better than using useMemo

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
                            variant={active === index ? "contained" : "outlined"}
                            onClick={() => handleClick(index)}
                        >{btn.label}</Button>
                )}
            </FlexRow>

            {/* <ButtonGroup sx={{ flexWrap: 'wrap', justifyContent: 'center', mb: '16px', ...sx }} color="primary" aria-label="Medium-sized button group">
            </ButtonGroup> */}
            {activeBtn?.component && activeBtn?.component}
        </Box >
    )
}

export default BtnsGroup
