import { Alert, Backdrop, Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomPaperCard from '../../components/customPaperCard'
import CustomProgressModal from '../../components/customProgressModal'
import CustomResponseModal from '../../components/customResponseModal'
import CustomResponseModalNoRoute from '../../components/customResponseModalNoRoute'
import Layout from '../../components/layout'
import { donate, getCurrentDonorData, resetNewDonationStatus } from '../../state/slices/donorSlice'
import { getOneRequest } from '../../state/slices/requestSlice'
import moment from 'moment'

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
  let handleModalClose = () => {
    dispatch(resetNewDonationStatus())
  }

  React.useEffect(() => {
    if (!userState.isAuthenticated) {
      router.push('/login')
    }
    dispatch(resetNewDonationStatus())
    dispatch(getCurrentDonorData())
    dispatch(getOneRequest({ requestId }))
  }, [userState.isAuthenticated])

  return (
    <Layout>
      <CustomResponseModalNoRoute
        btnName={'Back'}
        msg={donorState.newDonation.errorMsg}
        severity={'error'}
        open={Boolean(donorState.newDonation.errorMsg)}
        onCloseCallBack={handleModalClose}

      >
      </CustomResponseModalNoRoute>
      <CustomPaperCard>
        <CustomProgressModal open={donorState.loading} message={'Donation In Progress'} ></CustomProgressModal>
        <CustomResponseModal
          btnName={"Go To Home"}
          msg={donorState.newDonation.successMsg}
          open={Boolean(donorState.newDonation.successMsg)}
          severity={'success'}
          path={'/'}
        ></CustomResponseModal>
        {requestState.loading ?
          <Box sx={{ height: '50vh', width: '100%', display: 'flex', justifyContent: "center", alignItems: 'center' }}>
            <CircularProgress></CircularProgress>
          </Box> :
          requestState.requestDetail.errorMsg ? <Alert severity='error'>{requestState.requestDetail.errorMsg}</Alert> :
            requestState.requestDetail.requestData ? <Box>
              <Typography align='center' sx={{ margin: 3 }} variant='h4' > {requestDetail.userRef.gender == 'FEMALE' ? 'Miss' : "Mister"} {requestDetail.userRef.userName}{"'s Blood Request Detail"}</Typography>
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
                  <Typography variant='h5'>Request Created On : <Typography color='GrayText' variant='h5' component={'span'}> {moment(requestDetail.date.toString()).format('MMMM d, YYYY')}</Typography></Typography>
                </Grid>
                <Grid item xs={12} sx={{ borderRadius: 2, border: "2px solid gray ", padding: 1 }}>
                  <Typography variant='h5'>Looking For Donors in: : <Typography color='GrayText' variant='h5' component={'span'}> {requestDetail.address.map(addr => `${addr}, `)}</Typography></Typography>
                </Grid>
                <Grid item xs={12} sx={{ borderRadius: 2, border: "2px solid gray ", padding: 1 }}>
                  <Typography variant='h5'>Message : <Typography color='GrayText' variant='h5' component={'span'}>{requestDetail.message}</Typography></Typography>
                </Grid>
              </Grid>
              <Box p={1} display='flex' justifyContent={'center'}>
                {donorState.currentDonorData?.data?.isElligibleToDonate ?
                  <Button onClick={donateHandler} color='primary' variant='contained' >Donate Now</Button> :
                  <Box padding={{md:2,xs:0}} display='flex' flexDirection={'column'} alignItems='center'>
                    <Alert severity='warning'>{"Thanks For Visting, But, You Are In Recovery And You Can't Donate Now. Recovery Time is The Time Before 3 Months After Your Last Donation"}</Alert>
                    <Button variant='outlined' sx={{ margin: '1em 0' }} >{`You Can Start Donating Starting From ${moment(donorState.currentDonorData.data.lastDonationDate.toString()).add(75, 'days').format('MMMM d, YYYY')}`}</Button>
                  </Box>
                }
              </Box>
            </Box> : <></>
        }

      </CustomPaperCard>
    </Layout>
  )
}

export default RequestDetail