import React from 'react'
import { AppBar, Button, ButtonGroup, Stack, styled, Toolbar, Typography, Box, Drawer, List, ListItem, ListItemButton, ListItemText, Divider, IconButton, Modal, Avatar, MenuList, Menu, MenuItem } from '@mui/material'
import logoImg from '../../public/lo.png'
import Image from 'next/image'
import { MenuSharp, Settings } from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../state/slices/userSlice'

let NavBar = function () {
  let state = useSelector(state => state)
  let router = useRouter()
  let dispatch = useDispatch()


  let [drawerOpened, setDrawerOpened] = React.useState(false)
  let [anchorEl, setAnchorEl] = React.useState()
  let menuHandler = (event) => {
    setAnchorEl(event.currentTarget)
  }
  let handleDrawerSwitch = () => {
    setDrawerOpened(!drawerOpened)
  }

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

  let navItems = [
    { path: '/#home', name: 'HOME' },
    { path: '/#guide', name: 'GUIDE' },
    { path: '/#gallery', name: 'GALLERY' },
    { path: '/#about', name: 'ABOUT' },
    { path: '/#testimonial', name: 'TESTIMONIAL' },
    { path: '/#contact', name: 'CONTACT' },
  ]

  let userNavs = [
    { path: '/myRequests', name: 'MY REQUESTS' },
    { path: state.user.roles.includes('DONOR') ? '/myDonations' : "/createDonor", name: state.user.roles.includes('DONOR') ? 'MY DONATIONS' : "BECOME A DONOR" },
    { path: '/profile', name: "PROFILE" },
    { path: '', name: 'LOG OUT' },
  ]


  let StyledBox = styled(Box)({

    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',

  })
  return (
    <>
      <AppBar position='sticky' sx={{ backgroundColor: 'white', opacity: 0.9, }}>
        <Toolbar>
          <Stack direction={'row'} alignItems='center' width={'100%'} justifyContent={'space-between'}>
            <div onClick={()=>{router.push("/")}} style={{cursor:'pointer'}}>
              <Box sx={{ maxWidth: 60 }}>
                <Image height={70} width={100} src={'/logo.png'} alt='logo picture' />
              </Box>
            </div>
            <StyledBox sx={{ display: { md: 'flex', xs: 'none' }, }}>

              {
                navItems.map((item, index) => {
                  return (
                    <Link key={index} style={{ display: 'block', width: '100%' }} href={item.path}>
                      <Box display='flex' justifyContent={'center'}>
                        <Button
                          size='small'
                          sx={{ margin: { lg: '0 1em', md: '0 0.3em' }, '&:hover': { backgroundColor: 'primary.main', color: 'white' } }}
                        >
                          <Typography sx={{ fontSize: { md: '1.3em', lg: '1.55em' } }} variant='h6'>{item.name}</Typography>
                        </Button>
                      </Box>
                    </Link>
                  )
                })
              }
            </StyledBox>

            <Stack gap={2} sx={{ display: { md: 'flex', xs: 'none' }, }} direction={'row'}>
              {state.user.isAuthenticated
                ? <ButtonGroup>
                  <Button onClick={handleDonateNow} variant='contained'>Donate Now</Button>
                  <Button onClick={handleCreateRequestNow} variant='contained'>Create Request</Button>
                </ButtonGroup>
                : <></>
              }
              <Menu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => { setAnchorEl(null) }}
              >
                {
                  userNavs.map((nav, index) => {
                    return (
                      <MenuItem key={index} onClick={() => {
                        setAnchorEl(null); router.push(nav.path)
                        if (nav.name == 'LOG OUT') { dispatch(logOut()) }
                      }} >
                        {nav.name}
                      </MenuItem>
                    )
                  })
                }
              </Menu>
              {state.user.isAuthenticated
                ? <Avatar onClick={menuHandler} ></Avatar>
                : <ButtonGroup>
                  <Button onClick={() => { router.push(`/login`) }} variant='contained'>Log In</Button>
                  <Button onClick={() => { router.push(`/signup`) }} variant='contained'>Sign Up</Button>
                </ButtonGroup>
              }
            </Stack>

            <Box sx={{
              display: { xs: 'block', md: 'none' }
            }} >
              <IconButton onClick={handleDrawerSwitch}>
                <MenuSharp color='primary'></MenuSharp>
              </IconButton>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer
        open={drawerOpened}
        anchor={'left'}
        onClose={() => { setDrawerOpened(!drawerOpened) }}
      >
        <Box sx={{ paddingTop: 10, paddingLeft: 5, paddingRight: 5 }}>
          <List>
            {navItems.map((item, index) => {
              return (
                <ListItemButton onClick={() => { router.push(`/${item.path}`); setDrawerOpened(!drawerOpened) }} key={index}>
                  <ListItemText>{item.name}</ListItemText>
                </ListItemButton>
              )
            })}

            <Divider></Divider>
            {state.user.isAuthenticated
              ? <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 6 }}>
                <Box display={'flex'} justifyContent={'center'} >
                  <Avatar ></Avatar>
                </Box>
                {
                  userNavs.map((nav, index) => {
                    return (
                      <ListItemButton key={index} onClick={() => {
                        setAnchorEl(null);
                        if (nav.name == 'LOG OUT') { dispatch(logOut()) }
                        router.push(nav.path)
                      }} >
                        <ListItemText>{nav.name}</ListItemText>
                      </ListItemButton>
                    )
                  })
                }
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
                  <Button onClick={handleDonateNow} variant='contained'>Donate Now</Button>
                  <Button onClick={handleCreateRequestNow} variant='contained'>Create Request</Button>
                </Box>

              </Box>
              : <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
                <Button onClick={() => { router.push(`/login`) }} variant='contained'>Log In</Button>
                <Button onClick={() => { router.push(`/signup`) }} variant='contained'>Sign Up</Button>
              </Box>
            }
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default NavBar