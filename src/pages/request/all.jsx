import { AccountCircleRounded } from '@mui/icons-material'
import { Alert, Box, Button, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomPaperCard from '../../components/customPaperCard'
import CustomProgressModal from '../../components/customProgressModal'
import CustomResponseModalNoRoute from '../../components/customResponseModalNoRoute'
import Layout from '../../components/layout'
import ReqestsHighLight from '../../components/requestHighLight'
import { getDonorMatchingRequests, resetRquestsListStatus } from '../../state/slices/requestSlice'
import { updateUserAuthStatus } from '../../state/slices/userSlice'

function Reqests() {
  let userState = useSelector(state => state.user)
  let dispatch = useDispatch()
  let router = useRouter()
  let requestState = useSelector(state => state.request)
  let requests = requestState.requests.data
  let totalRequestsSize = requestState.requests.totalLength

  let pageChangeHandler = (event, value) => {
    dispatch(resetRquestsListStatus())
    dispatch(getDonorMatchingRequests({ pageNumber: value, ignorePageNumber: false }))
  }

  let requestClickHandler = (request) => {
    router.push({ pathname: '/request', query: { reqId: request._id } })
  }

  React.useEffect(() => {
    dispatch(updateUserAuthStatus())
    if (!userState.isAuthenticated) {
      router.push('/login')
    }
    dispatch(resetRquestsListStatus())
    dispatch(getDonorMatchingRequests({ pageNumber: 1, ignorePageNumber: true }))

  }, [userState.isAuthenticated,])

  let modalCloseHadler = () => {
    dispatch(resetRquestsListStatus())
  }

  return (
    <>
      <CustomProgressModal message={'Loading Requests'} open={requestState.loading} ></CustomProgressModal>
      <Layout>
        <CustomPaperCard>
          {requests.length < 1 ?
            requestState.requests.errorMsg ?
              <Box>
                <Alert severity='error'>{requestState.requests.errorMsg}</Alert>
              </Box> :
              <Box display={'flex'} flexDirection={'column'} alignItems={'center'} >
                <img height={'300px'} src='/noData.png' ></img>
                <Alert severity='info'>No Requests Found With Your BloodType And Location Now. Thanks For Visiting</Alert>
              </Box> :
            <Box >
              <Typography sx={{ padding: 3 }} variant="h4" color='gray' align='center'>Requests That Match With Your Blood Type and Location</Typography>
              <ReqestsHighLight requestClickHandler={requestClickHandler} pageChangeHandler={pageChangeHandler} totalPageItems={totalRequestsSize} requests={requests} ></ReqestsHighLight>
            </Box>
          }
        </CustomPaperCard>
      </Layout>
    </>
  )
}

export default Reqests