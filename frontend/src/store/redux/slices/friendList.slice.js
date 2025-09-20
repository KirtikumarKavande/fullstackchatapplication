const { createSlice } = require("@reduxjs/toolkit");

const friendListSlice=  createSlice({
    name:'friendList',
    initialState:{friends:[]},
    reducers:{
        getFriendList(state,action){
            state.friends=[...state.friends,...action.payload]
        }
    }

})

export const {getFriendList}= friendListSlice.actions
export default friendListSlice.reducer

