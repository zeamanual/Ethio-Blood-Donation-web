import { Box } from '@mui/material'
import React from 'react'
import Footer from './footer'
import NavBar from './navBar'

function Layout({children}) {
  return (
    <>
    <NavBar></NavBar>
    <Box marginTop={0}>{children}</Box>
    <Footer></Footer>
    </>
  )
}

export default Layout