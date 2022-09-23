import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    loading:false,
    error:false,
    msg:'',
}


let statusSlice = createSlice({
    name:'status',
    initialState,
    reducers:{
        loading:(state)=>{
            state.loading=true
        },
        error:(state,action)=>{
            state.error=true,
            state.msg=action.payload
        },

    }
})

export let {error,loading} = statusSlice.actions
let reducer = statusSlice.reducer
export default reducer