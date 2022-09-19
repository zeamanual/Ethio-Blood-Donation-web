import { Box, Button, Grid, Stack, styled, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import logoImg from '../../public/lo.png'
function Footer() {
    let navItems = ['HOME','STATISTICS','ABOUT','CONTACT']
    let StyledBox= styled(Box)({
        backgroundColor:'black',
        opacity:0.7,
        marginBottom:0,
        padding:20
    })
    return (
      <StyledBox>
      <Grid container>
      <Grid item xs={12} md={3}>
            <Box
            sx={{
                height:'100%',
                display:'flex',
                alignItems:'center',
                flexDirection:'column',
                justifyContent:'center',
                gap:3,
                padding:2
            }}
            >
             <Image  height={60} width={100} src = {logoImg} alt ='logo picture'/>
             <Button sx={{width:'100%'}} variant='text'>Habesha Blood Donation</Button>
            </Box>
        </Grid>
        <Grid xs={12} md={3} item>
            <Stack direction={'column'}
            >
                {navItems.map((item,index)=>{
                    return (
                            <Button
                            key={index}
                            sx={{color:'white',margin:1,'&:hover':{backgroundColor:'primary.main'}}}
                            >
                                {item}
                            </Button>                  
                    )

                })}
            </Stack>      
        </Grid>
       
        <Grid item xs={12} md={3}>
            <Box
            // backgroundColor='blue'
            sx={{
                height:'100%',
                display:'flex',
                alignItems:'center',
                flexDirection:'column',
                justifyContent:'center',
                gap:3,
                padding:2
            }}
            >
             <Button sx={{width:'100%'}}  variant='contained'>Donate Now</Button>
             <Button sx={{width:'100%'}} variant='contained'>Create A Request</Button>
            </Box>
        </Grid>
        <Grid item xs={12} md={3}>
            <Box
            sx={{
                height:'100%',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                margin:1
            }}
            >
             <Button m={3} variant='contained'>Social Media Icons</Button>

            </Box>
        </Grid>
      </Grid>
      </StyledBox>   
    )

}

export default Footer