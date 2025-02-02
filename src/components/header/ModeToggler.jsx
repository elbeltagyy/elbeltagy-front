import { Box, Button, IconButton, useTheme } from '@mui/material'
import { motion } from 'framer-motion';
import React, { memo } from 'react'


import { MdLightMode } from "react-icons/md";
import { MdOutlineNightlightRound } from "react-icons/md";


const BoxFm = motion(Box)

const iconVar = {
    hidden: {
        scale: 0, rotate: '360deg', transition: {
            duration: .8
        }
    },
    visible: {
        scale: 1, rotate: 0,
        transition: {
            duration: .8
        }
    }
}

function ModeToggler({ toggleMode }) {

    const theme = useTheme()
    return (
        <IconButton onClick={toggleMode} sx={{ boxShadow: theme.shadows[1], m: '0 8px' }}>
            {theme.palette.mode === 'dark' ?
                <BoxFm sx={{ p: 0, m: 0, display: 'flex' }} variants={iconVar} initial='hidden' whileTap='hidden' animate='visible'>
                    <MdOutlineNightlightRound color={theme.palette.primary.main} />
                </BoxFm>
                :
                <BoxFm sx={{ p: 0, m: 0, display: 'flex' }} variants={iconVar} initial='hidden' whileTap='hidden' animate='visible'>
                    <MdLightMode color={theme.palette.primary.main} />
                </BoxFm>
            }
        </IconButton>
    )
}

export default memo(ModeToggler)
