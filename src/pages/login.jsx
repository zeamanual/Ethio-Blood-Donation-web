import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
import { Alert, Box, Button, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import Layout from '../components/layout'

function Login() {
    let [loginDetails,setLoginDetails]= React.useState({userName:'',password:''})
    let [errorDetails,setErrorDetails]= React.useState({userName:{hasError:false,msg:''},password:{hasError:false,msg:''},isFormValid:false})
    let [showPassword,setShowPassword]= React.useState(false)
    let formSubmitHandler = (e)=>{
        e.preventDefault();
        if((!errorDetails.userName.hasError  && loginDetails.userName)  && (!errorDetails.password.hasError && loginDetails.password )){
            console.log("no error")
        }else{
            console.log("form not submitted")
        }
        
    }
    let usernameChangeHandler = (e)=>{
        setLoginDetails({...loginDetails,userName:e.target.value})
        if(e.target.value.length<5){
            setErrorDetails({
                ...errorDetails,
                userName:{
                    hasError:true,
                    msg:'User Name must be at least 5 characters'
                },
                isFormValid:false
            })
        }else{
            setErrorDetails({
                ...errorDetails,
                userName:{
                    hasError:false,
                    msg:''
                },
                isFormValid:(true && !errorDetails.password.hasError && loginDetails.password)
            })  
        }
    }
    let passwordChangeHandler = (e)=>{
        setLoginDetails({...loginDetails,password:e.target.value})
        if(e.target.value.length<8){
            setErrorDetails({
                ...errorDetails,
                password:{
                    hasError:true,
                    msg:'Password must be at least 8 characters'
                },
                isFormValid:false
            })
        }else{
            setErrorDetails({
                ...errorDetails,
                password:{
                    hasError:false,
                    msg:''
                },
                isFormValid:(true && !errorDetails.userName.hasError && loginDetails.userName)
            })  
        }
    }
    let passwordvisibilityHandler = ()=>{
        setShowPassword(!showPassword)
    }
  return (
    <Layout>
        <Box my={5} mx={{md:25,xs:2}} sx={{borderRadius:4,overflow:'hidden',boxShadow:'2px 2px 5px gray'}}>
            <Grid container >
                <Grid item xs={12} md={7}>
                    <Box sx={{height:'100%',width:'100%',
                  backgroundImage:`url(/login2.png)`,
                  backgroundPosition:'center',
                  backgroundSize:'contain',
                  backgroundRepeat:'no-repeat',
                  borderRadius:0,
                  backgroundColor:'rgb(204, 204, 204)'
                  }}> 

                    </Box>
                </Grid>

                <Grid item xs={12} md={5}>
                    <Box sx={{ackgroundColor:'yellow'}}> 
                        <form onSubmit={formSubmitHandler}>
                        <Stack px={6} py={15} gap={2}  direction={'column'}>
                            <Box>
                                <TextField fullWidth={true}  value={loginDetails.userName} onChange={usernameChangeHandler} size='small' label='Username' ></TextField>
                            {errorDetails.userName.hasError ? <Alert sx={{padding:0,marginTop:1}} severity="error">{errorDetails.userName.msg}</Alert>:<></> }
                            </Box>

                            <Box>
                            <TextField
                            type={showPassword?'text':'password'}
                            value = {loginDetails.password} 
                            onChange={passwordChangeHandler} 
                            size='small' label='password' 
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton onClick={passwordvisibilityHandler}>
                                        {showPassword?<VisibilityOff />:<Visibility></Visibility>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            }}
                            fullWidth={true}
                             ></TextField>
                            {errorDetails.password.hasError ? <Alert sx={{padding:0,marginTop:1}} severity="error">{errorDetails.password.msg}</Alert>:<></> }
                          
                            </Box>
                            <Box  display={'flex'} justifyContent={'center'}>
                                <Button disabled={errorDetails.isFormValid?false:true} type='submit' variant='contained'>Log in</Button>
                            </Box>
                            <Box>
                           <Typography align='center'>
                           Don't have Habesha Donate account yet? <Box component={'span'} color='primary' ><Link underline='hover' href="/signup" >Sign Up</Link></Box> 
                           </Typography> 
                            </Box>
                        </Stack>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </Layout>
  )
}

export default Login