import {configureStore} from "@reduxjs/toolkit"
import getFriendList  from "./slices/friendList.slice"
import selectedEntry  from "./slices/SelectedEntry.slice"

const store=configureStore({
    reducer:{
        friendList: getFriendList,
        selectedEntry: selectedEntry,
        
    }
})


export default store