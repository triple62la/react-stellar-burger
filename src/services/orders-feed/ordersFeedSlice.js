import {
    ORDERS_FEED_WS_CLOSE,
    ORDERS_FEED_WS_CONNECTING,
    ORDERS_FEED_WS_ERROR,
    ORDERS_FEED_WS_MESSAGE,
    ORDERS_FEED_WS_OPEN
} from "./actions";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    status: "OFFLINE",
    orders: [],
    ordersMap: null,
    total: 0,
    totalToday: 0,
    connectingError: '',
    isInitialDataLoaded: false
}
export const ordersFeedSlice = createSlice({
    name: "ordersFeed",
    initialState,
    extraReducers:(builder)=> {
        builder.addCase(ORDERS_FEED_WS_OPEN, (state, action) => {
            state.status = "ONLINE";
            state.connectingError = '';
        })
        builder.addCase(ORDERS_FEED_WS_CLOSE, (state, action) => {
            state.status = "OFFLINE";
        })
        builder.addCase(ORDERS_FEED_WS_ERROR, (state, action) => {
            state.connectingError = action.payload;
        })
        builder.addCase(ORDERS_FEED_WS_CONNECTING,(state, action)=> {
            state.status = "CONNECTING";
        })
        builder.addCase(ORDERS_FEED_WS_MESSAGE, (state, action)=>{
            state.ordersMap = action.payload.orders.reduce((acc, order) => {
                // Use order.number as the key, and spread the rest of the order properties as the value
                const {number, ...orderWithoutNumber} = order;
                acc[number] = orderWithoutNumber;
                return acc;
            }, {});
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
            state.isInitialDataLoaded = true;
        })
    }
})
export default ordersFeedSlice.reducer