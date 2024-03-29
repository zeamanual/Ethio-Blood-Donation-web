import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { donorRoleAdded } from "./userSlice";

export let createDonor = createAsyncThunk(
    'donor/newDonor',
    async ({ addressData }, thunkApi) => {

        let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        let accessToken = thunkApi.getState().user.accessToken

        try {
            let response = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                url: `${baseUrl}/donor`,
                method: "post",
                data: { 'address': addressData }
            })
            thunkApi.dispatch(donorRoleAdded())
            return response.data

        } catch (error) {
            let errorMsg = error.response.data?.message
            return thunkApi.rejectWithValue(errorMsg?errorMsg:error.message)
        }
    }
)

export let updateDonorAddress = createAsyncThunk(
    'donor/updateAddress',
    async (addressData, thunkApi) => {
        let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        let accessToken = thunkApi.getState().user.accessToken

        try {
            let response = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                url: `${baseUrl}/donor`,
                method: "put",
                data: { 'address': addressData, active: true }
            })
            return response.data

        } catch (error) {
            let errorMsg = error.response.data?.message
            return thunkApi.rejectWithValue(errorMsg?errorMsg:error.message)
        }
    }
)

export let cancelDonation = createAsyncThunk(
    'donor/cancelDonation',
    async (reqId, thunkApi) => {
        let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        let accessToken = thunkApi.getState().user.accessToken

        try {
            let response = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                url: `${baseUrl}/request/removeDonor/${reqId}`,
                method: "put",
            })
            return response.data

        } catch (error) {
            let errorMsg = error.response.data?.message
            return thunkApi.rejectWithValue(errorMsg?errorMsg:error.message)
        }
    }
)

export let getCurrentDonorData = createAsyncThunk(
    'donor/getCurrentDonorData',
    async (donorId = '', thunkApi) => {
        let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        let accessToken = thunkApi.getState().user.accessToken

        try {
            let response = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                url: `${baseUrl}/donor`,
                method: "get",
            })
            return response.data

        } catch (error) {
            let errorMsg = error.response.data?.message
            return thunkApi.rejectWithValue(errorMsg?errorMsg:error.message)
        }
    }
)

export let donate = createAsyncThunk(
    'donor/donate',
    async ({ requestId }, thunkApi) => {

        let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        let accessToken = thunkApi.getState().user.accessToken

        try {
            let response = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                url: `${baseUrl}/request/${requestId}/donate`,
                method: "put",
            })
            return response.data

        } catch (error) {
            let errorMsg = error.response.data?.message
            return thunkApi.rejectWithValue(errorMsg?errorMsg:error.message)
        }
    }
)

let initialState = {
    details: {
        donationAddress: [],
    },
    loading: false,
    newDonor: {
        successMsg: '',
        errorMsg: ''
    },
    updateDonorInfo: {
        successMsg: '',
        errorMsg: ''
    },
    myDonations: [],
    newDonation: {
        errorMsg: '',
        successMsg: ''
    },
    cancelDonation:{
        errorMsg:'',
        successMsg:''
    },
    currentDonorData: {
        loading: false,
        data: '',
        errorMsg: '',
        successMsg: ''
    }
}

let donorSlice = createSlice({
    name: 'donor',
    initialState,
    reducers: {
        resetDonorFormStatus: (state) => {
            state.newDonor = {
                successMsg: '',
                errorMsg: ''
            }
            state.updateDonorInfo = {
                successMsg: '',
                errorMsg: ''
            }
            state.currentDonorData = {
                data:state.currentDonorData.data,
                errorMsg: '',
                successMsg: '',
                loading: false
            }
        },
        resetCancelDonationStatus:(state)=>{
            state.cancelDonation.errorMsg=''
            state.cancelDonation.successMsg=''
        },
        resetNewDonationStatus: (state) => {
            state.newDonation.errorMsg = ''
            state.newDonation.successMsg = ''
        },
        resetCurrentDonorStatus:(state)=>{
            state.currentDonorData.errorMsg=''
            state.currentDonorData.successMsg=''
            state.currentDonorData.loading=false
        }
    },
    extraReducers: (builder) => {

        // recucers for creating donor
        builder.addCase(createDonor.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createDonor.fulfilled, (state, action) => {
            state.loading = false,
                state.newDonor.successMsg = "Donor Profile Created Sucessfully."
            state.newDonor.errorMsg = ''
        })
        builder.addCase(createDonor.rejected, (state, action) => {
            state.loading = false
            state.newDonor.errorMsg = action.payload
            state.newDonor.successMsg = ''
        })

        // reducers for getting current donor data
        builder.addCase(getCurrentDonorData.pending, (state) => {
            state.currentDonorData.loading = true
        })
        builder.addCase(getCurrentDonorData.fulfilled, (state, action) => {
            state.currentDonorData.loading = false
            state.currentDonorData.data = action.payload
            state.currentDonorData.errorMsg = ''
            state.currentDonorData.successMsg = 'Donor Information Fetched Successfuly'
        })
        builder.addCase(getCurrentDonorData.rejected, (state, action) => {
            state.currentDonorData.loading = false
            state.currentDonorData.data = ''
            state.currentDonorData.errorMsg = action.payload
            state.currentDonorData.successMsg = ''
        })

        // reducers for donating for a request
        builder.addCase(donate.pending, state => {
            state.loading = true
        })
        builder.addCase(donate.fulfilled, (state, action) => {
            state.newDonation.successMsg = "Thank You For your willingess To Donate Your Blood. We Have Let The Requester Know About Your Donation, They Will Contact You Soon "
            state.newDonation.errorMsg = ''
            state.loading = false
        })
        builder.addCase(donate.rejected, (state, action) => {
            state.newDonation.successMsg = ""
            state.newDonation.errorMsg = action.payload
            state.loading = false
        })


        // reducers for canceling donation
        builder.addCase(cancelDonation.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(cancelDonation.fulfilled,(state,action)=>{
            state.loading=false
            state.cancelDonation.errorMsg=''
            state.cancelDonation.successMsg='Donaction Canceled Successfuly'
        })
        builder.addCase(cancelDonation.rejected,(state,action)=>{
            state.loading=false
            state.cancelDonation.successMsg=''
            state.cancelDonation.errorMsg=action.payload
        })

        // reducers for updating donor address
        builder.addCase(updateDonorAddress.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateDonorAddress.fulfilled, (state, action) => {
            state.loading = false
            state.updateDonorInfo.errorMsg = ''
            state.updateDonorInfo.successMsg = 'Donor Information Updated Successfuly'
            state.currentDonorData.data = action.payload
        })
        builder.addCase(updateDonorAddress.rejected, (state, action) => {
            state.loading = false
            state.updateDonorInfo.errorMsg = action.payload
            state.updateDonorInfo.successMsg = ''
        })
    }
})

export let { resetCurrentDonorStatus,resetCancelDonationStatus,resetDonorFormStatus, resetNewDonationStatus } = donorSlice.actions

let reducer = donorSlice.reducer
export default reducer