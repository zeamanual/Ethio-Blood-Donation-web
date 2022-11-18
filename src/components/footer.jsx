import { Copyright, EmailRounded, GitHub, KeyboardArrowUp, LinkedIn, LocationOn, Twitter } from '@mui/icons-material'
import { Avatar, Box, Button, Grid, Stack, styled, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logoImg from '../../public/lo.png'
function Footer() {
    let navItems = [
        {
            name: 'HOME',
            path: '/#home'
        },
        {
            name: 'GUIDE',
            path: '/#guide'
        },
        {
            name: 'ABOUT',
            path: '/#about'
        },
        {
            name: 'GALLERY',
            path: '/#gallery'
        },
        {
            name: 'CONTACT',
            path: '/#contact'
        },
    ]
    let StyledBox = styled(Box)({
        backgroundColor: 'rgb(130, 162, 181)',
        opacity: 0.9,
        marginTop: 50,
        padding: 20,
        boxShadow: '0 0 1em gray'
    })
    return (
        <StyledBox>
            <Grid container>
                <Grid item xs={12} md={3}>
                    <Box
                        sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: 3,
                            padding: 2
                        }}
                    >
                        <Image height={60} width={100} src={logoImg} alt='logo picture' />
                        <Button sx={{ width: '100%', fontFamily: 'Alfa Slab One' }} variant='text'>Habesha Blood Donation</Button>
                    </Box>
                </Grid>
                <Grid sx={{ marginBottom: 4 }} xs={12} md={3} item>
                    <Typography variant='h5' align='center' sx={{ marginBottom: 1 }}>Quick Links</Typography>
                    <Stack direction={'column'}
                    >
                        {navItems.map((item, index) => {
                            return (
                                <Link key={index} style={{ display: 'block', width: '100%' }} href={item.path}>
                                    <Box display='flex' justifyContent={'center'}>
                                        <Button
                                            sx={{ width: '80%', color: 'white', marginX: 1, '&:hover': { backgroundColor: 'primary.main' } }}
                                        >
                                            {item.name}
                                        </Button>
                                    </Box>
                                </Link>
                            )

                        })}
                    </Stack>

                </Grid>

                <Grid sx={{ marginBottom: 4 }} item xs={12} md={3}>
                    <Box
                        sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent: 'start',
                            gap: 3,
                            // padding: 2
                        }}
                    >
                        <Box>
                            <Typography variant='h5' align='center' sx={{ paddingBottom: 1 }} >About The Developer</Typography>
                            <Box display={'flex'} justifyContent='center' alignItems='center'>
                                <Avatar alt='Developer Image' sx={{ width: 90, height: 90 }} src={'/user/crooped.png'}></Avatar>

                            </Box>
                            <Typography color='white' variant='h6' align='start' >Zeamanual Feleke</Typography>
                            <Box display={'flex'} justifyContent='flex-start' alignItems='center'>
                                <EmailRounded></EmailRounded> <Typography sx={{ padding: '0 1em' }} variant='h6' align='center' color='white'>zeamanualfeleke@gmail.com</Typography>
                            </Box>
                            <Box display={'flex'} justifyContent='flex-start' alignItems='center'>
                                <LocationOn></LocationOn> <Typography sx={{ padding: '0 1em' }} variant='h6' color='white' align='center' >Addis Ababa, Ethiopia</Typography>
                            </Box>


                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Box
                        sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                            flexDirection: 'column',
                            margin: '0 1em',
                            position: 'relative'
                        }}
                    >
                        <Typography sx={{ marginBottom: 3 }} variant='h5' align='center'>Stay Connected</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginBottom: 3 }}>
                            <GitHub></GitHub>
                            <LinkedIn></LinkedIn>
                            <EmailRounded></EmailRounded>
                            <Twitter></Twitter>
                        </Box>
                        <Button sx={{ width: '100%', margin: '1em ', marginTop: '3em' }} variant='contained'>Donate Now</Button>
                        <Button sx={{ width: '100%', margin: '0em 1em ' }} variant='contained'>Create A Request</Button>
                        <Link href={'/#home'}><Button color="secondary" sx={{ position: 'absolute', bottom: '-5em', right: 1 }} variant='contained' startIcon={<KeyboardArrowUp></KeyboardArrowUp>} >Back To Top</Button></Link>
                    </Box>
                </Grid>
            </Grid>
            <hr style={{ backgroundColor: 'black', margin: '1em 0' }} ></hr>
            <Box display='flex' flexDirection={'column'} alignItems='center'>
                <Box display='flex' >
                    <Typography sx={{ margin: '0 0.8em' }} color='primary' fontFamily={'Alfa Slab One'}>{'Habesha Blood Donation '}</Typography>
                    <Typography>All Rights Reserved
                        {/* <Copyright sx={{padding:0,margin:0}} ></Copyright>  */}
                    </Typography>

                </Box>
                <Box display='flex'>
                    <Typography>Developed By </Typography><Typography sx={{ margin: '0 0.6em' }} color='primary' >Zeamanual Feleke</Typography>
                </Box>
            </Box>
        </StyledBox>
    )

}

export default Footer