import { Alert, Autocomplete, Box, Button, Grid, LinearProgress, Stack, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomResponseModal from '../components/customResponseModal'
import Layout from '../components/layout'
import { CITIES } from '../constants'
import { createDonor, getCurrentDonorData, resetDonorFormStatus, updateDonorAddress } from '../state/slices/donorSlice'
import CustomProgressModal from './customProgressModal'
import CustomResponseModalNoRoute from './customResponseModalNoRoute'

function UpdateDonationAddress() {
    let dispatch = useDispatch()
    let router = useRouter()
    let [address, setAddress] = React.useState([])
    let [fetchedDataUsed, setFetchedDataUsed] = React.useState(false)
    let [fieldErrorMsg, setFieldErrorMsg] = React.useState('')
    let isAuthenticated = useSelector(state => state.user.isAuthenticated)
    let userRoles = useSelector(state => state.user.roles)
    let donorState = useSelector(state => state.donor)

    let handleAddressChange = (e, value) => {
        if (value.length < 1) {
            setFieldErrorMsg('Donation Location Can Not Be Empty')
            setAddress([])
        } else {
            let addressList = value.map(add => add.name)
            setAddress(addressList)
            setFieldErrorMsg('')
        }
    }

    // adding existing donation locations once they are fetched from the backend
    if (!fetchedDataUsed && donorState.currentDonorData.data) {
        setAddress(donorState.currentDonorData.data.address)
        setFetchedDataUsed(true)
    }

    let submitHandler = (e) => {
        e.preventDefault();
        if (!fieldErrorMsg) {
            dispatch(updateDonorAddress(address))
        } else {
            if (address.length < 1) {
                fieldErrorMsg = 'Donation Location Can Not Be Empty'
            }
        }
    }

    let handleModalClose = () => {
        dispatch(resetDonorFormStatus())
    }

    React.useEffect(() => {
        if (!isAuthenticated) {
            router.push('login')
        }
        dispatch(resetDonorFormStatus())
        if (!donorState.currentDonorData.data) dispatch(getCurrentDonorData())
    }, [isAuthenticated, userRoles])

    return (
        <Box>
            {donorState.updateDonorInfo.successMsg ?
                <CustomResponseModalNoRoute
                    btnName={'Got It'}
                    msg={donorState.updateDonorInfo.successMsg}
                    severity={'success'}
                    open={Boolean(donorState.updateDonorInfo.successMsg)}
                    onCloseCallBack={handleModalClose}
                >
                </CustomResponseModalNoRoute> :
                donorState.updateDonorInfo.errorMsg ?
                    <CustomResponseModalNoRoute
                        btnName={'Back'}
                        msg={donorState.updateDonorInfo.errorMsg}
                        severity={'error'}
                        open={Boolean(donorState.updateDonorInfo.errorMsg)}
                        onCloseCallBack={handleModalClose}
                    >
                    </CustomResponseModalNoRoute> : <></>}
            {donorState.currentDonorData.errorMsg ?
                <CustomResponseModalNoRoute
                    btnName={'Back'}
                    msg={donorState.currentDonorData.errorMsg }
                    severity={'error'}
                    open={Boolean(donorState.currentDonorData.errorMsg )}
                    onCloseCallBack={handleModalClose}
                >
                </CustomResponseModalNoRoute> : <></>}
            {donorState.currentDonorData.loading ?
                <CustomProgressModal message={'Loading Donation Address'} open={donorState.currentDonorData.loading} >
                </CustomProgressModal> :
                donorState.loading ? <CustomProgressModal message={'Updating Changes'} open={donorState.loading} ></CustomProgressModal> :
                    <Box>
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
                                    <Typography variant='h5' align='center' p={3}>Update Locations To Donate On</Typography>
                                    <form onSubmit={submitHandler}>
                                        <Autocomplete
                                            multiple
                                            id="tags-standard"
                                            value={address.map(add => { return { name: add } })}
                                            options={CITIES}
                                            onChange={handleAddressChange}
                                            isOptionEqualToValue={(option, value) => { return option.name == value.name }}
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
                                        <Box display={'flex'} justifyContent='center' alignItems={'center'} flexDirection={'column'} padding={2}>
                                            {donorState.newDonor.errorMsg ? <Alert sx={{ margin: 2 }} severity='error'>{donorState.newDonor.errorMsg}</Alert> : <></>}
                                            <Button type='submit' variant="contained"  >Update Donation Adress</Button>
                                        </Box>
                                    </form>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
            }
        </Box>
    )
}

export default UpdateDonationAddress