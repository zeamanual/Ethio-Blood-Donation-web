import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export let createRequest = createAsyncThunk(
    'request/newRequest',
    async ({ requestData, router }, thunkApi) => {
        let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        let accessToken = thunkApi.getState().user.accessToken
        console.log("hay create new request triggered", `${baseUrl}/request`, '\n token ', accessToken)
        try {
            let response = await axios({
                url: `${baseUrl}/request`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                method: "post",
                data: requestData
            })

            console.log('new request sucess status', response.data)
            return response.data
        } catch (error) {
            console.log('new request error message', errorMsg)
            let errorMsg = error.response.data.message
            return thunkApi.rejectWithValue(errorMsg)
        }
    }
)

export let updateRequest = createAsyncThunk(
    'request/update',
    async ({ requestId, requestData }, thunkApi) => {
        let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        let accessToken = thunkApi.getState().user.accessToken
        try {
            let response = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                url: `${baseUrl}/request/${requestId}`,
                method: "put",
                data: requestData
            })

            console.log('update request sucess status', response.data)
            return response.data
        } catch (error) {
            console.log('update request error message', errorMsg)
            let errorMsg = error.response.data.message
            return thunkApi.rejectWithValue(errorMsg)
        }
    }
)

export let getOneRequest = createAsyncThunk(
    'request/getOne',
    async ({ requestId }, thunkApi) => {
        let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        let accessToken = thunkApi.getState().user.accessToken
        try {
            let response = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                url: `${baseUrl}/request/${requestId}`,
                method: "get",
            })
            console.log('get single request method success ',response.data)
            return response.data
        } catch (error) {
            let errorMsg = error.response.data.message
            return thunkApi.rejectWithValue(errorMsg)
        }
    }
)

export let getMyRequests = createAsyncThunk(
    'request/getMyRequests',
    async (option = '', thunkApi) => {
        let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        let accessToken = thunkApi.getState().user.accessToken
        try {
            let response = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                url: `${baseUrl}/request`,
                method: "get",
            })

            return response.data
        } catch (error) {
            let errorMsg = error.response.data.message
            return thunkApi.rejectWithValue(errorMsg)
        }
    }
)

export let getDonorMatchingRequests = createAsyncThunk(
    'donor/getDonorMatchingRequests',
    async ({ pageNumber, ignorePageNumber }, thunkApi) => {
        let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        let accessToken = thunkApi.getState().user.accessToken
        try {
            let finalResponse = {
                totalItemSize: '',
                response: ''
            }

            if (ignorePageNumber) {
                let response = await axios({
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    url: `${baseUrl}/request/match/${pageNumber}?ignorePageNumber=${ignorePageNumber}`,
                    method: "get",
                })

                finalResponse.totalItemSize = response.data

            }

            let response = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                url: `${baseUrl}/request/match/${pageNumber}`,
                method: "get",
            })

            finalResponse.response = response.data

            return finalResponse
        } catch (error) {
            let errorMsg = error.response.data.message
            return thunkApi.rejectWithValue(errorMsg)
        }
    }
)

export let getRequestsUserDonatedOn = createAsyncThunk(
    'request/getRequestsUserDonatedOn',
    async (option = '', thunkApi) => {
        let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        let accessToken = thunkApi.getState().user.accessToken
        try {
            let response = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                url: `${baseUrl}/request/byDonorId`,
                method: "get",
            })

            return response.data
        } catch (error) {
            let errorMsg = error.response.data.message
            return thunkApi.rejectWithValue(errorMsg)
        }
    }
)

export let deleteRequest = createAsyncThunk(
    'request/delete',
    async ({ requestId }, thunkApi) => {
        let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        let accessToken = thunkApi.getState().user.accessToken
        try {
            let response = await axios({
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                url: `${baseUrl}/request/${requestId}`,
                method: "delete",
            })

            console.log('delete request sucess status', response.data)
            return response.data
        } catch (error) {
            console.log('delete request error message', errorMsg)
            let errorMsg = error.response.data.message
            return thunkApi.rejectWithValue(errorMsg)
        }
    }
)



let initialState = {
    requests: {
        data: [],
        subList: [],
        totalLength: 0,
        errorMsg: ''
    },
    loading: false,
    newRequest: {
        successMsg: '',
        errorMsg: ''
    },
    updateRequest: {
        successMsg: '',
        errorMsg: ''
    },
    deleteRequest: {
        successMsg: '',
        errorMsg: ''
    },
    requestDetail: {
        errorMsg: '',
        requestData: ''
    }
}

let requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        resetRequestFormStatus: (state) => {
            state.newRequest = {
                errorMsg: '',
                successMsg: ''
            }
            state.updateRequest = {
                errorMsg: '',
                successMsg: ''
            }
            state.deleteRequest = {
                errorMsg: '',
                successMsg: ''
            }
        },
        managePaginationForLocalData: (state, action) => {
            let pageNumber = action.payload.pageNumber
            let startIndex = 10 * pageNumber - 10
            let lastIndex = state.requests.data.length >= 10 * pageNumber ? 10 * pageNumber : state.requests.data.length
            state.requests.subList = state.requests.data.slice(startIndex, lastIndex)
        }
    },
    extraReducers: (builder) => {

        // reducers for creating new request
        builder.addCase(createRequest.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createRequest.fulfilled, (state, action) => {
            state.loading = false
            state.newRequest.successMsg = 'Request Created Successfully'
        })
        builder.addCase(createRequest.rejected, (state, action) => {
            state.loading = false
            state.newRequest.errorMsg = action.payload
        })

        // reducers for updating request 
        builder.addCase(updateRequest.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateRequest.fulfilled, (state, action) => {
            state.loading = false
            state.updateRequest.successMsg = 'Request Updated Successfully'
            state.updateRequest.errorMsg = ''
        })
        builder.addCase(updateRequest.rejected, (state, action) => {
            state.loading = false
            state.updateRequest.errorMsg = action.payload
            state.updateRequest.successMsg = ''
        })

        // reducers for deleting request
        builder.addCase(deleteRequest.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteRequest.fulfilled, (state, action) => {
            state.loading = false
            state.deleteRequest.successMsg = 'Request Deleted Successfully'
            state.deleteRequest.errorMsg = ''
        })
        builder.addCase(deleteRequest.rejected, (state, action) => {
            state.loading = false
            state.deleteRequest.successMsg = ''
            state.deleteRequest.errorMsg = action.payload
        })

        // reducers for getting a single request 
        builder.addCase(getOneRequest.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getOneRequest.fulfilled, (state, action) => {
            state.requestDetail.requestData = action.payload
            state.requestDetail.errorMsg = ''
            state.loading = false
        })
        builder.addCase(getOneRequest.rejected, (state, action) => {
            state.requestDetail.requestData = ''
            state.requestDetail.errorMsg = action.payload
            state.loading = false
        })

        // reducers for getting donor matching requests
        builder.addCase(getDonorMatchingRequests.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getDonorMatchingRequests.fulfilled, (state, action) => {
            state.requests.data = action.payload.response
            state.requests.totalLength = action.payload.totalItemSize ? action.payload.totalItemSize : state.requests.totalLength
            state.requests.errorMsg = ''
            state.loading = false
        })
        builder.addCase(getDonorMatchingRequests.rejected, (state, action) => {
            state.requests.data = []
            state.requests.totalLength = 0
            state.requests.errorMsg = action.payload
            state.loading = false
        })

        // reducers for getting user requests
        builder.addCase(getMyRequests.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getMyRequests.fulfilled, (state, action) => {
            state.requests.data = action.payload
            let subListSize = action.payload.length >= 10 ? 10 : action.payload.length
            state.requests.subList = state.requests.data.slice(0, subListSize)
            state.requests.totalLength = action.payload.length
            state.requests.errorMsg = ''
            state.loading = false
        })
        builder.addCase(getMyRequests.rejected, (state, action) => {
            state.requests.data = []
            state.requests.subList = []
            state.requests.errorMsg = action.payload
            state.requests.totalLength = 0
            state.loading = false
        })

        // reducers to get requests on which a user have donated
        builder.addCase(getRequestsUserDonatedOn.pending,state=>{
            state.loading = true
        })
        builder.addCase(getRequestsUserDonatedOn.fulfilled,(state,action)=>{
            state.requests.data = action.payload
            let subListSize = action.payload.length >= 10 ? 10 : action.payload.length
            state.requests.subList = state.requests.data.slice(0, subListSize)
            state.requests.totalLength = action.payload.length
            state.requests.errorMsg = ''
            state.loading = false
        })
        builder.addCase(getRequestsUserDonatedOn.rejected,(state,action)=>{
            state.requests.data = []
            state.requests.subList = []
            state.requests.errorMsg = action.payload
            state.requests.totalLength = 0
            state.loading = false
        })
    }
})

export let { resetRequestFormStatus, managePaginationForLocalData } = requestSlice.actions

let reducer = requestSlice.reducer
export default reducer