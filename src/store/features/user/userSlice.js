import { BASE_URL } from "@/lib/baseURL"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    users: [],
    status: 'idle',
    error: null,
    total: 0
}
export const fetchUsers = createAsyncThunk('users/fetchUsers',async()=>{
    const res = await fetch(`${BASE_URL}users`)
    const data = await res.json()
    return data
})
export const deleteUserById = createAsyncThunk("users/deleteUserById", async (userId) => {
    const res = await fetch(`${BASE_URL}users/${userId}`, {
        method: "DELETE",
    });
    const data = await res.json();
    return data;
})

export const createUser = createAsyncThunk("users/createUser", async (user) => {
    const res = await fetch(`${BASE_URL}users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    const data = await res.json();
    return data;
})

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}, // use createAsyncThunk no need any action
    extraReducers(builder){
        builder
        .addCase(fetchUsers.pending,(state,action)=>{
            state.status = 'loading'
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.users = action.payload.data?.list
            state.total = action.payload.data.total
        })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })

        // delete user section
        .addCase(deleteUserById.pending,(state,action)=>{
            state.status = 'loading'
        })
        .addCase(deleteUserById.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.users = state.users.filter(user=>user.id !== action.payload.data?.list?.id)
            state.total = state.total - 1
        }
        )
        .addCase(deleteUserById.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        }
        )



      
    }
})

export const { } = userSlice.actions
//export reducer
export default userSlice.reducer

// export selector
export const selectAllUsers = state => state.users.users
export const selectUserById = (state, userId) => state.users?.users?.find(user => user.id === userId)
export const selectUserStatus = state => state.users.status
export const selectUserError = state => state.users.error
export const selectTotalUsers = state=> state.users.total

// delete user 
export const selectDeleteUserStatus = state => state.users.status
