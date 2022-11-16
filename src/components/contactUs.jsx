import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import CustomProgressModal from './customProgressModal'
import CustomResponseModal from './customResponseModal'

function ContactUs() {
    let [contactUsData, setContactUsData] = React.useState({
        name: {
            errorMsg: '',
            value: '',
            hasError: false
        },
        email: {
            errorMsg: '',
            value: '',
            hasError: false
        },
        subject: {
            errorMsg: '',
            value: '',
            hasError: false
        },
        message: {
            errorMsg: '',
            value: '',
            hasError: false
        }
    })
    let [contactFormSubmitState, setContactFormSubmitState] = React.useState({ loading: false, successMsg: '', error: '' })

    let nameChangeHandler = (event) => {
        if (event.target.value) {
            setContactUsData(previousData => {
                return {
                    ...previousData,
                    name: {
                        value: event.target.value,
                        hasError: false,
                        errorMsg: ''
                    }
                }
            })
        } else {
            setContactUsData(previousData => {
                return {
                    ...previousData,
                    name: {
                        value: '',
                        hasError: true,
                        errorMsg: 'Name can not be empty.'
                    }
                }
            })
        }
    }
    let emailChangeHandler = (event) => {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let isValid = regex.test(event.target.value)
        if (isValid) {
            setContactUsData(previousData => {
                return {
                    ...previousData,
                    email: {
                        value: event.target.value,
                        hasError: false,
                        errorMsg: ''
                    }
                }
            })
        } else {
            setContactUsData(previousData => {
                return {
                    ...previousData,
                    email: {
                        value: event.target.value,
                        hasError: true,
                        errorMsg: 'Enter a valid email'
                    }
                }
            })
        }
    }
    let subjectChangeHandler = (event) => {
        if (event.target.value) {
            setContactUsData(previousData => {
                return {
                    ...previousData,
                    subject: {
                        value: event.target.value,
                        hasError: false,
                        errorMsg: ''
                    }
                }
            })
        } else {
            setContactUsData(previousData => {
                return {
                    ...previousData,
                    subject: {
                        value: '',
                        hasError: true,
                        errorMsg: 'Subject can not be empty.'
                    }
                }
            })
        }
    }
    let messageChangeHandler = (event) => {
        if (event.target.value.length > 10) {
            setContactUsData(previousData => {
                return {
                    ...previousData,
                    message: {
                        value: event.target.value,
                        hasError: false,
                        errorMsg: ''
                    }
                }
            })
        } else {
            setContactUsData(previousData => {
                return {
                    ...previousData,
                    message: {
                        value: event.target.value,
                        hasError: true,
                        errorMsg: 'Message too short'
                    }
                }
            })
        }

    }
    let submitHandler = (event) => {
        event.preventDefault();
        let isValid = true

        for (let keyName of Object.keys(contactUsData)) {
            if (!contactUsData[keyName].value) {
                setContactUsData(previousData => {
                    return {
                        ...previousData,
                        [keyName]: {
                            value: '',
                            errorMsg: `${keyName} can not be empty`,
                            hasError: true
                        }
                    }
                })
                isValid = false
            } else if (contactUsData[keyName].hasError) {
                isValid = false
            }
        }
        if (isValid) {
            console.log('contactu us form submitted')
            sendContactForm({
                name: contactUsData.name.value,
                email: contactUsData.email.value,
                subject: contactUsData.subject.value,
                message: contactUsData.message.value
            })

        } else {
            console.log('contact us form not submitted becuase some attributed are not valid')
        }

    }

    let sendContactForm = async (contactusDataToBeSent) => {
        try {
            setContactFormSubmitState(previousData => { return { ...previousData, loading: true } })
            let response = await axios({
                url: 'https://formsubmit.co/fb607aa391ea2fbf1609aeacd50edf4d',
                headers: {},
                method: 'post',
                data: { ...contactusDataToBeSent, _captcha: "false" }
            })
            setContactFormSubmitState(previousData => { return { ...previousData, loading: false, error: '', successMsg: "I Have Recieved Your Message. I Will Get Back To You Soon." } })
        } catch (error) {
            setContactFormSubmitState(previousData => { return { ...previousData, loading: false, successMsg: '', error: 'Your Message is Not Sent. Try Again' } })
        }
    }

    return (
        <Box padding={3} paddingX={{ xs: 3, md: 22 }} >
            <CustomProgressModal message={'Sending Your Message...'} open={Boolean(contactFormSubmitState.loading)}  ></CustomProgressModal>
            <div onClick={() => { setContactFormSubmitState({ ...contactFormSubmitState, successMsg: '', error: '' }); window.location.reload() }}>
                <CustomResponseModal open={Boolean(contactFormSubmitState.successMsg)} btnName={'Back'} path={''} severity={'success'} msg={contactFormSubmitState.successMsg} ></CustomResponseModal>
            </div>
            <div onClick={() => { setContactFormSubmitState({ ...contactFormSubmitState, successMsg: '', error: '' }); }}>
                <CustomResponseModal open={Boolean(contactFormSubmitState.error)} btnName={'Back'} path={''} severity={'error'} msg={contactFormSubmitState.error} ></CustomResponseModal>
            </div>
            <Typography sx={{ padding: '1em 0' }} variant='h3' align='center' color='gray' >Have A Question To Ask Or Wanna Give Feedback, Feel Free To Contact Me</Typography>
            <Grid container sx={{
                borderRadius: '1em',
                overflow: 'hidden',
                boxShadow: '0 0 1em gray'
            }}>
                <Grid item xs={12} md={7}>
                    <Box sx={{
                        height: 'auto',
                        width: '100%',
                    }}>
                        <Stack direction='column' padding={2} paddingX={{ xs: 2, md: 6 }} rowGap={2}>
                            <TextField error={contactUsData.name.hasError} onChange={nameChangeHandler} helperText={contactUsData.name.errorMsg} defaultValue={contactUsData.name.value} variant='standard' label='Name'></TextField>
                            <TextField error={contactUsData.email.hasError} onChange={emailChangeHandler} helperText={contactUsData.email.errorMsg} defaultValue={contactUsData.email.value} variant='standard' label='Email'></TextField>
                            <TextField error={contactUsData.subject.hasError} onChange={subjectChangeHandler} helperText={contactUsData.subject.errorMsg} defaultValue={contactUsData.subject.value} variant='standard' label='Subject'></TextField>
                            <TextField error={contactUsData.message.hasError} onChange={messageChangeHandler} helperText={contactUsData.message.errorMsg} defaultValue={contactUsData.message.value} variant='standard' label='Message' multiline rows={2}></TextField>
                            <Box>
                                <Button onClick={submitHandler} variant='contained'>Submit</Button>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item md={5} xs={12}>
                    <Box
                        sx={{
                            position:"relative",
                            minHeight: '40vh',
                            height: '100%',
                            width: '100%',
                            background: 'url(/contactUs.jpg)',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ContactUs