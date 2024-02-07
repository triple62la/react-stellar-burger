import { createAction } from '@reduxjs/toolkit';

export const ORDERS_FEED_WS_CONNECT = createAction('ORDERS_FEED_WS_CONNECT')
export const ORDERS_FEED_WS_DISCONNECT = createAction('ORDERS_FEED_WS_DISCONNECT');
export const ORDERS_FEED_WS_CONNECTING = createAction('ORDERS_FEED_WS_CONNECTING');
export const ORDERS_FEED_WS_OPEN = createAction('ORDERS_FEED_WS_OPEN');
export const ORDERS_FEED_WS_CLOSE = createAction('ORDERS_FEED_WS_CLOSE');
export const ORDERS_FEED_WS_MESSAGE = createAction('ORDERS_FEED_WS_MESSAGE');
export const ORDERS_FEED_WS_ERROR = createAction('ORDERS_FEED_WS_ERROR');