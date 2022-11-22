import style from '../styles/buttonEffect.module.css'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import NavBar from '../components/navBar.jsx'
import Footer from '../components/footer'
import { Box, Button, Container, Modal, Paper, Snackbar, Stack, Typography } from '@mui/material'
import Layout from '../components/layout'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Gallery from '../components/gallary'
import Testimonials from '../components/testimonials'
import ContactUs from '../components/contactUs'
import About from '../components/about'
export default function Home() {

  let state = useSelector(state => state)
  let router = useRouter()

  let handleDonateNow = () => {
    if (state.user.isAuthenticated) {
      state.user.roles.includes('DONOR') ? router.push('/request/all') : router.push("/createDonor")
    } else {
      router.push("/login")
    }
  }
  let handleCreateRequestNow = () => {
    if (state.user.isAuthenticated) {
      router.push('/newRequest')
    } else {
      router.push("/login")
    }
  }

  return (
    <>
      <Layout>
        <Box
          id='home'
          mt={0}
          sx={{
            height: '100vh',
            backgroundImage: `  linear-gradient(to bottom, rgba(255, 0, 0, 0.52), rgba(0, 100, 0, 0.3)),url(/hero.jpeg)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            backgroundAttachment: 'fixed',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >

          <Box
            sx={{
              display: 'flex',
              flexDirection: "column",
              alignItems: 'center',
              padding: 1
            }}
          >
            <Typography align='center' variant='h3' color='white' >
              Come And Lets Save Lives With Just Our Blood
            </Typography>
            {/* <Button sx={{margin:4}} variant= {'contained'}> */}

            <div onClick={handleDonateNow} style={{ cursor: 'pointer' }} className={style.animatedButton}>
              <h4>Donate Now</h4>
            </div>
            {/* </Button> */}
          </Box>
        </Box>
        <Box mt={0}
          sx={{
            height: '100vh',
            backgroundImage: `  linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.73)),url(/secondHeroImage1.jpg)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            backgroundAttachment: 'fixed',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >

          <Box
            sx={{
              display: 'flex',
              flexDirection: "column",
              alignItems: 'center',
              padding: 1
            }}
          >
            <Typography align='center' variant='h3' color='white' >
              {'You\'re In A Need Of Blood Urgently! Just Make A Request And Some One will Be there To Donate For You.'}
            </Typography>
            <div onClick={handleCreateRequestNow} style={{ cursor: 'pointer' }} className={style.animatedButton}>
              <h4>Create Request Now</h4>
            </div>
          </Box>
        </Box>
        <Box id='guide' padding={'1em 0'} sx={{ paddingTop: '8em' }}>
          <Typography variant='h2' align='center' color='dark'>Look How Easy It Is To Use</Typography>
          <Stack padding={'1em 0'} gap={2} direction={{ xs: 'column', md: 'row' }} justifyContent={'center'} alignItems={'center'} >
            <div onClick={() => { router.push('/signup') }} style={{ cursor: 'pointer' }}>
              <Paper sx={{
                width: '300px',
                height: '300px',
                padding: '1em 0.5em',
                '&:hover': {
                  boxShadow: '0 0 1px black'
                }
              }} elevation={10}>
                <Box sx={{
                  backgroundImage: 'url(/register.jpg)',
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  height: '80%'
                }}>

                </Box>
                <Box>
                  <Typography variant='h6' align='center' color='gray'>Sign UP/Register</Typography>

                </Box>
              </Paper>
            </div>
            <div onClick={() => { router.push('/login') }} style={{ cursor: 'pointer' }}>
              <Paper sx={{
                width: '300px', height: '300px', padding: '1em 0.5em',
                '&:hover': {
                  boxShadow: '0 0 1px black'
                }
              }} elevation={10}>
                <Box sx={{
                  backgroundImage: 'url(/signIn.jpg)',
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  height: '80%'
                }}>

                </Box>
                <Box>
                  <Typography variant='h6' color='gray' align='center'>Sign In</Typography>

                </Box>
              </Paper>
            </div>
            <div>
              <Paper sx={{
                width: '300px', height: '300px', padding: '1em 0.5em',
                '&:hover': {
                  boxShadow: '0 0 1px black'
                }
              }} elevation={10}>
                <Box sx={{
                  backgroundImage: 'url(/donateOrRequest.jpg)',
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  height: '80%'
                }}>

                </Box>
                <Box>
                  <Typography variant='h6' color='gray' align='center'>
                    <span onClick={handleDonateNow} ><Typography sx={{ cursor: 'pointer', '&:hover': { color: '#131854' } }} component={'span'} variant='h6'> Donate </Typography></span>
                    or
                    <span onClick={handleCreateRequestNow} ><Typography sx={{ cursor: 'pointer', '&:hover': { color: '#131854' } }} component={'span'} variant='h6'> Create Your Request</Typography></span>
                  </Typography>
                </Box>
              </Paper>
            </div>
            <div onClick={() => { router.push('/myRequests') }} style={{ cursor: 'pointer' }}>
              <Paper sx={{
                width: '300px', height: '300px', padding: '1em 0.5em',
                '&:hover': {
                  boxShadow: '0 0 1px black'
                }

              }} elevation={10}>
                <Box sx={{
                  backgroundImage: 'url(/check.jpg)',
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  height: '80%'
                }}>

                </Box>
                <Box>
                  <Typography variant='h6' color='gray' align='center'>Check The Status Of Your Request And Donation</Typography>

                </Box>
              </Paper>
            </div>
          </Stack>
        </Box>
        <Box>
          <Gallery></Gallery>
        </Box>
        <About></About>
        <Box>
          <Testimonials></Testimonials>
        </Box>
        <Box>
          <ContactUs></ContactUs>
        </Box>
      </Layout>
    </>
  )
}