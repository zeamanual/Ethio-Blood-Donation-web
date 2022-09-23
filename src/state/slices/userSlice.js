import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { loading } from "./statusSlice";

let initialState={
    isAuthenticated:false,
    roles:[],
    accessToken:'',
    userId:'',
    error:'',
    loading:false,
    login:{
        errorMsg:'',
    },
    signUp:{
        errorMsg:'',
        sucessMsg:'',
    }
}

export let logInUser = createAsyncThunk(
    'user/login',
   async ({username,password,router},thunkApi)=>{
        let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        try {
            let response = await axios({
                method:'post',
                headers:{
                    'Content-Type':'application/json'
                },
                url:`${baseUrl}/user/login`,
                data:{
                    username,
                    password
                }
            })
        
            console.log('log in sucessful',response.data)
            router.push("/")
            return response.data
            
        } catch (error) {
            let errorMsg = error.response.data.message
            console.log("log in failed: ",errorMsg)
            return thunkApi.rejectWithValue(errorMsg)
        }
    }
    )

export let signUpUser = createAsyncThunk(
    'user/signup',
    async (signUpData,thunkApi)=>{
        let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        try {
            let response = await axios({
                url:`${baseUrl}/user/sign-up`,
                method:'post',
                headers:{
                    'Content-Type':'application/json'
                },
                data:signUpData
            })
            console.log('sign up sucessful',response.data)
            return response.data
            
        } catch (error) {
            let errorMessage = error.response.data.message
            console.log('sign up not sucessful',errorMessage)
            return thunkApi.rejectWithValue(errorMessage)
        } 
    }
)



let userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        resetFormStatus:(state)=>{

            state.login={
                errorMsg:''
            }
            state.signUp={
                errorMsg:''
            }
        },
        logOut:(state)=>{
            state.isAuthenticated=false,
            state.accessToken='',
            state.roles=[],
            state.userId=''
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(signUpUser.pending,(state)=>{
            state.loading=true
            console.log("sign up pending")
        })
        builder.addCase(signUpUser.fulfilled,(state,action)=>{
            state.loading=false
            state.signUp={
                errorMsg:'',
                sucessMsg:"Accounted Created Successfly"
            }
            console.log("sign up fulfilled")
        })
        builder.addCase(signUpUser.rejected,(state,action)=>{
            state.loading=false
            state.signUp={
                errorMsg:action.payload,
                sucessMsg:""
            }
            console.log("sign up rejected")
        })

        builder.addCase(logInUser.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(logInUser.fulfilled,(state,action)=>{
            state.accessToken=action.payload.token,
            state.isAuthenticated=true,
            state.roles=action.payload.roles,
            state.login={
                errorMsg:''
            }
            state.loading=false,
            state.userId=action.payload.userId
        })
        builder.addCase(logInUser.rejected,(state,action)=>{
            state.loading=false
            state.login={
                errorMsg:action.payload,
            }
        })
    }

})

export let {resetFormStatus,logOut}  = userSlice.actions

let reducer = userSlice.reducer
export default  reducer