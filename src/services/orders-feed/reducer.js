import {createReducer} from '@reduxjs/toolkit';
import {
    ORDERS_FEED_WS_CLOSE,
    ORDERS_FEED_WS_CONNECTING,
    ORDERS_FEED_WS_ERROR,
    ORDERS_FEED_WS_MESSAGE,
    ORDERS_FEED_WS_OPEN
} from "./actions";

const initialState = {
    status: "OFFLINE",
    orders: [],
    ordersMap: null,
    total: 0,
    totalToday: 0,
    connectingError: '',
    isInitialDataLoaded: false
}



const ordersFeedReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(ORDERS_FEED_WS_CONNECTING, state => {
            state.status = "CONNECTING";
        })
        .addCase(ORDERS_FEED_WS_OPEN, state => {
            state.status = "ONLINE";
            state.connectingError = '';
        })
        .addCase(ORDERS_FEED_WS_CLOSE, state => {
            state.status ="OFFLINE";
        })
        .addCase(ORDERS_FEED_WS_ERROR, (state, action) => {
            state.connectingError = action.payload;
        })
        .addCase(ORDERS_FEED_WS_MESSAGE, (state, action) => {
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
})

export default ordersFeedReducer;
