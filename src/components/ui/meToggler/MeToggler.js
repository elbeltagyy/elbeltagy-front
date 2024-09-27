import "./meToggler.css"

import { Box, IconButton, styled, useTheme } from '@mui/material'
import React, { useState } from 'react'

const DashStyled = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 6,
  height: 0,
  width: '32px',
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: '6px',
}))



function MeToggler({ openSidebar, isOpenedSidebar }) {

  // for rtl ==> right => left , translateX changed
  const theme = useTheme()


  const psudoEleStyled = { // after& before
    content: '""',
    width: "16px",
    height: "3px",
    position: "absolute",
    zIndex: 5,

    backgroundColor: "primary.main",
    borderRadius: '6px',

    transition: 'all .4s',
  }

  const logoStyled = {
    position: 'relative',
    "&::after": {
      ...psudoEleStyled,
      top: "5.5px",
      right: "-.65px",
      transform: isOpenedSidebar ? "rotate(36deg) translateX(50%)" : "rotate(36deg) translateX(0%)",

    }, '&::before': {
      ...psudoEleStyled,
      bottom: "5.5px",
      right: "-.65px",
      transform: isOpenedSidebar ? "rotate(-36deg) translateX(50%)" : "rotate(-36deg) translateX(0%)",

    }
  }


  const dash2 = {
    width: "16px !important",

    mb: '6px',
    borderRadius: "8px",
    transition: 'all  .4s ease',
    marginLeft: isOpenedSidebar ? '16px' : '0',

  }

  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      // border: `2px solid ${theme.palette.primary.main} `,
      onClick={openSidebar}
    >
      <Box sx={logoStyled}>
        <DashStyled sx={{ mb: "6px" }}></DashStyled>
        <DashStyled sx={dash2} ></DashStyled>
        <DashStyled ></DashStyled>
      </Box>

    </IconButton>
  )
}

export default MeToggler
