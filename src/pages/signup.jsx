import { VerifiedUser, Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, Grid, IconButton, InputAdornment, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import Layout from '../components/layout'

function SignUp() {
    let bloodTypes =["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]
    let cities = [
        {
            name:'Addis Ababa',
            latitude:45.67,
            longtitude:78.9
        },
        {
            name:'Dire Dewa',
            latitude:55.67,
            longtitude:25.9
        },
        {
            name:'Dessie',
            latitude:85.67,
            longtitude:28.9
        },
        {
            name:'Bahir Dar',
            latitude:35.67,
            longtitude:53.9
        }
    ]

    let [showPassword,setShowPassword] = React.useState(false)

    let showPasswordHandler = ()=>{
        setShowPassword(!showPassword)
    }

    let handleNameChange=(e)=>{
        let value = e.target.value
        if(value.length<5){
            setFieldsValue(previousValue=>({
                ...previousValue,
                userName:{...fieldsValue.userName,hasError:true,msg:'username name must be at least 5 characters',value:e.target.value}
            }))
        }else{
            setFieldsValue(previousValue=>({
                ...previousValue,
                userName:{...fieldsValue.userName,hasError:false,msg:'',value:e.target.value}
            }))
        }
    }
    let handlePhoneNumberChange=(e)=>{
        if(e.target.value.length<10){
            setFieldsValue(previousValue=>({
                ...previousValue,
                phoneNumber:{...fieldsValue.phoneNumber,hasError:true,msg:"Phone number too short",value:e.target.value}
            }))
        }else{
            setFieldsValue(previousValue=>({
                ...previousValue,
                phoneNumber:{...fieldsValue.phoneNumber,hasError:false,msg:"",value:e.target.value}
            }))
        }
     
    }
    let handleEmailChange=(e)=>{
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let isValid = regex.test(e.target.value)
        if(isValid){
            setFieldsValue(previousValue=>({
                ...previousValue,
                email:{...fieldsValue.email,hasError:false,msg:'',value:e.target.value}
            }))
        }else{
            setFieldsValue(previousValue=>({
                ...previousValue,
                email:{...fieldsValue.email,hasError:true,msg:'Enter a valid email',value:e.target.value}
            })) 
        }
        // console.log(e.target.value,'email')
    }
    let handleAddressChange=(e)=>{
        setFieldsValue(previousValue=>({
            ...previousValue,
            address:{...fieldsValue.address,hasError:false,msg:'',value:e.target.value}
        }))
        // console.log(e.target.value,'address')
    }
    let handleAgeChange=(e)=>{
        let age = parseInt(e.target.value)
        if(age<18){
            setFieldsValue(previousValue=>({
                ...previousValue,
                age:{...fieldsValue.age,hasError:true,msg:'Age can not be under 18',value:e.target.value}
            }))
        }else{
            setFieldsValue(previousValue=>({
                ...previousValue,
                age:{...fieldsValue.age,hasError:false,msg:'',value:e.target.value}
            }))
        }
        // console.log(e.target.value,'age')
    }
    let handleGenderChange=(e)=>{
        setFieldsValue(previousValue=>({
            ...previousValue,
            gender:{...fieldsValue.gender,hasError:false,msg:'',value:e.target.value}
        }))
        // console.log(e.target.value,'gender')
    }
    let handleBloodtypeChange=(e)=>{
        setFieldsValue(previousValue=>({
            ...previousValue,
            bloodType:{...fieldsValue.bloodType,hasError:false,msg:'',value:e.target.value}
        }))
        // console.log(e.target.value,'blood')
    }
    let handlePasswordChange=(e)=>{
        if(e.target.value.length<8){
            setFieldsValue(previousValue=>({
                ...previousValue,
                password:{...fieldsValue.password,hasError:true,msg:'Password must be at least 8 characters',value:e.target.value}
            }))
        }else{
            setFieldsValue(previousValue=>({
                ...previousValue,
                password:{...fieldsValue.password,hasError:false,msg:'',value:e.target.value}
            }))
        }
        // console.log(e.target.value,'pass')
    }
    let submitHandler = (e)=>{
        e.preventDefault();
        let formValid = true
        Object.keys(fieldsValue).forEach(fieldName=>{
            if(fieldsValue[fieldName].value){
                if(fieldsValue[fieldName].hasError){
                    formValid=false
                }
            }else{

                setFieldsValue((previousValue=>{
                    return {
                        ...previousValue,
                        [fieldName]:{
                            ...previousValue[fieldName],
                            hasError:true,
                            msg:`${fieldName} can not be empty`
                        }
                    }
                }))
                formValid=false
            }
        })
        if(formValid){
            console.log('form submitted',fieldsValue)
        }else{
            console.log('form not submitted',fieldsValue)

        }
        // console.log(fieldsValue)
        
    }
    let [fieldsValue,setFieldsValue]=React.useState({
        userName:{value:'',hasError:false,msg:'',changeHandler:handleNameChange},
        phoneNumber:{value:'',hasError:false,msg:'',changeHandler:handlePhoneNumberChange},
        email:{value:'',hasError:false,msg:'',changeHandler:handleEmailChange},
        address:{value:'',hasError:false,msg:'',changeHandler:handleAddressChange},
        gender:{value:'',hasError:false,msg:'',changeHandler:handleGenderChange},
        age:{value:'',hasError:false,msg:'',changeHandler:handleAgeChange},
        bloodType:{value:'',hasError:false,msg:'',changeHandler:handleBloodtypeChange},
        password:{value:'',hasError:false,msg:'',changeHandler:handlePasswordChange},
    })
    // console.log("current status",fieldsValue)
  return (
    <Layout>
        <Box my={5} mx={{md:8,xs:2}} sx={{borderRadius:4,overflow:'hidden',boxShadow:'2px 2px 5px gray'}}>
            <Grid container >

                <Grid xs={12} md={7} item
                >
                  <Box sx={{height:'100%',width:'100%',
                  backgroundImage:`url(/signup.jpg)`,
                  backgroundPosition:'center',
                  backgroundSize:'cover',
                  backgroundRepeat:'no-repeat',
                  borderRadius:0
                  }}>

                  </Box>
                </Grid>

                <Grid xs={12} md={5}  item>
                <form onSubmit={submitHandler}>
                  
                  <Stack padding={3} gap={1} sx={{height:'100%',width:'100%'}}>
                    <Typography align='center' my={2} variant='h5'>Enter Your Informaion Down Below</Typography>
                  

                  {Object.keys( fieldsValue).map(fieldName=>{
                    let size = 'medium'
                    let inputField = ''
                    if(fieldName=='address'){
                        inputField= (
                            <TextField size={size}  error={fieldsValue[fieldName].hasError} helperText={fieldsValue[fieldName].msg} value ={fieldsValue[fieldName].value} onChange={fieldsValue[fieldName].changeHandler} label={fieldName} variant='outlined' select >
                                {cities.map(city=>{
                                    return  <MenuItem key={city.name} value={city.name} >{city.name}</MenuItem>
                                })}
                            </TextField>
                        )
                    }else if(fieldName =='gender'){
                        inputField = (
                            <TextField size={size} error={fieldsValue[fieldName].hasError} helperText={fieldsValue[fieldName].msg} value ={fieldsValue[fieldName].value} onChange={fieldsValue[fieldName].changeHandler} label={fieldName} select  variant='outlined'>
                                <MenuItem value='Male'>
                                    Male
                                </MenuItem>
                                <MenuItem value='Female'>
                                    Female
                                </MenuItem>
                            </TextField>
                          ) 
                    }else if(fieldName=='bloodType'){
                        inputField = (
                            <TextField size={size} error={fieldsValue[fieldName].hasError} helperText={fieldsValue[fieldName].msg}  value ={fieldsValue[fieldName].value} onChange={fieldsValue[fieldName].changeHandler} label={fieldName} select variant='outlined' >
                                {
                                    bloodTypes.map(bloodType=>{
                                        return <MenuItem key={bloodType} value={bloodType}>{bloodType}</MenuItem>
                                    })
                                }
                            </TextField>
                        )
                    }else if(fieldName=='password'){
                        inputField = (
                            <TextField
                            size={size}
                            error={fieldsValue[fieldName].hasError} helperText={fieldsValue[fieldName].msg}
                            type={showPassword ? 'text':'password'}
                            value ={fieldsValue[fieldName].value} onChange={fieldsValue[fieldName].changeHandler} label={fieldName} variant='outlined'
                            InputProps={{
                                endAdornment:(
                                    <InputAdornment position='end'>
                                        <IconButton onClick={showPasswordHandler}>
                                            {showPassword ? <VisibilityOff></VisibilityOff> :<Visibility></Visibility>}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            ></TextField>
                        )
                    }else{
                        inputField=  (
                            <TextField  size = {size} type={fieldName=='age' ?'number':'text'}   error={fieldsValue[fieldName].hasError} helperText={fieldsValue[fieldName].msg} value ={fieldsValue[fieldName].value} onChange={fieldsValue[fieldName].changeHandler} label={fieldName} variant='outlined' ></TextField>
                        )
                    }
                    return inputField
                  })}

                    {/* <TextField   error={fieldsValue.userName.hasError} helperText={fieldsValue.userName.msg} value ={fieldsValue.userName.value} onChange={handleNameChange} label='Username' variant='outlined' margin='dense' ></TextField>
                    <TextField error={fieldsValue.email.hasError} helperText={fieldsValue.email.msg} value ={fieldsValue.email.value} onChange={handleEmailChange} label='Email' variant='outlined' margin='dense' ></TextField>
                    <TextField error={fieldsValue.phoneNumber.hasError} helperText={fieldsValue.phoneNumber.msg} value ={fieldsValue.phoneNumber.value} onChange={handlePhoneNumberChange} label='Phone Number' variant='outlined' margin='dense' ></TextField>
                    <TextField error={fieldsValue.address.hasError} helperText={fieldsValue.address.msg}  value ={fieldsValue.address.value} onChange={handleAddressChange} label='Address' variant='outlined' margin='dense' select >
                        {cities.map(city=>{
                            return  <MenuItem key={city.name} value={city.name} >{city.name}</MenuItem>
                        })
                        }
                    </TextField>
                    <TextField error={fieldsValue.age.hasError} helperText={fieldsValue.age.msg} value ={fieldsValue.age.value} onChange={handleAgeChange} type={'number'} label='Age' variant='outlined' margin='dense' ></TextField>
                    <TextField  error={fieldsValue.gender.hasError} helperText={fieldsValue.gender.msg} value ={fieldsValue.gender.value} onChange={handleGenderChange} label='Gender' select  variant='outlined' margin='dense' >
                        <MenuItem value='Male'>
                            Male
                        </MenuItem>
                        <MenuItem value='Female'>
                            Female
                        </MenuItem>
                    </TextField>
                    <TextField  error={fieldsValue.bloodType.hasError} helperText={fieldsValue.bloodType.msg} value ={fieldsValue.bloodType.value} onChange={handleBloodtypeChange} label='Blood Type' select variant='outlined' margin='dense' >
                        {
                            bloodTypes.map(bloodType=>{
                                return <MenuItem key={bloodType} value={bloodType}>{bloodType}</MenuItem>
                            })
                        }
                    </TextField>
                    <TextField
                    error={fieldsValue.password.hasError} 
                    helperText={fieldsValue.password.msg}
                    type={showPassword ? 'text':'password'}
                    value ={fieldsValue.password.value} onChange={handlePasswordChange} label='password' variant='outlined' margin='dense'
                    InputProps={{
                        endAdornment:(
                            <InputAdornment position='end'>
                                <IconButton onClick={showPasswordHandler}>
                                    {showPassword ? <VisibilityOff></VisibilityOff> :<Visibility></Visibility>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    ></TextField> */}
                    <Box sx={{display:'flex',justifyContent:'center',marginTop:2}}>
                    <Button type='submit' variant='contained'>Sign Up</Button>
                    </Box>
                  </Stack>
                </form>
                </Grid>

             
            </Grid>
        </Box>
    </Layout>
  )
}

export default SignUp