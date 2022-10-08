import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
            return response.data

        } catch (error) {
            let errorMsg = error.response.data.message
            return thunkApi.rejectWithValue(errorMsg)
        }
    }
)

let initialState = {
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
    }
})

export let {resetDonorFormStatus} = donorSlice.actions

let reducer = donorSlice.reducer
export default reducer