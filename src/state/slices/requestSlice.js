import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export let createRequest = createAsyncThunk(
    'request/newRequest',
    async ({ requestData, router }, thunkApi) => {
        let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        let accessToken = thunkApi.getState().user.accessToken
        console.log("hay create new request triggered",`${baseUrl}/request`,'\n token ',accessToken)
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
    async ({ requestId, requestData, router }, thunkApi) => {
        let baseUrl = process.env.process.env.NEXT_PUBLIC_BASE_URL
        let accessToken = 'asdfsdf'
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
        let baseUrl = process.env.process.env.NEXT_PUBLIC_BASE_URL
        let accessToken = 'asdfsdf'
        try {
            let response = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                url: `${baseUrl}/request/${requestId}`,
                method: "get",
            })

            console.log('get request sucess status', response.data)
            return response.data
        } catch (error) {
            console.log('get request error message', errorMsg)
            let errorMsg = error.response.data.message
            return thunkApi.rejectWithValue(errorMsg)
        }
    }
)

export let deleteRequest = createAsyncThunk(
    'request/delete',
    async ({ requestId, router }, thunkApi) => {
        let baseUrl = process.env.process.env.NEXT_PUBLIC_BASE_URL
        try {
            let response = await axios({
                headers: {
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
    requests: [],
    loading: false,
    newRequest: {
        successMsg:'',
        errorMsg: ''
    },
    updateRequest: {
        successMsg:'',
        errorMsg: ''
    },
    deleteRequest: {
        successMsg:'',
        errorMsg: ''
    }
}

let requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        resetRequestFormStatus: (state) => {
            state.newRequest={
                errorMsg:'',
                successMsg:''
            }
            state.updateRequest.errorMsg = {
                errorMsg:'',
                successMsg:''
            }
            state.deleteRequest.errorMsg = {
                errorMsg:'',
                successMsg:''
            }
        }
    },
    extraReducers: (builder) => {

        // reducers for creating new request
        builder.addCase(createRequest.pending, (state) => {
            console.log('in pending in create request')
            state.loading = true
        })
        builder.addCase(createRequest.fulfilled, (state, action) => {
            console.log('in fullfilled in create request')
            state.loading = false
            state.newRequest.successMsg='Request Created Successfully'
        })
        builder.addCase(createRequest.rejected, (state, action) => {
            console.log('in rejected in create request',action.payload)
            state.loading = false
            state.newRequest.errorMsg = action.payload
        })

        // reducers for updating request 
        builder.addCase(updateRequest.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateRequest.fulfilled, (state, action) => {
            state.loading = false
            state.updateRequest.successMsg='Request Updated Successfully'
        })
        builder.addCase(updateRequest.rejected, (state, action) => {
            state.loading = false
            state.updateRequest.errorMsg = action.payload
        })

        // reducers for deleting request
        builder.addCase(deleteRequest.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteRequest.fulfilled, (state,action)=>{
            state.loading=false
            state.deleteRequest.successMsg='Request Deleted Successfully'
        })
        builder.addCase(deleteRequest.rejected,(state,action)=>{
            state.loading=false
            state.deleteRequest.errorMsg=action.payload
        })




    }
})

export let {resetRequestFormStatus} = requestSlice.actions

let reducer = requestSlice.reducer
export default reducer