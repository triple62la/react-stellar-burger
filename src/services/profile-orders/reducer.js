import {createReducer} from "@reduxjs/toolkit";
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

export const profileOrdersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(PROFILE_ORDERS_WS_CONNECTING, state => {
            state.status = "CONNECTING";
        })
        .addCase(PROFILE_ORDERS_WS_OPEN, state => {
            state.status = "ONLINE";
            state.connectingError = '';
        })
        .addCase(PROFILE_ORDERS_WS_CLOSE, state => {
            state.status = "OFFLINE";
        })
        .addCase(PROFILE_ORDERS_WS_ERROR, (state, action) => {
            state.connectingError = action.payload;
        })
        .addCase(PROFILE_ORDERS_WS_MESSAGE, (state, action) => {
            state.ordersMap = action.payload.orders.reduce((acc, order) => {
                // Use order.number as the key, and spread the rest of the order properties as the value
                const {number, ...orderWithoutNumber} = order;
                acc[number] = orderWithoutNumber;
                return acc;
            }, {});
            state.orders = action.payload.orders;
            state.isInitialDataLoaded = true;
        })
        .addCase(PROFILE_ORDERS_RESET, state => {
            state.orders = []; // This will reset the orders to an empty array
            state.orders = null;
        })
})
