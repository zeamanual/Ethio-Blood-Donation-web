import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { loading } from "./statusSlice";

let initialState = {
    isAuthenticated: false,
    roles: [],
    accessToken: '',
    userId: '',
    address: '',
    bloodType: '',
    error: '',
    loading: false,
    login: {
        errorMsg: '',
    },
    signUp: {
        errorMsg: '',
        sucessMsg: '',
    },
    updateUser: {
        errorMsg: '',
        successMsg: ''
    },
    currentUserData:{
        loading:false,
        data:'',
        errorMsg:'',
        successMsg:''

    }
}

export let logInUser = createAsyncThunk(
    'user/login',
    async ({ username, password, router }, thunkApi) => {
        let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        try {
            let response = await axios({
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: `${baseUrl}/user/login`,
                data: {
                    username,
                    password
                }
            })
            router.push("/")
            return response.data

        } catch (error) {
            let errorMsg = error.response.data.message
            return thunkApi.rejectWithValue(errorMsg)
        }
    }
)

export let getCurrentUserData = createAsyncThunk(
    'user/getCurrentUserData',
    async (userId='', thunkApi) => {
        let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        let accessToken = thunkApi.getState().user.accessToken
        try {
            let response = await axios({
                url: `${baseUrl}/user`,
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            })
            return response.data

        } catch (error) {
            let errorMessage = error.response.data.message
            return thunkApi.rejectWithValue(errorMessage)
        }
    }
)

export let signUpUser = createAsyncThunk(
    'user/signup',
    async (signUpData, thunkApi) => {
        let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        try {
            let response = await axios({
                url: `${baseUrl}/user/sign-up`,
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: signUpData
            })
            return response.data

        } catch (error) {
            let errorMessage = error.response.data.message
            return thunkApi.rejectWithValue(errorMessage)
        }
    }
)

export let updateUser = createAsyncThunk(
    'user/updateProfile',
    async (userProfileData, thunkApi) => {
        let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        let accessToken = thunkApi.getState().user.accessToken
        try {
            let response = await axios({
                url: `${baseUrl}/user`,
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                data: userProfileData
            })
            return response.data

        } catch (error) {
            let errorMessage = error.response.data.message
            return thunkApi.rejectWithValue(errorMessage)
        }
    }
)



let userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetFormStatus: (state) => {

            state.login = {
                errorMsg: ''
            }
            state.signUp = {
                errorMsg: ''
            }
        },
        logOut: (state) => {
            state.isAuthenticated = false,
                state.accessToken = '',
                state.roles = [],
                state.userId = ''
        },
        donorRoleAdded: (state) => {
            if (!state.roles.includes("DONOR")) {
                state.roles.push("DONOR")
            }
        },
        resetUpdateUserFormStatus: (state) => {
            state.updateUser.errorMsg = ''
            state.updateUser.successMsg = ''
        }

    },
    extraReducers: (builder) => {
        // reducers for sign up
        builder.addCase(signUpUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(signUpUser.fulfilled, (state, action) => {
            state.loading = false
            state.signUp = {
                errorMsg: '',
                sucessMsg: "Accounted Created Successfly"
            }
        })
        builder.addCase(signUpUser.rejected, (state, action) => {
            state.loading = false
            state.signUp = {
                errorMsg: action.payload,
                sucessMsg: ""
            }
        })

        // reducers for log in
        builder.addCase(logInUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(logInUser.fulfilled, (state, action) => {
            state.accessToken = action.payload.token,
                state.isAuthenticated = true,
                state.roles = action.payload.roles,
                state.login = {
                    errorMsg: ''
                }
            state.address = action.payload.address
            state.bloodType = action.payload.bloodType
            state.loading = false,
                state.userId = action.payload.userId
        })
        builder.addCase(logInUser.rejected, (state, action) => {
            state.loading = false
            state.login = {
                errorMsg: action.payload,
            }
        })

        // reducers for geting current user data
        builder.addCase(getCurrentUserData.pending,(state)=>{
            state.currentUserData.loading=true
        })
        builder.addCase(getCurrentUserData.fulfilled,(state,action)=>{
            state.currentUserData.loading=false
            state.currentUserData.data=action.payload
            state.currentUserData.errorMsg=''
            state.currentUserData.successMsg='User Data Fetched Successfuly'
        })
        builder.addCase(getCurrentUserData.rejected,(state,action)=>{
            state.currentUserData.loading=false
            state.currentUserData.data=''
            state.currentUserData.errorMsg=action.payload
            state.currentUserData.successMsg=''
        })

        // reducers for profile update
        builder.addCase(updateUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false
            state.updateUser.successMsg = 'Profile Updated Successfully'
            state.updateUser.errorMsg = ''
            state.currentUserData.data=action.payload
            state.address=action.payload.address
            state.bloodType=action.payload.bloodType
        })
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false
            state.updateUser.successMsg = ''
            state.updateUser.errorMsg = action.payload
        })
    }

})

export let { resetUpdateUserFormStatus, resetFormStatus, logOut, donorRoleAdded } = userSlice.actions

let reducer = userSlice.reducer
export default reducer