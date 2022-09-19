import React from 'react'
import { AppBar, Button, ButtonGroup, Stack, styled, Toolbar, Typography,Box, Drawer, List, ListItem, ListItemButton, ListItemText, Divider, IconButton } from '@mui/material'
import logoImg from '../../public/lo.png'
import Image from 'next/image'
import { Menu, Settings } from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/router'

let NavBar = function() {
  let router = useRouter()
  let StyledBox = styled(Box)({
      
      flexDirection:'row',
      flexWrap:'nowrap',
      justifyContent:'center',
      alignItems:'center',
  
    })
    let [drawerOpened,setDrawerOpened]= React.useState(false)
    let handleDrawerSwitch=()=>{
      setDrawerOpened(!drawerOpened)
    }
  let navItems = [
    {path:'/',name:'HOME'},
    {path:'/statistics',name:'STATISTICS'},
    {path:'/about',name:'ABOUT'},
    {path:'/contact',name:'CONTACT'}
  ]
  return (
    <>
    <AppBar position='sticky'  sx={{backgroundColor:'black',opacity:0.7,}}>
    <Toolbar>
      <Stack direction={'row'} alignItems='center' width={'100%'} justifyContent={'space-between'}>
      <Box  sx = {{maxWidth:60}}>
        <Image  height={70} width={100} src = {logoImg} alt ='logo picture'/>
      </Box>
        <StyledBox sx={{display:{md:'flex',xs:'none'},}}>
        {
          navItems.map((item,index)=>{
            return <Button onClick={()=>{router.push(`/${item.path}`)}}  key={index} m={2}sx={{'&:hover':{backgroundColor:'primary.main'}}} variant='h4' >{item.name}</Button>
          })
        }
        </StyledBox>
        <StyledBox sx={{display:{md:'flex',xs:'none'},}} >
        <ButtonGroup>
        <Button onClick={()=>{router.push(`/login`)}} variant='contained'>Log In</Button>
      <Button onClick={()=>{router.push(`/signup`)}}  variant='contained'>Sign Up</Button>
        </ButtonGroup>
        </StyledBox>

        <Box sx={{
          display:{xs:'block',md:'none'}
        }} >
        {/* <IconButton onClick={handleDrawerSwitch}>
          <Menu color='white'></Menu>
          
          <Settings></Settings>
        </IconButton> */}
          <Button onClick={handleDrawerSwitch} variant='contained'>
            MENU ICON
          </Button>
        </Box>
      </Stack>
    </Toolbar>
  </AppBar>

  <Drawer
  open={drawerOpened}
  anchor={'left'}
  onClose={()=>{setDrawerOpened(!drawerOpened)}}
  >
  <List sx={{marginTop:10,marginLeft:5,marginRight:5}} >
    {navItems.map((item,index)=>{
      return (
          <ListItemButton onClick={()=>{router.push(`/${item.path}`)}} key={index}>
            <ListItemText>{item.name}</ListItemText>
          </ListItemButton>
      )
    })}

    <Divider></Divider>
    <ListItem>
    <Box sx={{display:'flex',flexDirection:'column',gap:2,marginTop:2}}>
      <Button onClick={()=>{router.push(`/login`)}} variant='contained'>Log In</Button>
      <Button onClick={()=>{router.push(`/signup`)}}  variant='contained'>Sign Up</Button>
    </Box>

    </ListItem>
  </List>
  </Drawer>
  </>
  )
}

export default NavBar