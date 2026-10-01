import Accordion from '@mui/material/Accordion';
// import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { FlexColumn, FlexRow } from './Flexbox';
import { useState } from 'react';

export default function AccordionStyled({ title, desc, children, bgcolor = 'background.default', expanded = false, setExpanded, titleSx = {}, beforeTitle, startIcon, expandIcon, preventRotation }) {
    const theme = useTheme()
    const [open, setOpen] = useState(expanded)

    const handleExpansion = () => {
        if (setExpanded) {
            setExpanded((prevExpanded) => !prevExpanded);
        }
        setOpen(!open)
    }

    return (
        <Accordion
            square
            elevation={4}
            expanded={open}
            onChange={handleExpansion}
            disableGutters
            slotProps={{ transition: { unmountOnExit: true } }} sx={{
                border: 'none', m: '20px 0',
                boxShadow: 'none',
                borderRadius: '16px',
                '&::before': {
                    display: 'none'
                },
                '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                    transform: preventRotation && 'none', // 🔒 Prevent rotation
                },
            }}>
            <AccordionSummary
                expandIcon={
                    expandIcon ? expandIcon : (
                        <IconButton>
                            <ExpandMoreIcon sx={{
                                color: "grey.0",
                                fontSize: '2.5rem',
                                borderRadius: '50%',
                                bgcolor: open ? 'primary.600' : 'primary.light'
                            }} />
                        </IconButton>
                    )
                }
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{
                    border: '1px solid',
                    bgcolor: open ? 'primary.light' : theme.palette.primary.main + 30,
                    borderColor: open ? 'primary.light' : theme.palette.primary.main,
                    color: open ? 'grey.0' : 'neutral.0',
                    fontWeight: 700,
                    boxShadow: 'none',
                    borderRadius: '16px',
                    ...titleSx,

                    // Keep the expand icon in its own fixed-width area
                    '& .MuiAccordionSummary-expandIconWrapper': {
                        flexShrink: 0,
                    },
                    '& .MuiAccordionSummary-content': {
                        minWidth: 0,
                    },
                }}
            >
                <FlexColumn sx={{
                    alignItems: 'flex-start',
                    minWidth: 0,
                    width: '100%',
                }}>
                    {beforeTitle}

                    <FlexRow gap="12px" sx={{
                        alignItems: 'flex-start',
                        minWidth: 0,
                        width: '100%',
                    }}>
                        {startIcon && (
                            <Box sx={{ flexShrink: 0 }}>
                                {startIcon}
                            </Box>
                        )}

                        <FlexColumn sx={{
                            alignItems: 'flex-start',
                            minWidth: 0,
                            flex: 1,
                            width: '100%',
                        }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    width: '100%',
                                    minWidth: 0,
                                    whiteSpace: 'normal',
                                    overflowWrap: 'anywhere',
                                    lineHeight: 1.4,
                                }}
                            >
                                {title}
                            </Typography>

                            {desc && (
                                <Typography
                                    component="span"
                                    sx={{
                                        color: 'inherit',
                                        opacity: .9,
                                        display: 'block',
                                        width: '100%',
                                        minWidth: 0,
                                        whiteSpace: 'normal',
                                        overflowWrap: 'anywhere',
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {desc}
                                </Typography>
                            )}
                        </FlexColumn>
                    </FlexRow>
                </FlexColumn>
            </AccordionSummary>

            <AccordionDetails sx={{
                bgcolor: bgcolor,
                // borderRadius: '16px'
            }}>
                {children}
            </AccordionDetails>

            {/* <AccordionActions>
                <Button>Cancel</Button>
                <Button>Agree</Button>
            </AccordionActions> */}
        </Accordion >
    );
}