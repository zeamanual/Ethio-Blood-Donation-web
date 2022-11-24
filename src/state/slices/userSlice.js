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
    currentUserData: {
        loading: false,
        data: '',
        errorMsg: '',
        successMsg: ''

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
            // console.log('log in rejected error message in axios',error)
            // console.log('hay dude')
            // console.log('log in rejected error message in axios',error.message,errorMsg)
            
            let errorMsg = error.response.data?.message
            return thunkApi.rejectWithValue(errorMsg?errorMsg:error.message)
        }
    }
)

export let getCurrentUserData = createAsyncThunk(
    'user/getCurrentUserData',
    async (userId = '', thunkApi) => {
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
            let errorMsg = error.response.data?.message
            return thunkApi.rejectWithValue(errorMsg?errorMsg:error.message)
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
            let errorMsg = error.response.data?.message
            return thunkApi.rejectWithValue(errorMsg?errorMsg:error.message)
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
            let errorMsg = error.response.data?.message
            return thunkApi.rejectWithValue(errorMsg?errorMsg:error.message)
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
        updateUserAuthStatus: (state) => {
            if (localStorage.getItem('authData') && !state.isAuthenticated) {
                let storedAuthData = JSON.parse(localStorage.getItem('authData'))

                state.isAuthenticated = true
                state.accessToken = storedAuthData.token
                state.address = storedAuthData.address
                state.bloodType = storedAuthData.bloodType
                state.userId = storedAuthData.userId
                state.roles = storedAuthData.roles
            }
        },
        logOut: (state) => {
            state.isAuthenticated = false
            state.accessToken = ''
            state.roles = []
            state.userId = ''
            localStorage.removeItem('authData')
        },
        donorRoleAdded: (state) => {
            if (!state.roles.includes("DONOR")) {
                state.roles.push("DONOR")
            }
            let storedAuthData = JSON.parse(localStorage.getItem('authData'))
            storedAuthData.roles = state.roles
            localStorage.setItem('authData',JSON.stringify(storedAuthData))
        },
        resetUpdateUserFormStatus: (state) => {
            state.updateUser.errorMsg = ''
            state.updateUser.successMsg = ''
        },
        resetCurrentUserDataStatus:(state)=>{
            state.currentUserData={
                loading: false,
                data: '',
                errorMsg: '',
                successMsg: ''
            }
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
                sucessMsg: "Account Created Successfly"
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
            state.accessToken = action.payload.token
            state.isAuthenticated = true
            state.roles = action.payload.roles
            state.login = {
                errorMsg: ''
            }
            state.address = action.payload.address
            state.bloodType = action.payload.bloodType
            state.loading = false
            state.userId = action.payload.userId
            localStorage.setItem('authData', JSON.stringify(action.payload))
        })
        builder.addCase(logInUser.rejected, (state, action) => {
            // console.log('log in rejected error message',action)
            state.loading = false
            state.login = {
                errorMsg: action.payload,
            }
        })

        // reducers for geting current user data
        builder.addCase(getCurrentUserData.pending, (state) => {
            state.currentUserData.loading = true
        })
        builder.addCase(getCurrentUserData.fulfilled, (state, action) => {
            state.currentUserData.loading = false
            state.currentUserData.data = action.payload
            state.currentUserData.errorMsg = ''
            state.currentUserData.successMsg = 'User Data Fetched Successfuly'
        })
        builder.addCase(getCurrentUserData.rejected, (state, action) => {
            state.currentUserData.loading = false
            state.currentUserData.data = ''
            state.currentUserData.errorMsg = action.payload
            state.currentUserData.successMsg = ''
        })

        // reducers for profile update
        builder.addCase(updateUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false
            state.updateUser.successMsg = 'Profile Updated Successfully'
            state.updateUser.errorMsg = ''
            state.currentUserData.data = action.payload
            state.address = action.payload.address
            state.bloodType = action.payload.bloodType
        })
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false
            state.updateUser.successMsg = ''
            state.updateUser.errorMsg = action.payload
        })
    }

})

export let { resetCurrentUserDataStatus,updateUserAuthStatus,resetUpdateUserFormStatus, resetFormStatus, logOut, donorRoleAdded } = userSlice.actions

let reducer = userSlice.reducer
export default reducer