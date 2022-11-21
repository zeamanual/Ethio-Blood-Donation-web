import { Alert, Box, Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomPaperCard from '../components/customPaperCard'
import CustomProgressModal from '../components/customProgressModal'
import Layout from '../components/layout'
import ReqestsHighLight from '../components/requestHighLight'
import { getDonorMatchingRequests, getMyRequests, getRequestsUserDonatedOn, managePaginationForLocalData } from '../state/slices/requestSlice'

function MyRequests() {
    let router = useRouter()
    let dispatch = useDispatch()
    let userState = useSelector(state => state.user)
    let requestState = useSelector(state => state.request)
    let requests = requestState.requests.subList
    let totalRequestsSize = requestState.requests.totalLength


    let pageChangeHandler = (event, value) => {
        dispatch(managePaginationForLocalData({ pageNumber: value }))
    }

    let requestClickHandler = (request)=>{
        router.push({ pathname: '/request/donated', query: { reqId: request._id } })
      }

    React.useEffect(() => {
        if (!userState.isAuthenticated) {
            router.push('login')
        } 
        dispatch(getRequestsUserDonatedOn())
    }, [userState.isAuthenticated])

    return (
        <>
            <CustomProgressModal message={'Loading Requests'} open={requestState.loading} ></CustomProgressModal>
            <Layout>
                <CustomPaperCard>
                    {requests.length < 1 ?
                        <Box>
                            <Alert severity='info'>{"Looks Like You Haven't Donated Before"}</Alert>
                        </Box> :
                        <Box width='100%'>
                            <Box>
                                <Typography sx={{ padding: 3 }} variant="h4" color='gray' align='center'>Requests That You Have Donated For</Typography>
                                <Stack alignItems={'end'} >
                                    <Button variant='contained' color='secondary' >Total Donations So Far : {requestState.requests.data.length}</Button>
                                </Stack>

                            </Box>
                            <ReqestsHighLight requestClickHandler={requestClickHandler} pageChangeHandler={pageChangeHandler} totalPageItems={totalRequestsSize} requests={requests} ></ReqestsHighLight>
                        </Box>
                    }
                </CustomPaperCard>
            </Layout>
        </>
    )
}

export default MyRequests