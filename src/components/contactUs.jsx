import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import CustomProgressModal from './customProgressModal'
import CustomResponseModal from './customResponseModal'
import StyledTextField from './styledTextField'

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
            sendContactForm({
                name: contactUsData.name.value,
                email: contactUsData.email.value,
                subject: contactUsData.subject.value,
                message: contactUsData.message.value
            })
        }

    }

    let sendContactForm = async (contactusDataToBeSent) => {
        try {
            setContactFormSubmitState(previousData => { return { ...previousData, loading: true } })
            let response = await axios({
                url: 'https://formsubmit.co/6f5656d0ac46017f8a89eef547ff33cf',
                headers: {}, 
                method: 'post',
                data: { ...contactusDataToBeSent, _captcha: "false" }
            })
            setContactFormSubmitState(previousData => { return { ...previousData, loading: false, error: '', successMsg: "I Have Recieved Your Message. I Will Get Back To You Soon." } })
        } catch (error) {
            setContactFormSubmitState(previousData => { return { ...previousData, loading: false, successMsg: '', error: 'Your Message is Not Sent. Try Again' } })
        }
    }

    let formSubmitSuccessHandler = () => {
        setContactFormSubmitState({ ...contactFormSubmitState, successMsg: '', error: '' })
        setContactUsData(preValue => { Object.keys(preValue).forEach(key => { preValue[`${key}`].value = '' }); return preValue })

    }
    let formSubmitErrorHandler = () => {
        setContactFormSubmitState({ ...contactFormSubmitState, successMsg: '', error: '' })
    }

    return (
        <div id='contact'>
            <Box padding={3} paddingX={{ xs: 3, md: 22 }} >
                <CustomProgressModal message={'Sending Your Message...'} open={Boolean(contactFormSubmitState.loading)}  ></CustomProgressModal>
                <div onClick={formSubmitSuccessHandler}>
                    <CustomResponseModal open={Boolean(contactFormSubmitState.successMsg)} btnName={'Back'} path={'/#contact'} severity={'success'} msg={contactFormSubmitState.successMsg} ></CustomResponseModal>
                </div>
                <div onClick={formSubmitErrorHandler}>
                    <CustomResponseModal open={Boolean(contactFormSubmitState.error)} btnName={'Back'} path={'/#contact'} severity={'error'} msg={contactFormSubmitState.error} ></CustomResponseModal>
                </div>
                <Typography sx={{ paddingTop: '1em' }} variant='h2' align='center' color='primary.light' >Get In Touch</Typography>
                <Typography sx={{ padding: '1em 0' }} variant='h6' align='center' color='gray' >Have A Question To Ask Or Wanna Give Feedback, Feel Free To Contact Me</Typography>
                <Grid container sx={{
                    borderRadius: '1em',
                    overflow: 'hidden',
                    boxShadow: '0 0 5px gray'
                }}>
                    <Grid item xs={12} md={7}>
                        <Box sx={{
                            height: 'auto',
                            width: '100%',
                        }}>
                            <Stack direction='column' padding={2} paddingX={{ xs: 2, md: 6 }} rowGap={2}>
                                <StyledTextField type='text' error={contactUsData.name.hasError} onChange={nameChangeHandler} helperText={contactUsData.name.errorMsg} value={contactUsData.name.value} variant='standard' label='Name'></StyledTextField>
                                <StyledTextField type='email' error={contactUsData.email.hasError} onChange={emailChangeHandler} helperText={contactUsData.email.errorMsg} value={contactUsData.email.value} variant='standard' label='Email'></StyledTextField>
                                <StyledTextField ype='text' error={contactUsData.subject.hasError} onChange={subjectChangeHandler} helperText={contactUsData.subject.errorMsg} value={contactUsData.subject.value} variant='standard' label='Subject'></StyledTextField>
                                <StyledTextField ype='text' error={contactUsData.message.hasError} onChange={messageChangeHandler} helperText={contactUsData.message.errorMsg} value={contactUsData.message.value} variant='standard' label='Message' multiline rows={2}></StyledTextField>
                                <Box>
                                    <Button onClick={submitHandler} variant='contained'>Submit</Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid item md={5} xs={12}>
                        <Box
                            sx={{
                                position: "relative",
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
        </div>
    )
}

export default ContactUs