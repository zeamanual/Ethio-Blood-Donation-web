import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { donorRoleAdded } from "./userSlice";

export let createDonor = createAsyncThunk(
    'donor/newDonor',
   async ({addressData},thunkApi)=>{
  
        let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        let accessToken = thunkApi.getState().user.accessToken
        
        try {
            let response = await axios({
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${accessToken}`
                },
                url:`${baseUrl}/donor`,
                method:"post",
                data:{'address':addressData}
            })
            thunkApi.dispatch(donorRoleAdded())
            return response.data

        } catch (error) {
            let errorMsg = error.response.data.message
            return thunkApi.rejectWithValue(errorMsg)
        }
    }
)


export let donate = createAsyncThunk(
    'donor/donate',
   async ({requestId},thunkApi)=>{
  
        let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        let accessToken = thunkApi.getState().user.accessToken

        try {
            let response = await axios({
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${accessToken}`
                },
                url:`${baseUrl}/request/${requestId}/donate`,
                method:"put",
            })
            return response.data

        } catch (error) {
            let errorMsg = error.response.data.message
            return thunkApi.rejectWithValue(errorMsg)
        }
    }
)

let initialState = {
    details:{
        donationAddress:[],
    },
    loading: false,
    newDonor: {
        successMsg:'',
        errorMsg: ''
    },
    updateDonor: {
        successMsg:'',
        errorMsg: ''
    },
    myDonations:[],
    newDonation:{
        errorMsg:'',
        successMsg:''
    }
}

let donorSlice = createSlice({
    name:'donor',
    initialState,
    reducers:{
        resetDonorFormStatus:(state)=>{
            state.newDonor = {
                successMsg:'',
                errorMsg: ''
            }
            state.updateDonor={
                successMsg:'',
                errorMsg: ''
            }
        },
        resetNewDonationStatus:(state)=>{
            state.newDonation.errorMsg=''
            state.newDonation.successMsg=''
        }
    },
    extraReducers:(builder)=>{

        // recucers for creating donor
        builder.addCase(createDonor.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(createDonor.fulfilled,(state,action)=>{
            state.loading=false,
            state.newDonor.successMsg="Donor Profile Created Sucessfully."
            state.newDonor.errorMsg=''
        })
        builder.addCase(createDonor.rejected,(state,action)=>{
            state.loading=false
            state.newDonor.errorMsg=action.payload
            state.newDonor.successMsg=''
        })

        // reducers for donating for a request

        builder.addCase(donate.pending,state=>{
            state.loading=true
        })
        builder.addCase(donate.fulfilled,(state,action)=>{
            state.newDonation.successMsg="Thank You For your willingess To Donate Your Blood. We Have Let The Requester Know About Your Donation, They Will Contact You Soon "
            state.newDonation.errorMsg=''
            state.loading=false 
        })
        builder.addCase(donate.rejected,(state,action)=>{
            state.newDonation.successMsg=""
            state.newDonation.errorMsg=action.payload
            state.loading=false 
        })
    }
})

export let {resetDonorFormStatus,resetNewDonationStatus} = donorSlice.actions

let reducer = donorSlice.reducer
export default reducer