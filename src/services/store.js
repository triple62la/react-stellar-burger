
import {rootReducer} from "./rootReducer";
import {configureStore} from "@reduxjs/toolkit";
import {wsMiddleware} from "./middleware/ws-middleware";
import {ORDERS_FEED_WS_CONNECT,
    ORDERS_FEED_WS_DISCONNECT,
    ORDERS_FEED_WS_CONNECTING,
    ORDERS_FEED_WS_ERROR,
    ORDERS_FEED_WS_OPEN,
    ORDERS_FEED_WS_CLOSE,
    ORDERS_FEED_WS_MESSAGE} from "./orders-feed/actions";
import {
    PROFILE_ORDERS_WS_CONNECT,
    PROFILE_ORDERS_WS_DISCONNECT,
    PROFILE_ORDERS_WS_CONNECTING,
    PROFILE_ORDERS_WS_ERROR,
    PROFILE_ORDERS_RESET,
    PROFILE_ORDERS_WS_CLOSE,
    PROFILE_ORDERS_WS_MESSAGE,
    PROFILE_ORDERS_WS_OPEN,
    WS_TOKEN_REFRESH
} from "./profile-orders/actions"

const profileOrdersMiddleware = wsMiddleware({
    wsConnect: PROFILE_ORDERS_WS_CONNECT,
    wsDisconnect: PROFILE_ORDERS_WS_DISCONNECT,
    wsConnecting: PROFILE_ORDERS_WS_CONNECTING,
    onOpen: PROFILE_ORDERS_WS_OPEN,
    onClose: PROFILE_ORDERS_WS_CLOSE,
    onError: PROFILE_ORDERS_WS_ERROR,
    onMessage: PROFILE_ORDERS_WS_MESSAGE,
    wsTokenRefresh: WS_TOKEN_REFRESH
})
const ordersFeedMiddleware = wsMiddleware({
    wsConnect: ORDERS_FEED_WS_CONNECT,
    wsDisconnect: ORDERS_FEED_WS_DISCONNECT,
    wsConnecting: ORDERS_FEED_WS_CONNECTING,
    onOpen: ORDERS_FEED_WS_OPEN,
    onClose: ORDERS_FEED_WS_CLOSE,
    onError: ORDERS_FEED_WS_ERROR,
    onMessage: ORDERS_FEED_WS_MESSAGE,
})


export default function configureAppStore(preloadedState) {

    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware)=>{
            return getDefaultMiddleware({serializableCheck:false}).concat(ordersFeedMiddleware, profileOrdersMiddleware)
        },
        preloadedState,
    } )
}



