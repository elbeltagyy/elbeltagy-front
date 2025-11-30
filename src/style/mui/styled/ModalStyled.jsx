import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { ErrorBtn, FilledHoverBtn } from '../../buttonsStyles';
import { lang } from '../../../settings/constants/arlang';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function ModalStyled({ allowBackClose = false, open, setOpen, title, desc = 'بمجرد الموافقه لن يمكنك العوده !', children, action, agree, fullWidth = false, isKeepMounted = false, fullScreen = false }) {

    const handleClose = () => {
        setOpen(false);
    };

    const onAction = async () => {
        setOpen(false)
        await action()
    }

    React.useEffect(() => {
        if (!open || !allowBackClose) return;

        // Push dummy history entry
        window.history.pushState({ popup: true }, "");

        const handlePopState = (e) => {
            if (open) {
                setOpen(false);   // close popup
                // Re-add the history entry to prevent leaving the page
                window.history.pushState({ popup: true }, "");
            }
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [open, setOpen]);

    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted={isKeepMounted}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullScreen={fullScreen}
                sx={{
                    '& .MuiPaper-root': {
                        minWidth: '250px', border: '1px solid rgba(255 255 255, .1)', outline: '1px solid #fff', width: fullWidth ? '100%' : 'auto'
                    }
                }}
            >
                {children ? children : (<>
                    <DialogTitle>{title || lang.ARE_YOU_SURE}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                        </DialogContentText>
                        {desc}
                    </DialogContent>
                </>)}
                <DialogActions>
                    <ErrorBtn sx={{
                        minWidth: '100px',
                        borderRadius: '16px'
                    }} onClick={handleClose}>{lang.DISAGREE}</ErrorBtn>
                    {!children && (
                        <FilledHoverBtn sx={{
                            minWidth: '100px'
                        }} onClick={onAction}>{agree ? agree : lang.AGREE}</FilledHoverBtn>
                    )}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}