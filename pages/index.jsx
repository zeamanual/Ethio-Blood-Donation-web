import Head from 'next/head'
import styles from '../styles/Home.module.css'
import image from '../public/lo.png'
import NavBar from '../components/navBar.jsx'
import Image from 'next/image'
import Footer from '../components/footer'
import { Box, Container, Typography } from '@mui/material'
export default function Home() {


  return (
    <>
      <Head>
        <title>Habesha Donate</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar></NavBar>
      <Typography color='secondary' >test</Typography>
      {/* <Image src = {image}></Image> */}
      <Box mt={8}>Body Goes Here</Box>
      <Footer></Footer>
    </>
  )
}