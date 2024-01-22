// import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// import {registerUser as registerUserRequest} from "../../utils/api";
//
//
//
//
//
//
// export const register = createAsyncThunk(
//     "currentUser/register",
//     async (userData, thunkAPI)=>{
//
//         return registerUserRequest(userData);
//
//     }
//     )
//
//
//
// export const currentUserSlice = createSlice({
//     name: "currentUser",
//     initialState,
//     reducers:{
//         setAuth:(state, {payload})=>{
//
//         }
//     },
//     extraReducers: (builder)=>{
//         builder.addCase(register.fulfilled, (state, action)=>{
//             if (action.payload.success){
//
//             }
//         })
//     }
// })
//
// export default currentUserSlice.reducer