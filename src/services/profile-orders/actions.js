import { createAction } from '@reduxjs/toolkit';
export const PROFILE_ORDERS_WS_CONNECT = createAction('PROFILE_ORDERS_WS_CONNECT')
export const PROFILE_ORDERS_WS_DISCONNECT = createAction('PROFILE_ORDERS_WS_DISCONNECT');
export const PROFILE_ORDERS_WS_CONNECTING = createAction('PROFILE_ORDERS_WS_CONNECTING');
export const PROFILE_ORDERS_WS_OPEN = createAction('PROFILE_ORDERS_WS_OPEN');
export const PROFILE_ORDERS_WS_CLOSE = createAction('PROFILE_ORDERS_WS_CLOSE');
export const PROFILE_ORDERS_WS_MESSAGE = createAction('PROFILE_ORDERS_WS_MESSAGE');
export const PROFILE_ORDERS_WS_ERROR = createAction('PROFILE_ORDERS_WS_ERROR');
export const WS_TOKEN_REFRESH = createAction('WS_TOKEN_REFRESH');
export const PROFILE_ORDERS_RESET = createAction('PROFILE_ORDERS_RESET');