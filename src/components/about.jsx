import { FormatQuoteRounded } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

function About() {
    return (
        <Box id='about'>
            <Typography sx={{ paddingTop: '1.7em', paddingBottom: '0.4em' }} variant='h2' align='center' color='dark'>About</Typography>
            <Box sx={{
                borderRadius: '1em',
                overflow: 'hidden',
                margin: 2, width: 'auto'
            }}>
                <Grid container >
                    <Grid item xs={12} md={7}>
                        <Box sx={{
                            minHeight: '100vh', width: '100%',
                            padding: '1em',
                            // backgroundColor: 'rgba(10,145,200,0.2)',
                            backgroundColor: 'rgba(100,145,200,0.2)',
                        }}>
                            <Typography variant='h4' align='center'>What Is The Aim of The Platform ?</Typography>
                            <Box sx={{ padding: '2em' }}>
                                <Typography><FormatQuoteRounded></FormatQuoteRounded></Typography>
                                <Typography align='justify' variant='h6' sx={{ fontStyle: 'italic' }} >{"The World Health Organization (WHO) suggests that if  1 percent of a country's population donate blood, national blood demand will be satisfied. But why are we still in shortage? Who wants to be in that 1 percent and save lives?"}
                                </Typography>
                                <Typography align='right'><FormatQuoteRounded></FormatQuoteRounded></Typography>

                            </Box>

                            <Typography align='justify' variant='h6' sx={{ paddingTop: '1em' }}>{"Habesha Blood Donation Platform is developed with the aim of helping people with a need of blood to be able to get donors easily And Assist those who have the willingness to donate to be able to help others. The platform is designed with the foundational belief that there is a shortage of blood in our country not because there aren't enough blood donors, But due to lack of awareness about the condition and a mediator to help connect donors with those who need them. This platform will fill those gaps and have a profound impact in eliminating blood shortage issues in Ethiopia."}
                            </Typography>
                            <Typography sx={{ paddingTop: '1em' }} align='center' variant='h6'>{"So, Who is ready for this adventure? I bet you're, Let’s come together and solve this issue once and for all."}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5} >
                        <Box sx={{ width: '100%', height: '100%', background: 'url(/collaboration.png)', backgroundPosition: 'center', backgroundSize: 'cover', backgroundAttachment: 'scroll' }}></Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default About