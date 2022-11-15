import { FormatQuoteRounded } from '@mui/icons-material'
import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import Carousel from 'react-material-ui-carousel'
function Testimonials() {
    let [customWindowSize, setWindowSize] = React.useState('md')
    React.useEffect(() => {
        setWindowSize(window.innerWidth > 900 ? 'md' : 'xs')
        window.addEventListener('resize', () => {
            setWindowSize(window.innerWidth > 900 ? 'md' : 'xs')
        })
    }, [])
    let testimonials = [
        {
            writer: 'Bruik Mesfin',
            date: '12 Apr 2022',
            profession: 'Student',
            url: '/user/user1.jpg',
            message: 'I \'m Glad That Such A Platform Is Developed. I have a Great Hope That This Kind of Platforms Will Reduce So Many Uncessary Efforts. I Realy Appriciate Your Effort and I Expect More Features In Future Updates'
        },
        {
            writer: 'Dawit Tesfa',
            date: '02 Jun 2022',
            profession: 'Economist',
            url: '/user/user2.jpg',
            message: 'I \'m Glad That Such A Platform Is Developed. I have a Great Hope That This Kind of Platforms Will Reduce So Many Uncessary Efforts. I Realy Appriciate Your Effort and I Expect More Features In Future Updates'
        },
        {
            writer: 'Bruik Mesfin',
            date: '12 Apr 2022',
            profession: 'Doctor',
            url: '/user/user1.jpg',
            message: 'I \'m Glad That Such A Platform Is Developed. I have a Great Hope That This Kind of Platforms Will Reduce So Many Uncessary Efforts. I Realy Appriciate Your Effort and I Expect More Features In Future Updates'
        },
        {
            writer: 'Dawit Tesfa',
            date: '02 Jun 2022',
            profession: 'Driver',
            url: '/user/user2.jpg',
            message: 'I \'m Glad That Such A Platform Is Developed. I have a Great Hope That This Kind of Platforms Will Reduce So Many Uncessary Efforts. I Realy Appriciate Your Effort and I Expect More Features In Future Updates'
        },

    ]
    return (
        <Box>
            <Box sx={{
                padding: '1em 1em'
            }}>
                <Typography variant='h2' color='gray' align='center'>Testimonials</Typography>
            </Box>
            <Box paddingX={{md:3,xs:0}} paddingY={5}>
                <Carousel
                    height={customWindowSize == 'md' ? 350 : 600}
                    navButtonsAlwaysVisible={true}
                    animation={'slide'}
                >
                    {
                        testimonials.map((testimoni,index) => {
                            return <Box key={index} margin={3} display='flex' justifyContent={'center'}>
                                <Box width='80%' display={'flex'} flexDirection={{ xs: 'column', md: 'row' }}
                                    sx={{
                                        padding: '1em 2em',
                                        borderRadius: '1em',
                                        boxShadow: '0 0 0.5em gray',
                                        minHeight:'300px'
                                    }}
                                >
                                    <Box sx={{ width: { md: '30%', xs: '100%' } }} display='flex' justifyContent={'center'} alignItems='center'>
                                        <Avatar sx={{ width: '6em', height: '6em' }} src={testimoni.url} alt='user image'></Avatar>
                                    </Box>
                                    <Box sx={{ width: { md: '70%', xs: '100%' } }}>
                                        <FormatQuoteRounded sx={{ margin: '0.5em 0' }}></FormatQuoteRounded>
                                        <Typography align='justify' color='gray'>{testimoni.message}</Typography>
                                        <Typography align='right'><FormatQuoteRounded sx={{ margin: '0.5em 0' }}></FormatQuoteRounded></Typography>
                                        <Typography variant='h4' >{testimoni.writer}</Typography>
                                        <Typography color='gray' variant='h6'>{testimoni.profession}</Typography>

                                    </Box>
                                </Box>
                            </Box>
                        })
                    }


                </Carousel>
            </Box>
        </Box>
    )
}

export default Testimonials