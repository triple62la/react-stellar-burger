import {createSlice} from "@reduxjs/toolkit";
import {
    PROFILE_ORDERS_WS_CONNECTING,
    PROFILE_ORDERS_WS_OPEN,
    PROFILE_ORDERS_WS_CLOSE,
    PROFILE_ORDERS_WS_ERROR,
    PROFILE_ORDERS_WS_MESSAGE,
    PROFILE_ORDERS_RESET
} from "./actions"

const initialState = {
    status: "OFFLINE",
    ordersMap: null,
    orders: [],
    connectingError: '',
    isInitialDataLoaded: false
}

export const profileOrdersSlice = createSlice({
    name:"profileOrders",
    initialState,
    reducers:{
        resetOrders:(state, action)=>state.orders=[]
    },
    extraReducers:(builder=>{
        builder.addCase(PROFILE_ORDERS_WS_CONNECTING, state => {
            state.status = "CONNECTING";
        })
        builder.addCase(PROFILE_ORDERS_WS_OPEN, state => {
            state.status = "ONLINE";
            state.connectingError = '';
        })
        builder.addCase(PROFILE_ORDERS_WS_CLOSE, state => {
            state.status = "OFFLINE";
        })
        builder.addCase(PROFILE_ORDERS_WS_ERROR, (state, action) => {
            state.connectingError = action.payload;
        })
        builder.addCase(PROFILE_ORDERS_WS_MESSAGE, (state, action) => {
            state.ordersMap = action.payload.orders.reduce((acc, order) => {
                // Use order.number as the key, and spread the rest of the order properties as the value
                const {number, ...orderWithoutNumber} = order;
                acc[number] = orderWithoutNumber;
                return acc;
            }, {});
            state.orders = action.payload.orders;
            state.isInitialDataLoaded = true;
        })
    })
})
export const { resetOrders } = profileOrdersSlice.actions
export default profileOrdersSlice.reducer