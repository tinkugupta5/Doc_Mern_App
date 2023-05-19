import {configureStore} from '@reduxjs/toolkit'
import { alertSlice } from './features/alertSlice'
import { userSlice } from './features/userSlice'

export default configureStore({

    reducer:{
        alerts : alertSlice.reducer,
        // create_new reducer_for_user
        user : userSlice.reducer,
    }

})