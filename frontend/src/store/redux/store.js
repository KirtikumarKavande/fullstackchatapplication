import {configureStore} from "@reduxjs/toolkit"
import getFriendList  from "./slices/friendList.slice"

const store=configureStore({
    reducer:{
        friendList:getFriendList
    }
})


export default store