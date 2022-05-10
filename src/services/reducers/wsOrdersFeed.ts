import {
    WS_ORDER_CONNECTION_START,
    WS_ORDER_CONNECTION_SUCCESS,
    WS_ORDER_CONNECTION_ERROR,
    WS_ORDER_CONNECTION_CLOSED,
    WS_ORDER_GET_MESSAGE,

    WS_USER_ORDER_CONNECTION_START,
    WS_USER_ORDER_CONNECTION_SUCCESS,
    WS_USER_ORDER_CONNECTION_ERROR,
    WS_USER_ORDER_CONNECTION_CLOSED,
    WS_USER_ORDER_GET_MESSAGE,
} from '../constants/wsOrdersFeed';
import { TWSOrdersFeedActions } from '../actions/wsOrdersFeed';
import { TOrder } from '../../utils/types';

type TOrdersFeedState = {
    wsFeedStarted: boolean;
    wsUserStarted: boolean;
    wsFeedConnected: boolean;
    wsUserConnected: boolean;
    feedOrders: Array<TOrder>;
    userOrders: Array<TOrder>;
    total: number;
    totalToday: number;
};

const initialState: TOrdersFeedState = {
    wsFeedStarted: false,
    wsUserStarted: false,
    wsFeedConnected: false,
    wsUserConnected: false,
    feedOrders: [],
    userOrders: [],
    total: 0,
    totalToday: 0
};

export const wsOrdersFeedReducer = (state = initialState, action: TWSOrdersFeedActions): TOrdersFeedState => {
    switch (action.type) {
        case WS_ORDER_CONNECTION_START: {
            return {
                ...state,
                wsFeedStarted: true,
            };
        }
        case WS_ORDER_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsFeedConnected: true,
            };
        }
        case WS_ORDER_CONNECTION_ERROR: {
            return {
                ...state,
                wsFeedConnected: false,
            };
        }
        case WS_ORDER_CONNECTION_CLOSED: {
            return {
                ...state,
                wsFeedStarted: false,
                wsFeedConnected: false,
            };
        }
        case WS_ORDER_GET_MESSAGE: {
            return {
                ...state,
                feedOrders: action.orders.orders,
                total: action.orders.total,
                totalToday: action.orders.totalToday
            };
        }
        case WS_USER_ORDER_CONNECTION_START: {
            return {
                ...state,
                wsUserStarted: true,
            };
        }
        case WS_USER_ORDER_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsUserConnected: true,
            };
        }
        case WS_USER_ORDER_CONNECTION_ERROR: {
            return {
                ...state,
                wsUserConnected: false,
            };
        }
        case WS_USER_ORDER_CONNECTION_CLOSED: {
            return {
                ...state,
                wsUserStarted: false,
                wsUserConnected: false,
            };
        }
        case WS_USER_ORDER_GET_MESSAGE: {
            return {
                ...state,
                userOrders: action.orders.orders
            };
        }
        default: {
            return state;
        }
    }
};