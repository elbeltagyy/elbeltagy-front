import { Button, styled } from "@mui/material"

export const buttonStyle = (theme) => {
    return {
        textAlign: "center",
        minWidth: '150px',
        fontWeight: "700",
        margin: "6px 2px",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.grey[0],
        borderRadius: "16px",
        "&:hover": {
            backgroundColor: theme.palette.primary.dark
        },
        "&.Mui-disabled": {
            // background: "initial",
            color: "initial",
            opacity: .7
        }
    }
}


const scallyBtnStyle = (theme, colorm) => {
    return {
        textAlign: "center",
        minWidth: '150px',
        fontWeight: "700",
        margin: "6px 2px",
        backgroundColor: colorm || theme.palette.primary.main,
        color: theme.palette.grey[0],
        borderRadius: "16px",
        transition: '.3s all ease',
        "&:hover": {
            transform: 'scale(1.3)',
            backgroundColor: colorm || theme.palette.primary.main
        },
        "&.Mui-disabled": {
            // background: "initial",
            color: "initial",
            opacity: .7
        }
    }
}


export const buttonError = (theme) => {
    return {
        width: 'fit-content',

        margin: "6px 2px",
        fontWeight: "600",
        color: theme.palette.grey[100],
        backgroundColor: theme.palette.error.main,
        "&:hover": {
            backgroundColor: theme.palette.error.light,
        }
    }
}

export const sendSuccess = (theme) => {
    return {
        textAlign: "center",
        width: 'fit-content',
        fontWeight: "700",
        margin: "6px 2px",
        backgroundColor: theme.palette.success.main,
        color: theme.palette.grey[0],
        "&:hover": {
            backgroundColor: theme.palette.success.dark,
        }
    }
}

export const outLinedHoverBtnStyle = (theme, colorm) => {
    return {
        textAlign: "center",
        width: 'fit-content',
        fontWeight: "700",
        margin: "6px 2px",
        backgroundColor: 'transparent',
        color: colorm || theme.palette.primary.main,
        border: `2px solid`,
        borderColor: colorm || theme.palette.primary.main,
        transition: '.5s ease',
        borderRadius: '8px',
        "&:hover": {
            backgroundColor: colorm || theme.palette.primary.main,
            color: theme.palette.grey[0],
            borderRadius: '1rem',
            border: `2px solid ${theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.grey[0]}`,
        },
        '&.Mui-disabled': {
            color: theme.palette.grey[200],
        }
    }
}

export const filledHoverBtnStyle = (theme, colorm) => {
    return {
        textAlign: "center",
        width: 'fit-content',
        fontWeight: "700",
        margin: "6px 2px",
        backgroundColor: colorm || theme.palette.primary?.main,
        color: theme.palette.grey[0],
        border: `2px solid transparent`,
        transition: '.5s ease',
        borderRadius: '1rem',
        "&:hover": {
            backgroundColor: 'transparent', //theme.palette.grey[0]
            color: colorm || theme.palette.primary?.main,
            border: `2px solid ${colorm || theme.palette.primary?.main}`,

        }
    }
}



export const StyledBtn = styled(Button)(({ theme }) => (buttonStyle(theme)))
export const ScallyBtn = styled(Button)(({ theme, colorm }) => (scallyBtnStyle(theme, colorm)))
export const OutLinedHoverBtn = styled(Button)(({ theme, colorm }) => (outLinedHoverBtnStyle(theme, colorm)))
export const FilledHoverBtn = styled(Button)(({ theme, colorm }) => (filledHoverBtnStyle(theme, colorm)))


export const ErrorBtn = styled(Button)(({ theme }) => (buttonError(theme)))

export const SuccessBtn = styled(Button)(({ theme }) => (sendSuccess(theme)))



{/* 
    <ScallyBtn > hello scally</ScallyBtn> <br />
<OutLinedHoverBtn colorm="orange"> hello scally</OutLinedHoverBtn> <br />
<FilledHoverBtn colorm='orange'> hello scally</FilledHoverBtn> <br />
<ScallyBtn> hello scally</ScallyBtn>
 */}