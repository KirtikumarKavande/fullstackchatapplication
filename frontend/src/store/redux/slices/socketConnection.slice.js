import { createSlice } from "@reduxjs/toolkit";

const socketSlice=createSlice({
    name:"socket",
    initialState:{
        socket:""
    },
    reducers:{
        setSocketObj(state,action){
             state.socket=action.payload
        }
    }
})


export default socketSlice.reducer
export const {setSocketObj}=socketSlice.actions