import {configureStore} from "@reduxjs/toolkit"
import getFriendList  from "./slices/friendList.slice"
import selectedEntry  from "./slices/SelectedEntry.slice"
import socketObj  from "./slices/socketConnection.slice"

const store=configureStore({
    reducer:{
        friendList: getFriendList,
        selectedEntry: selectedEntry,
        socketObj:socketObj
        
    }
})


export default store