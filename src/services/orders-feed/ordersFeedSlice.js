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
    extraReducers:(builder)=>{
        builder.
    }
})