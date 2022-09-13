import React from 'react'
import { AppBar, Button, ButtonGroup, Stack, styled, Toolbar, Typography,Box } from '@mui/material'
import logoImg from '../public/lo.png'
import Image from 'next/image'

let NavBar = function() {
    let StyledBox = styled(Box)({
        display:'flex',
        flexDirection:'row',
        flexWrap:'nowrap',
        justifyContent:'center',
        alignItems:'center',
    
      })
    let navItems = ['HOME','STATISTICS','ABOUT','CONTACT']
  return (
    <AppBar  sx={{backgroundColor:'black',opacity:0.7}}>
    <Toolbar>
      <Stack direction={'row'} alignItems='center' width={'100%'} justifyContent={'space-around'}>
      <Box  sx = {{maxWidth:35}}>
        <Image  height={'100%'} width={'100%'} src = {logoImg} alt ='logo picture'/>
      </Box>
        <StyledBox>
        {
          navItems.map((item,index)=>{
            return <Button key={index} m={2}sx={{'&:hover':{backgroundColor:'rgb(0, 132, 255)'}}} variant='h4' >{item}</Button>
          })
        }
        </StyledBox>
        <StyledBox  >
        <ButtonGroup>
          <Button  variant='contained'>Log In</Button>
          <Button  variant='contained'>Register</Button>
        </ButtonGroup>
        </StyledBox>
      </Stack>
    </Toolbar>
  </AppBar>
  )
}

export default NavBar