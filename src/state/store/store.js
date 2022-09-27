import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import userReducer from '../slices/userSlice'
import statusReducer from '../slices/statusSlice'
import requestReducer from '../slices/requestSlice'

export let store = configureStore({
    reducer:{
        user:userReducer,
        status:statusReducer,
        request:requestReducer
    }
})

let makeStore = ()=>store


export let wrapper = createWrapper(makeStore)

