import { Alert, Autocomplete, Box, Button, Grid, LinearProgress, Stack, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomResponseModal from '../components/customResponseModal'
import Layout from '../components/layout'
import { CITIES } from '../constants'
import { createDonor, resetDonorFormStatus } from '../state/slices/donorSlice'

function CreateDonor() {
    let dispatch = useDispatch()
    let router = useRouter()
    let userAddress = useSelector(state => state.user.address)
    let [address, setAddress] = React.useState([userAddress])
    let [fieldErrorMsg, setFieldErrorMsg] = React.useState('')
    let isAuthenticated = useSelector(state => state.user.isAuthenticated)
    let donorState = useSelector(state => state.donor)
    let submitHandler = (e) => {
        e.preventDefault();
        if(!fieldErrorMsg){
            dispatch(createDonor({addressData:address}))
        }else{
            if(address.length<1){
                fieldErrorMsg='Donation Location Can Not Be Empty'
            }
        }

    }
    let handleAddressChange = (e,value) => {
        if(value.length<1){
            fieldErrorMsg='Donation Location Can Not Be Empty'
        }else{
            let cityNames = value.map(city=>city.name)
            setAddress(cityNames)
            fieldErrorMsg=''
        }
    }


    React.useEffect(() => {
        if (!isAuthenticated) {
            router.push('login')
        }
        dispatch(resetDonorFormStatus())
    }, [isAuthenticated])


    return (
        <Layout>
            <CustomResponseModal
                open={Boolean(donorState.newDonor.successMsg)}
                msg={donorState.newDonor.successMsg}
                path='/request/all'
                btnName='Donate Now.'
                severity={'success'}
            ></CustomResponseModal>

            <Box sx={{ margin: { xl: 10, md: 15, xs: 3 }, boxShadow: 10, borderRadius: 2 }}>
                {donorState.loading && <LinearProgress></LinearProgress>}
                <Grid container>
                    <Grid item md={6} xs={12}>
                        <Box sx={{
                            height: '100%', width: '100%',
                            backgroundImage: `url(/locationPick.png)`,
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: 0
                        }}>
                        </Box>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Box sx={{ padding: 4 }}>
                            <Typography variant='h5' align='center' p={3}>Select Locations To Donate On</Typography>
                            <form onSubmit={submitHandler}>

                                <Autocomplete
                                    multiple
                                    id="tags-standard"
                                    defaultValue={[{
                                        name: address[0]
                                    }]} 
                                    options={CITIES}
                                    onChange={handleAddressChange}
                                    isOptionEqualToValue={(option,value)=>{ return option.name==value.name}}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={Boolean(fieldErrorMsg)}
                                            helperText={fieldErrorMsg ? fieldErrorMsg : "You can selected more than one location to donate on. For example if you have a diffrent resdential and work address"}
                                            label="Donation Locations"
                                            placeholder='location'

                                        ></TextField>
                                    )}
                                >
                                </Autocomplete>
                                <Box display={'flex'} justifyContent='center' alignItems={'center'} flexDirection={'column'}  padding={2}>
                                    {donorState.newDonor.errorMsg?<Alert sx={{margin:2}} severity='error'>{donorState.newDonor.errorMsg}</Alert>:<></>}
                                    <Button disabled={donorState.loading} type='submit'  variant="contained"  >Save Donation Adress</Button>
                                </Box>
                            </form>

                        </Box>

                    </Grid>
                </Grid>
            </Box>
        </Layout>
    )
}

export default CreateDonor