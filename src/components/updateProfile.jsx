import React from 'react'
import Layout from '../components/layout'
import { VerifiedUser, Visibility, VisibilityOff } from '@mui/icons-material'
import { Alert, Box, Button, Fade, Grid, IconButton, InputAdornment, LinearProgress, MenuItem, Modal, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { resetFormStatus, signUpUser } from '../state/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import Summary from '../components/summary'
import { useRouter } from 'next/router'
import { BLOODTYPES, CITIES } from '../constants'
import CustomResponseModal from '../components/customResponseModal'

function UpdateProfile() {
    let state = useSelector(state => state)
    let router = useRouter()

    let dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(resetFormStatus())
    }, [])
    let [showPassword, setShowPassword] = React.useState(false)
    let [modalOpen, setModalOpen] = React.useState(false)

    let hanleModalClose = () => {
        setModalOpen(false)
    }

    let showPasswordHandler = () => {
        setShowPassword(!showPassword)
    }

    let handleNameChange = (e) => {
        let value = e.target.value
        if (value.length < 5) {
            setFieldsValue(previousValue => ({
                ...previousValue,
                userName: { ...fieldsValue.userName, hasError: true, msg: 'username name must be at least 5 characters', value: e.target.value }
            }))
        } else {
            setFieldsValue(previousValue => ({
                ...previousValue,
                userName: { ...fieldsValue.userName, hasError: false, msg: '', value: e.target.value }
            }))
        }
    }
    let handlePhoneNumberChange = (e) => {
        if (e.target.value.length < 10) {
            setFieldsValue(previousValue => ({
                ...previousValue,
                phoneNumber: { ...fieldsValue.phoneNumber, hasError: true, msg: "Phone number too short", value: e.target.value }
            }))
        } else {
            setFieldsValue(previousValue => ({
                ...previousValue,
                phoneNumber: { ...fieldsValue.phoneNumber, hasError: false, msg: "", value: e.target.value }
            }))
        }

    }
    let handleEmailChange = (e) => {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let isValid = regex.test(e.target.value)
        if (isValid) {
            setFieldsValue(previousValue => ({
                ...previousValue,
                email: { ...fieldsValue.email, hasError: false, msg: '', value: e.target.value }
            }))
        } else {
            setFieldsValue(previousValue => ({
                ...previousValue,
                email: { ...fieldsValue.email, hasError: true, msg: 'Enter a valid email', value: e.target.value }
            }))
        }
        // console.log(e.target.value,'email')
    }
    let handleAddressChange = (e) => {
        setFieldsValue(previousValue => ({
            ...previousValue,
            address: { ...fieldsValue.address, hasError: false, msg: '', value: e.target.value }
        }))
        // console.log(e.target.value,'address')
    }
    let handleAgeChange = (e) => {
        let age = parseInt(e.target.value)
        if (age < 18) {
            setFieldsValue(previousValue => ({
                ...previousValue,
                age: { ...fieldsValue.age, hasError: true, msg: 'Age can not be under 18', value: e.target.value }
            }))
        } else {
            setFieldsValue(previousValue => ({
                ...previousValue,
                age: { ...fieldsValue.age, hasError: false, msg: '', value: e.target.value }
            }))
        }
        // console.log(e.target.value,'age')
    }
    let handleGenderChange = (e) => {
        setFieldsValue(previousValue => ({
            ...previousValue,
            gender: { ...fieldsValue.gender, hasError: false, msg: '', value: e.target.value }
        }))
        // console.log(e.target.value,'gender')
    }
    let handleBloodtypeChange = (e) => {
        setFieldsValue(previousValue => ({
            ...previousValue,
            bloodType: { ...fieldsValue.bloodType, hasError: false, msg: '', value: e.target.value }
        }))
        // console.log(e.target.value,'blood')
    }
    let handlePasswordChange = (e) => {
        if (e.target.value.length < 8) {
            setFieldsValue(previousValue => ({
                ...previousValue,
                password: { ...fieldsValue.password, hasError: true, msg: 'Password must be at least 8 characters', value: e.target.value }
            }))
        } else {
            setFieldsValue(previousValue => ({
                ...previousValue,
                password: { ...fieldsValue.password, hasError: false, msg: '', value: e.target.value }
            }))
        }
        // console.log(e.target.value,'pass')
    }
    let submitHandler = (e) => {
        e.preventDefault();
        let formValid = true
        Object.keys(fieldsValue).forEach(fieldName => {
            if (fieldsValue[fieldName].value) {
                if (fieldsValue[fieldName].hasError) {
                    formValid = false
                }
            } else {

                setFieldsValue((previousValue => {
                    return {
                        ...previousValue,
                        [fieldName]: {
                            ...previousValue[fieldName],
                            hasError: true,
                            msg: `${fieldName} can not be empty`
                        }
                    }
                }))
                formValid = false
            }
        })
        if (formValid) {

            let signUpData = {
                userName: fieldsValue.userName.value,
                address: fieldsValue.address.value,
                email: fieldsValue.email.value,
                phoneNumber: fieldsValue.phoneNumber.value,
                age: parseInt(fieldsValue.age.value),
                bloodType: fieldsValue.bloodType.value,
                gender: fieldsValue.gender.value,
                password: fieldsValue.password.value
            }
            dispatch(signUpUser(signUpData))
            console.log('form submitted', fieldsValue)

        } else {
            console.log('form not submitted', fieldsValue)

        }
    }
    let [fieldsValue, setFieldsValue] = React.useState({
        userName: { value: '', hasError: false, msg: '', changeHandler: handleNameChange },
        phoneNumber: { value: '', hasError: false, msg: '', changeHandler: handlePhoneNumberChange },
        email: { value: '', hasError: false, msg: '', changeHandler: handleEmailChange },
        address: { value: '', hasError: false, msg: '', changeHandler: handleAddressChange },
        gender: { value: '', hasError: false, msg: '', changeHandler: handleGenderChange },
        age: { value: '', hasError: false, msg: '', changeHandler: handleAgeChange },
        bloodType: { value: '', hasError: false, msg: '', changeHandler: handleBloodtypeChange },
        password: { value: '', hasError: false, msg: '', changeHandler: handlePasswordChange },
    })
    // console.log("current status",fieldsValue)
    return (
            // <Box my={5} mx={{ md: 8, xs: 2 }} sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '2px 2px 5px gray' }}>
            //     {state.user.loading && <LinearProgress></LinearProgress>}
               
                <Grid container >

                    <Grid xs={12} md={6} item
                    >
                        <Box sx={{
                            height: '100%', width: '100%',
                            backgroundImage: `url(/bgImg1.jpg)`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: 0
                        }}>

                        </Box>
                    </Grid>

                    <Grid xs={12} md={6} item>

                        <form onSubmit={submitHandler}>

                            <Stack padding={3} gap={1} sx={{ height: '100%', width: '100%' }}>
                                <Typography align='center' my={2} variant='h5'>Update Your Basic Profile Informaion</Typography>

                                {Object.keys(fieldsValue).map(fieldName => {
                                    let size = 'medium'
                                    let inputField = ''
                                    if (fieldName == 'address') {
                                        inputField = (
                                            <TextField key={fieldName} size={size} error={fieldsValue[fieldName].hasError} helperText={fieldsValue[fieldName].msg} value={fieldsValue[fieldName].value} onChange={fieldsValue[fieldName].changeHandler} label={fieldName} variant='outlined' select >
                                                {CITIES.map(city => {
                                                    return <MenuItem key={city.name} value={city.name} >{city.name}</MenuItem>
                                                })}
                                            </TextField>
                                        )
                                    } else if (fieldName == 'gender') {
                                        inputField = (
                                            <TextField key={fieldName} size={size} error={fieldsValue[fieldName].hasError} helperText={fieldsValue[fieldName].msg} value={fieldsValue[fieldName].value} onChange={fieldsValue[fieldName].changeHandler} label={fieldName} select variant='outlined'>
                                                <MenuItem value='Male'>
                                                    Male
                                                </MenuItem>
                                                <MenuItem value='Female'>
                                                    Female
                                                </MenuItem>
                                            </TextField>
                                        )
                                    } else if (fieldName == 'bloodType') {
                                        inputField = (
                                            <TextField key={fieldName} size={size} error={fieldsValue[fieldName].hasError} helperText={fieldsValue[fieldName].msg} value={fieldsValue[fieldName].value} onChange={fieldsValue[fieldName].changeHandler} label={fieldName} select variant='outlined' >
                                                {
                                                    BLOODTYPES.map(bloodType => {
                                                        return <MenuItem key={bloodType} value={bloodType}>{bloodType}</MenuItem>
                                                    })
                                                }
                                            </TextField>
                                        )
                                    } else if (fieldName == 'password') {
                                        inputField = (
                                            <TextField
                                                size={size}
                                                key={fieldName}
                                                error={fieldsValue[fieldName].hasError} helperText={fieldsValue[fieldName].msg}
                                                type={showPassword ? 'text' : 'password'}
                                                value={fieldsValue[fieldName].value} onChange={fieldsValue[fieldName].changeHandler} label={fieldName} variant='outlined'
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position='end'>
                                                            <IconButton onClick={showPasswordHandler}>
                                                                {showPassword ? <VisibilityOff></VisibilityOff> : <Visibility></Visibility>}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            ></TextField>
                                        )
                                    } else {
                                        inputField = (
                                            <TextField key={fieldName} size={size} type={fieldName == 'age' ? 'number' : 'text'} error={fieldsValue[fieldName].hasError} helperText={fieldsValue[fieldName].msg} value={fieldsValue[fieldName].value} onChange={fieldsValue[fieldName].changeHandler} label={fieldName} variant='outlined' ></TextField>
                                        )
                                    }
                                    return inputField
                                })}
                                <Box m={1}>
                                    {state.user.signUp.errorMsg && <Alert severity='error' >{state.user.signUp.errorMsg}</Alert>}

                                    <CustomResponseModal
                                        open={Boolean(state.user.signUp.sucessMsg)}
                                        btnName='Log In Now.'
                                        msg={state.user.signUp.sucessMsg}
                                        path='login'
                                        severity='success'
                                    ></CustomResponseModal>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                                    <Button type='submit' variant='contained'>Update</Button>
                                </Box>
                            </Stack>
                        </form>
                    </Grid>


                </Grid>
            // </Box>
    )
}

export default UpdateProfile