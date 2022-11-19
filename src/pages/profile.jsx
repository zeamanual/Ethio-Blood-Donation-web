import React from 'react'
import Layout from '../components/layout'
import { VerifiedUser, Visibility, VisibilityOff } from '@mui/icons-material'
import { Alert, Box, Button, Fade, Grid, IconButton, InputAdornment, LinearProgress, MenuItem, Modal, Snackbar, Stack, Tab, Tabs, TextField, Typography } from '@mui/material'
import { resetFormStatus, signUpUser } from '../state/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import Summary from '../components/summary'
import { useRouter } from 'next/router'
import { BLOODTYPES, CITIES } from '../constants'
import CustomResponseModal from '../components/customResponseModal'
import UpdateProfile from '../components/updateProfile'
import UpdateDonationAddress from '../components/updateDonationAddress'

function Profile() {
    let state = useSelector(state => state)
    let router = useRouter()

    let dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(resetFormStatus())
    }, [])
    let [selectedTab, setSelectedTab] = React.useState('1')
    let tabChangeHandler = (event, newValue) => {
        setSelectedTab(newValue)
    }
    return (
        <Layout>
            <Box my={5} mx={{ md: 8, xs: 2 }} sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '2px 2px 5px gray' }}>
                <Box margin={2}>
                    <Typography variant='h2' align='center' >Update Your Profile Information</Typography>
                </Box>
                <Box display='flex' justifyContent={'center'} marginTop={4}>
                    <Tabs value={selectedTab} onChange={tabChangeHandler}>
                        <Tab label='Basic Profile Update' value='1'></Tab>
                        <Tab label='Donation Address Update' value='2'></Tab>
                    </Tabs>
                </Box>
                <Box >
                    {state.user.loading && <LinearProgress></LinearProgress>}

                    {
                        selectedTab === '1' ? <UpdateProfile></UpdateProfile> :
                            selectedTab === '2' ? <UpdateDonationAddress></UpdateDonationAddress> : <></>
                    }
                </Box>
            </Box>
        </Layout>
    )
}

export default Profile