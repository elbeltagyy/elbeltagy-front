import React, { useState } from "react"
import ModalStyled from "../../style/mui/styled/ModalStyled"

function BtnConfirm({ btn, children, modalInfo = {} }) {
    const [open, setOpen] = useState(false)
    const [confirmedAction, setConfirmedAction] = useState(() => () => { });

    const handleBtnClick = (e) => {
        e.stopPropagation();
        // Save the original onClick from the button to run after confirmation
        if (btn.props?.onClick) {
            setConfirmedAction(() => () => btn.props.onClick(e));
        }
        setOpen(true);
    };

    const clonedBtn = React.cloneElement(btn || children, {
        onClick: handleBtnClick
    });

    return (
        <div>
            {clonedBtn}
            <ModalStyled action={confirmedAction} open={open} setOpen={setOpen} title={modalInfo.title} desc={modalInfo.desc} />
        </div>
    )
}

export default BtnConfirm
