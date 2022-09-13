import React from 'react'
import { AppBar, Button, ButtonGroup, Stack, styled, Toolbar, Typography,Box } from '@mui/material'
import logoImg from '../public/lo.png'
import Image from 'next/image'

let NavBar = function() {
    let StyledBox = styled(Box)({
        
        flexDirection:'row',
        flexWrap:'nowrap',
        justifyContent:'center',
        alignItems:'center',
    
      })
    let navItems = ['HOME','STATISTICS','ABOUT','CONTACT']
  return (
    <AppBar position='sticky'  sx={{backgroundColor:'black',opacity:0.7}}>
    <Toolbar>
      <Stack direction={'row'} alignItems='center' width={'100%'} justifyContent={'space-between'}>
      <Box  sx = {{maxWidth:35}}>
        <Image  height={'100%'} width={'100%'} src = {logoImg} alt ='logo picture'/>
      </Box>
        <StyledBox sx={{display:{md:'flex',xs:'none'},}}>
        {
          navItems.map((item,index)=>{
            return <Button key={index} m={2}sx={{'&:hover':{backgroundColor:'primary.main'}}} variant='h4' >{item}</Button>
          })
        }
        </StyledBox>
        <StyledBox sx={{display:{md:'flex',xs:'none'},}} >
        <ButtonGroup>
          <Button  variant='contained'>Log In</Button>
          <Button  variant='contained'>Register</Button>
        </ButtonGroup>
        </StyledBox>

        <Box sx={{
          display:{xs:'block',md:'none'}
        }} >
          <Button variant='contained'>
            MENU ICON
          </Button>
        </Box>
      </Stack>
    </Toolbar>
  </AppBar>
  )
}

export default NavBar