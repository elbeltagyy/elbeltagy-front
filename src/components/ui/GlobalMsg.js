import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalMsg } from '../../toolkit/globalSlice';
import { Alert, Box, useTheme } from '@mui/material';

function GlobalMsg() {
    const globalMsg = useSelector(s => s.global.globalMsg)

    const dispatch = useDispatch()
    const handleClose = (event) => {
        dispatch(setGlobalMsg())
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={(e) => handleClose(e)}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    // if(!globalMsg) return <></>

    return (
        <Box>
            <Snackbar open={globalMsg && true}
                autoHideDuration={4000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity={globalMsg?.severity} sx={{ width: '100%' }}>
                    {globalMsg?.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default React.memo(GlobalMsg)