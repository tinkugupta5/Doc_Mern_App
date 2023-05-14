import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:'user',
    initialState:{
        user:null
    },
    reducers:{
        getUser:(state,action) => {
            state.user = action.payload
        }
    }
})

export const {} = userSlice.actions