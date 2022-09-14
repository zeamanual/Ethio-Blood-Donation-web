import React from 'react'
import Footer from './footer'
import NavBar from './navBar'

function Layout({children}) {
  return (
    <>
    <NavBar></NavBar>
    <div>{children}</div>
    <Footer></Footer>
    </>
  )
}

export default Layout