import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isVisible:false,
    orderId:''
}

export const orderModalSlice = createSlice({
    name:"orderModal",
    initialState,
    reducers:{
        setIsVisible:(state,{payload})=>{
            state.isVisible=payload
        },
        setOrderId:(state, {payload})=>state.orderId = payload
    }
})
export const {setIsVisible, setOrderId} = orderModalSlice.actions
export default orderModalSlice.reducer