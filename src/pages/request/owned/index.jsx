import { Delete, Edit } from '@mui/icons-material'
import { Alert, Backdrop, Box, Button, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomPaperCard from '../../../components/customPaperCard'
import CustomProgressModal from '../../../components/customProgressModal'
import CustomResponseModal from '../../../components/customResponseModal'
import CustomResponseModalNoRoute from '../../../components/customResponseModalNoRoute'
import Layout from '../../../components/layout'
import { donate, resetNewDonationStatus } from '../../../state/slices/donorSlice'
import { deleteRequest, getOneRequest, resetRequestDetail, resetRequestFormStatus } from '../../../state/slices/requestSlice'
import moment from 'moment'

function RequestDetail() {
  let router = useRouter()
  let donorState = useSelector(state => state.donor)
  let requestState = useSelector(state => state.request)
  let userState = useSelector(state => state.user)
  let dispatch = useDispatch()
  let requestId = router.query.reqId
  let requestDetail = requestState.requestDetail.requestData

  let handleModalClose = () => {
    dispatch(resetRequestFormStatus())
  }

  let updateRequestHandler = () => {
    router.push({ pathname: '/request/update', query: requestDetail })
  }
  let deleteRequestHandler = () => {
    dispatch(deleteRequest({ requestId }))
  }
  React.useEffect(() => {
    if (!userState.isAuthenticated) {
      router.push('/login')
    }
    dispatch(resetRequestDetail())
    dispatch(resetRequestFormStatus())
    dispatch(getOneRequest({ requestId }))
  }, [userState.isAuthenticated])

  return (
    <Layout>
      <CustomPaperCard>
        <CustomProgressModal open={requestState.loading} message={'Request In Progress'} ></CustomProgressModal>
        <CustomResponseModal
          btnName={"Go To Home"}
          msg={requestState.deleteRequest.successMsg}
          open={Boolean(requestState.deleteRequest.successMsg)}
          severity={'success'}
          path={'/'}
        ></CustomResponseModal>
          {requestState.requestDetail.errorMsg ? <CustomResponseModalNoRoute
            btnName={'Back'}
            msg={requestState.requestDetail.errorMsg}
            severity={'error'}
            open={Boolean(requestState.requestDetail.errorMsg)}
            onCloseCallBack={handleModalClose}

          >
          </CustomResponseModalNoRoute>
            : requestState.deleteRequest.errorMsg ? <CustomResponseModalNoRoute
              btnName={'Back'}
              msg={requestState.deleteRequest.errorMsg}
              severity={'error'}
              open={Boolean(requestState.deleteRequest.errorMsg)}
              onCloseCallBack={handleModalClose}

            >
            </CustomResponseModalNoRoute>
              : requestState.requestDetail.requestData ? <Box>
                <Typography align='center' sx={{ margin: 3 }} variant='h4' >{"Your Blood Request Detail"}</Typography>
                <Stack mb={2} alignItems={'end'}>
                  <Stack gap={2} direction={'row'} alignItems='center'>
                    <Typography variant="h6">STATUS :</Typography>
                    <Button sx={{ cursor: 'text' }} color={requestDetail.status == 'fulfilled' ? 'success' : 'warning'} variant='contained' disableElevation>{requestDetail.status}</Button>
                  </Stack>
                </Stack>
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
                    <Box>
                      <Box>
                        <Typography variant='h5'>Found Donors So Far : <Typography color='GrayText' variant='h5' component={'span'}> {requestDetail.foundDonors.length}</Typography></Typography>
                      </Box>
                      <Stack direction={'column'} p={2}>
                        {
                          requestDetail.donorsDetail?
                          requestDetail.donorsDetail.map((donor, index) => {
                            return (
                              <>
                                <Typography align='center' variant='h6' >Donor {index + 1} Detail</Typography>
                                <Typography variant='h6'>
                                  Username:  <Typography color='gray'>{donor.userName}</Typography>
                                  Phonenumber:<Typography color='gray' ><a href={`tel:+251${donor.phoneNumber}`}  >+251{donor.phoneNumber}</a></Typography>
                                  Email:<Typography color='gray' ><a href={`mailto:${donor.email}`}  >{donor.email}</a></Typography></Typography>
                              </>
                            )
                          }):<></>
                        }
                      </Stack>
                    </Box>
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
                <Box p={1} display='flex' justifyContent={'space-around'}>
                  <Button startIcon={<Edit></Edit>} onClick={updateRequestHandler} color='info' variant='contained' >Update</Button>
                  <Button startIcon={<Delete></Delete>} onClick={deleteRequestHandler} color='error' variant='contained' >Delete</Button>
                </Box>
              </Box> : <></>
        }

      </CustomPaperCard>
    </Layout>
  )
}

export default RequestDetail