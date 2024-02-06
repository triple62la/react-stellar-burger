import {refreshToken} from "../../utils/api";

const WS_URL = "wss://norma.nomoreparties.space"

export const wsMiddleware = (wsActions) => {
    return (store) => { // this function is the actual middleware that will be applied to the Redux store
        let socket = null; // the reference to the WebSocket connection
        let isDisconnect = false; // the socket is closed intentionally
        let reconnectDelay = 1000;
        let initialWsUrl = '';

        return (next) => async (action) => { // 'next' is a Redux middleware API function used to pass the action to the next middleware in line
            const {dispatch} = store;
            const {type, payload} = action; // determine the kind of action being handled
            const {
                wsConnect,
                wsSendMessage,
                onOpen,
                onClose,
                onError,
                onMessage,
                wsConnecting,
                wsDisconnect,
                wsTokenRefresh
            } = wsActions;
// If the dispatched action type matches the wsConnect action, a new WebSocket connection
// is established with the URL provided in the action payload.
            if (type === wsConnect.type) {
                initialWsUrl = payload;
                // Close the existing socket if it exists before creating a new one
                if (socket) {
                    socket.close();
                }
                socket = new WebSocket(action.payload);
                dispatch(wsConnecting());
            }
// Defines a handler for the open event on the WebSocket, which dispatches the onOpen action
// when the WebSocket connection is successfully opened.
            if (socket) {
                socket.onopen = () => dispatch(onOpen());

                socket.onerror = (event) => dispatch(onError('WebSocket error'));

                socket.onmessage = (event) => {
                    const parsedData = JSON.parse(event.data);
                    if (parsedData.message === 'Invalid or missing token') {
                        dispatch(wsTokenRefresh());
                    } else if (parsedData.success) {
                        dispatch(onMessage(parsedData));
                    } else {
                        dispatch(onError(parsedData.message || 'Unknown error'));
                    }
                };

                if (wsTokenRefresh && type === wsTokenRefresh.type) {
                    console.log("WS: Token is not valid")
                    console.log('refreshing token...')
                    try {
                        const response = await refreshToken();
                        if (response.success) {
                            console.log('setting tokens...')
                            // Reconnect with the new token
                            const newWsUrl = `${WS_URL}/orders?token=${response.accessToken.replace('Bearer ', '')}`;
                            socket.close(); // Close the old socket before opening a new one
                            console.log('opening new connection...')
                            socket = new WebSocket(newWsUrl);
                            dispatch(wsConnecting());
                        }
                    } catch (error) {
                        console.error('Failed to refresh token:', error);
                        dispatch(onError('Token refresh failed'));
                    }
                }

                socket.onclose = (event) => {
                    // if the socket is not closed intentionally
                    if (!isDisconnect) {
                        // attempt to reconnect with an exponential fixed timeout delay
                        setTimeout(() => {
                            console.log('Attempting to reconnect to WebSocket...');
                            socket = new WebSocket(initialWsUrl);
                            dispatch(wsConnecting());
                            reconnectDelay = Math.min(reconnectDelay * 2, 30000);
                        }, reconnectDelay);
                    } else {
                        dispatch(onClose());
                        reconnectDelay = 1000;
                    }
                };

                if (wsSendMessage && type === wsSendMessage.type) {
                    socket.send(JSON.stringify(action.payload));
                }

                if (wsDisconnect.type === type) {
                    socket.close();
                    socket = null;
                    isDisconnect = true;
                }
            }

            next(action);
        }
            ;
    };
};
