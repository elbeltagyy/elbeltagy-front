import { useState } from "react";
import {
    Paper,
    Typography,
    Collapse,
    IconButton,
    Box,
} from "@mui/material";
import {
    ExpandMore,
    ExpandLess,
} from "@mui/icons-material";

function CollapseStyled({ storageId = 'collapse', children, label }) {

    const [open, setOpen] = useState(() => {
        return localStorage.getItem(storageId) !== "false";
    });

    const toggleOpen = () => {
        setOpen(prev => {
            const next = !prev;
            localStorage.setItem(storageId, String(next));
            return next;
        });
    };

    return (
        <Paper
            variant="outlined"
            sx={{ p: 2 }}
            component="aside"
            aria-label="الكورسات"
        >
            {/* Header */}
            <Box
                onClick={toggleOpen}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                }}
            >
                <Typography
                    variant="subtitle1"
                    fontWeight={700}
                >
                    {label}
                </Typography>

                <IconButton size="small">
                    {open ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
            </Box>

            <Collapse in={open}>
                {children}
            </Collapse>
        </Paper>
    );
}

export default CollapseStyled;