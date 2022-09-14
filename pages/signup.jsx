import { Box, Button, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material'
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
    let [fieldsValue,setFieldsValue]=React.useState({
        userName:'',
        phoneNumber:'',
        email:'',
        address:'',
        bloodType:'',
        password:'',
        gender:'',
        age:''
    })

    let handleNameChange=(e)=>{
        setFieldsValue({
            ...fieldsValue,
            userName:e.target.value
        })
        // console.log(e.target.value,'user')
    }
    let handlePhoneNumberChange=(e)=>{
        setFieldsValue({
            ...fieldsValue,
            phoneNumber:e.target.value
        })
        // console.log(e.target.value,'phone')
    }
    let handleEmailChange=(e)=>{
        setFieldsValue({
            ...fieldsValue,
            email:e.target.value
        })
        // console.log(e.target.value,'email')
    }
    let handleAddressChange=(e)=>{
        setFieldsValue({
            ...fieldsValue,
            address:e.target.value
        })
        // console.log(e.target.value,'address')
    }
    let handleAgeChange=(e)=>{
        setFieldsValue({
            ...fieldsValue,
            age:e.target.value
        })
        // console.log(e.target.value,'age')
    }
    let handleGenderChange=(e)=>{
        setFieldsValue({
            ...fieldsValue,
            gender:e.target.value
        })
        // console.log(e.target.value,'gender')
    }
    let handleBloodtypeChange=(e)=>{
        setFieldsValue({
            ...fieldsValue,
            bloodType:e.target.value
        })
        // console.log(e.target.value,'blood')
    }
    let handlePasswordChange=(e)=>{
        setFieldsValue({
            ...fieldsValue,
            password:e.target.value
        })
        // console.log(e.target.value,'pass')
    }
    let submitHandler = (e)=>{
        e.preventDefault();
        console.log(fieldsValue)
        
    }
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

                  <Stack padding={3} sx={{height:'100%',width:'100%'}}>
                    <Typography align='center' my={2} variant='h5'>Enter Your Informaion Down Below</Typography>
                    <TextField value ={fieldsValue.userName} onChange={handleNameChange} label='Username' variant='outlined' margin='dense' ></TextField>
                    <TextField value ={fieldsValue.email} onChange={handleEmailChange} label='Email' variant='outlined' margin='dense' ></TextField>
                    <TextField value ={fieldsValue.phoneNumber} onChange={handlePhoneNumberChange} label='Phone Number' variant='outlined' margin='dense' ></TextField>
                    <TextField value ={fieldsValue.address} onChange={handleAddressChange} label='Address' variant='outlined' margin='dense' select >
                        {cities.map(city=>{
                            return  <MenuItem key={city.name} value={city.name} >{city.name}</MenuItem>
                        })
                        }
                    </TextField>
                    <TextField value ={fieldsValue.age} onChange={handleAgeChange} label='Age' variant='outlined' margin='dense' ></TextField>
                    <TextField value ={fieldsValue.gender} onChange={handleGenderChange} label='Gender' select  variant='outlined' margin='dense' >
                        <MenuItem value='Male'>
                            Male
                        </MenuItem>
                        <MenuItem value='Female'>
                            Female
                        </MenuItem>
                    </TextField>
                    <TextField value ={fieldsValue.bloodType} onChange={handleBloodtypeChange} label='Blood Type' select variant='outlined' margin='dense' >
                        {
                            bloodTypes.map(bloodType=>{
                                return <MenuItem key={bloodType} value={bloodType}>{bloodType}</MenuItem>
                            })
                        }
                    </TextField>
                    <TextField value ={fieldsValue.password} onChange={handlePasswordChange} label='password' variant='outlined' margin='dense' ></TextField>
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