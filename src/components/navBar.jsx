import React from 'react'
import { AppBar, Button, ButtonGroup, Stack, styled, Toolbar, Typography, Box, Drawer, List, ListItem, ListItemButton, ListItemText, Divider, IconButton, Modal, Avatar, MenuList, Menu, MenuItem, ListItemIcon, useScrollTrigger, Slide } from '@mui/material'
import logoImg from '../../public/lo.png'
import Image from 'next/image'
import { Bloodtype, Chat, Collections, HelpCenter, Home, Info, Login, Logout, MenuSharp, Person, Phone, Settings, VolunteerActivism } from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../state/slices/userSlice'

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
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

  let navItemsIcon = {
    HOME: <Home></Home>,
    GUIDE: <HelpCenter></HelpCenter>,
    GALLERY: <Collections></Collections>,
    ABOUT: <Info></Info>,
    TESTIMONIAL: <Chat></Chat>,
    CONTACT: <Phone></Phone>
  }

  let userNavs = [
    { path: '/myRequests', name: 'My Requests' },
    { path: state.user.roles.includes('DONOR') ? '/myDonations' : "/createDonor", name: state.user.roles.includes('DONOR') ? 'My Donations' : "Become A Donor" },
    { path: '/profile', name: "Profile" },
    { path: '', name: 'Log Out' },
  ]

  let userNavsIcon = {
    'My Requests': <Bloodtype></Bloodtype>,
    'Profile': <Person></Person>,
    'Log Out': <Logout></Logout>,
    'My Donations': <VolunteerActivism></VolunteerActivism>,
    'Become A Donor': <VolunteerActivism></VolunteerActivism>,

  }


  let StyledBox = styled(Box)({

    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',

  })
  return (
    <>
      <HideOnScroll>

        <AppBar position='fixed'
          sx={{ backgroundColor: "rgba(190, 0, 0, 0.25)", backdropFilter: 'blur(10px)' }}
        >
          <Toolbar>
            <Stack direction={'row'} alignItems='center' width={'100%'} justifyContent={'space-between'}>
              <div onClick={() => { router.push("/") }} style={{ cursor: 'pointer' }}>
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
                            sx={{ padding: 0, margin: { lg: '0 1em', md: '0 0.3em' }, '&:hover': { backgroundColor: 'primary.main', color: 'white' } }}
                          >
                            <Typography sx={{ padding: '0.19em 0.5em', fontWeight: 'bold', fontSize: { md: '1.3em', lg: '1.55em' }, '&:hover': { color: 'white' } }} color='white' variant='h6'>{item.name}</Typography>
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
                          if (nav.name == 'Log Out') { dispatch(logOut()) }
                        }} >
                          <ListItemIcon>{userNavsIcon[nav.name]}</ListItemIcon>
                          <Typography color={'secondary'}>
                            {nav.name}
                          </Typography>
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
      </HideOnScroll>

      <Drawer
        open={drawerOpened}
        anchor={'left'}
        onClose={() => { setDrawerOpened(!drawerOpened) }}
      >
        <Box sx={{ paddingTop: 10, paddingLeft: 3, paddingRight: 3 }}>
          <List>
            {navItems.map((item, index) => {
              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => { router.push(`/${item.path}`); setDrawerOpened(!drawerOpened) }}>
                    <ListItemIcon sx={{ color: 'primary.main' }} >
                      {navItemsIcon[`${item.name}`]}
                    </ListItemIcon>
                    <ListItemText sx={{ color: 'primary.main' }} primary={item.name} ></ListItemText>
                  </ListItemButton>
                </ListItem>
              )
            })}

            <Divider></Divider>
            {state.user.isAuthenticated
              ? <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 6 }}>
                <Box display={'flex'} pb={2} justifyContent={'center'} alignItems='center' >
                  <Avatar ></Avatar>
                  <Typography color='secondary' sx={{ padding: 1 }}>{state.user.userName}</Typography>
                </Box>
                {
                  userNavs.map((nav, index) => {
                    return (
                      <ListItemButton key={index} onClick={() => {
                        setAnchorEl(null);
                        if (nav.name == 'Log Out') { dispatch(logOut()) }
                        router.push(nav.path)
                      }} >
                        <ListItemIcon sx={{ color: 'primary.main' }} >
                          {userNavsIcon[`${nav.name}`]}
                        </ListItemIcon>
                        <ListItemText sx={{ color: 'primary.main' }} >{nav.name}</ListItemText>
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