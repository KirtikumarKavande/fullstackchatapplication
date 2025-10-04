import { createSlice } from "@reduxjs/toolkit";

const selectedEntrySlice=createSlice({
    name: "selectedEntry",
    initialState: {
        selectedChatId: ""
    },
    reducers: {

        setChatId(state, action) {
            state.selectedChatId = action.payload
        }

    }
})
export const {setChatId}=selectedEntrySlice.actions
export default selectedEntrySlice.reducer