import {createSlice} from "@reduxjs/toolkit";


const initialState = {

    isVisible:false,
    title:"",
    message:"",
}

export const notificationModalSlice = createSlice({
    name:"notificationModal",
    initialState,
    reducers:{
        setVisible:(state, {payload})=>{
            state.isVisible = payload
        },
        setTitle:(state, {payload})=>{
            state.title = payload
        },
        setMessage:(state, {payload})=>{
            state.message = payload
        },
    }
})
export const {setVisible, setTitle, setMessage } = notificationModalSlice.actions
export default notificationModalSlice.reducer