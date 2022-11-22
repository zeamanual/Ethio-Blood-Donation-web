import { Box } from '@mui/material'
import Head from 'next/head'
import React from 'react'
import { useDispatch } from 'react-redux'
import { updateUserAuthStatus } from '../state/slices/userSlice'
import Footer from './footer'
import NavBar from './navBar'

function Layout({children}) {
  let dispatch=useDispatch()
  React.useEffect(()=>{
    dispatch(updateUserAuthStatus())
  },[])
  return (
    <>
    <NavBar></NavBar>
    <Box marginTop={0}>{children}</Box>
    <Footer></Footer>
    </>
  )
}

export default Layout