import { Alert, Backdrop, Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomPaperCard from '../../components/customPaperCard'
import CustomProgressModal from '../../components/customProgressModal'
import CustomResponseModal from '../../components/customResponseModal'
import Layout from '../../components/layout'
import { donate, resetNewDonationStatus } from '../../state/slices/donorSlice'
import { getOneRequest } from '../../state/slices/requestSlice'

function RequestDetail() {
  let router = useRouter()
  let donorState = useSelector(state => state.donor)
  let requestState = useSelector(state => state.request)
  let userState = useSelector(state => state.user)
  let dispatch = useDispatch()
  let requestId = router.query.reqId
  let requestDetail = requestState.requestDetail.requestData

  let donateHandler = () => {
    dispatch(donate({ requestId }))
  }

  React.useEffect(() => {
    if (!userState.isAuthenticated) {
      router.push('login')
    }
    dispatch(resetNewDonationStatus())
    dispatch(getOneRequest({ requestId }))
  }, [userState.isAuthenticated])

  return (
    <Layout>
      <CustomPaperCard>
        <CustomProgressModal open={donorState.loading} message={'Donation In Progress'} ></CustomProgressModal>
        <CustomResponseModal
          btnName={"Go To Home"}
          msg={donorState.newDonation.successMsg}
          open={donorState.newDonation.successMsg}
          severity={'success'}
          path={'/'}
        ></CustomResponseModal>
        {requestState.loading ?
          <Box sx={{ height: '50vh', width: '100%', display: 'flex', justifyContent: "center", alignItems: 'center' }}>
            <CircularProgress></CircularProgress>
          </Box> :
          requestState.requestDetail.errorMsg ? <Alert severity='error'>{requestState.requestDetail.errorMsg}</Alert> :
            requestState.requestDetail.requestData ? <Box>
              <Typography align='center' sx={{ margin: 3 }} variant='h4' > {requestDetail.userRef.gender == 'FEMALE' ? 'Miss' : "Mister"} {requestDetail.userRef.userName}{"/'s Blood Request Detail"}</Typography>
              <Grid container gap={1} >
                <Grid xs={12} item sx={{ borderRadius: 2, border: "2px solid gray ", padding: 1 }}>
                  <Typography variant='h5'>User Name : <Typography color='GrayText' variant='h5' component={'span'}> {requestDetail.userRef.userName}</Typography></Typography>
                </Grid>
                <Grid item xs={12} sx={{ borderRadius: 2, border: "2px solid gray ", padding: 1 }} >
                  <Typography variant='h5'>Required Bood Type :<Typography color='GrayText' variant='h5' component={'span'}>  {requestDetail.bloodType}</Typography></Typography>
                </Grid>
                <Grid item xs={12} sx={{ borderRadius: 2, border: "2px solid gray ", padding: 1 }} >
                  <Typography variant='h5'>Blood Unit Required : <Typography color='GrayText' variant='h5' component={'span'}> {requestDetail.requiredBloodUnit}</Typography></Typography>
                </Grid>
                <Grid item xs={12} sx={{ borderRadius: 2, border: "2px solid gray ", padding: 1 }}>
                  <Typography variant='h5'>Found Donors So Far : <Typography color='GrayText' variant='h5' component={'span'}> {requestDetail.foundDonors.length}</Typography></Typography>
                </Grid>
                <Grid item xs={12} sx={{ borderRadius: 2, border: "2px solid gray ", padding: 1 }}>
                  <Typography variant='h5'>Request Created On : <Typography color='GrayText' variant='h5' component={'span'}> {requestDetail.date.toString()}</Typography></Typography>
                </Grid>
                <Grid item xs={12} sx={{ borderRadius: 2, border: "2px solid gray ", padding: 1 }}>
                  <Typography variant='h5'>Looking For Donors in: : <Typography color='GrayText' variant='h5' component={'span'}> {requestDetail.address.map(addr => `${addr}, `)}</Typography></Typography>
                </Grid>
                <Grid item xs={12} sx={{ borderRadius: 2, border: "2px solid gray ", padding: 1 }}>
                  <Typography variant='h5'>Message : <Typography color='GrayText' variant='h5' component={'span'}>{requestDetail.message}</Typography></Typography>
                </Grid>
              </Grid>
              <Box p={1} display='flex' justifyContent={'center'}>
                <Button onClick={donateHandler} color='secondary' variant='contained' >Donate Now</Button>
              </Box>
              {donorState.newDonation.errorMsg ? <Alert severity='error'>{donorState.newDonation.errorMsg}</Alert> : <></>}
            </Box> : <></>
        }

      </CustomPaperCard>
    </Layout>
  )
}

export default RequestDetail