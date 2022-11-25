import { Copyright, EmailRounded, GitHub, KeyboardArrowUp, LinkedIn, LocationOn, Twitter } from '@mui/icons-material'
import { Avatar, Box, Button, Grid, Stack, styled, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import logoImg from '../../public/lo.png'
function Footer() {
    let router = useRouter()
    let user = useSelector(state => state.user)
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
            name: 'GALLERY',
            path: '/#gallery'
        },
        {
            name: 'ABOUT',
            path: '/#about'
        },
        {
            name: 'TESTIMONIAL',
            path: '/#testimonial'
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
    let handleDonateNow = () => {
        if (user.isAuthenticated) {
            user.roles.includes('DONOR') ? router.push('/request/all') : router.push("/createDonor")
        } else {
            router.push("/login")
        }
    }
    let handleCreateRequestNow = () => {
        if (user.isAuthenticated) {
            router.push('/newRequest')
        } else {
            router.push("/login")
        }
    }
    return (
        <StyledBox>
            <Grid container>
                <Grid item xs={12} md={3}>
                    <div onClick={()=>{router.push("/")}} style={{cursor:'pointer'}} >
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
                            <Image height={60} width={100} src={'/logo.png'} alt='logo picture' />
                            <Button sx={{ width: '100%', fontFamily: 'Alfa Slab One' }} variant='text'>Habesha Blood Donation</Button>
                        </Box>
                    </div>
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
                        }}
                    >
                        <Box>
                            <Typography variant='h5' align='center' sx={{ paddingBottom: 1 }} >About The Developer</Typography>
                            <Box display={'flex'} justifyContent='center' alignItems='center'>
                                <Avatar alt='Developer Image' sx={{ width: 90, height: 90 }} src={'/user/crooped.png'}></Avatar>

                            </Box>
                            <Typography color='primary' variant='h6' align='center' >Zeamanual Feleke</Typography>
                            <Typography sx={{ marginBottom: 3 }} variant='h5' align='center'>Stay Connected</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                                <a href='https://github.com/zeamanual' target={'_blank'} rel='noreferrer'><GitHub sx={{ color: '#171515', transition: 'transform 0.3s linear', '&:hover': { transform: 'scale(2)' } }}></GitHub></a>
                                <a href='https://linkedin.com/in/zeamanual-feleke-541310229' rel='noreferrer' target={'_blank'}><LinkedIn sx={{ color: '#0A66C2', transition: 'transform 0.3s linear', '&:hover': { transform: 'scale(2)' } }}></LinkedIn></a>
                                <a href='mailto:zeamanualfeleke@gmail.com' target={'_blank'} rel='noreferrer'><EmailRounded sx={{ transition: 'transform 0.3s linear',color:'black', '&:hover': { transform: 'scale(2)' } }}></EmailRounded></a>
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
                        <Box display='flex' justifyContent={'center'}>
                            <Image width={200} height={120} src={'/FlagofEthiopia.gif'}></Image>
                        </Box>
                        <Button sx={{ width: '100%', margin: '1em ', marginTop: '3em' }} onClick={handleDonateNow} variant='contained'>Donate Now</Button>
                        <Button sx={{ width: '100%', margin: '0em 1em ' }} onClick={handleCreateRequestNow} variant='contained'>Create A Request</Button>
                        <Link href={'/#home'}><Button color="secondary" sx={{ position: 'absolute', bottom: '-5em', right: 1 }} variant='contained' startIcon={<KeyboardArrowUp></KeyboardArrowUp>} >Back To Top</Button></Link>
                    </Box>
                </Grid>
            </Grid>
            <hr style={{ backgroundColor: 'black', margin: '1em 0' }} ></hr>
            <Box display='flex' flexDirection={'column'} alignItems='center'>
                <Box display='flex' >
                    <Typography sx={{ margin: '0 0.8em' }} color='primary' fontFamily={'Alfa Slab One'}>{'Habesha Blood Donation '}</Typography>
                    <Typography>All Rights Reserved
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