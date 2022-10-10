import { Alert, Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomPaperCard from '../components/customPaperCard'
import CustomProgressModal from '../components/customProgressModal'
import Layout from '../components/layout'
import ReqestsHighLight from '../components/requestHighLight'
import { getDonorMatchingRequests, getMyRequests, managePaginationForLocalData } from '../state/slices/requestSlice'

function MyRequests() {
  let router = useRouter()
  let dispatch = useDispatch()
  let userState = useSelector(state => state.user)
  let requestState = useSelector(state => state.request)
  let requests = requestState.requests.subList
  let totalRequestsSize = requestState.requests.totalLength


  let pageChangeHandler = (event, value) => {
    dispatch(managePaginationForLocalData({pageNumber:value}))
  }

  React.useEffect(() => {
    if (!userState.isAuthenticated) {
      router.push('login')
    }

    dispatch(getMyRequests())
    console.log('hay my request is rendered',userState.isAuthenticated)
   

  }, [userState.isAuthenticated])

  return (
    <>
      <CustomProgressModal message={'Loading Requests'} open={requestState.loading} ></CustomProgressModal>
      <Layout>
        <CustomPaperCard>
          {requests.length < 1 ?
            <Box>
              <Alert severity='info'>{"Looks Like You Haven't Created Any Request Before"}</Alert>
            </Box> :
            <Box width='100%'>
              <Typography sx={{ padding: 3 }} variant="h4" color='gray' align='center'>Your Requests</Typography>
              <ReqestsHighLight  pageChangeHandler={pageChangeHandler} totalPageItems={totalRequestsSize} requests={requests} ></ReqestsHighLight>
            </Box>
          }
        </CustomPaperCard>
      </Layout>
    </>
  )
}

export default MyRequests