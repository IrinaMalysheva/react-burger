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
import { TWSOrdersFeed } from '../../utils/types';

export interface IWSOrderConnectionStartAction {
    readonly type: typeof WS_ORDER_CONNECTION_START;
}

export interface IWSOrderConnectionSuccessAction {
    readonly type: typeof WS_ORDER_CONNECTION_SUCCESS;
}

export interface IWSOrderConnectionErrorAction {
    readonly type: typeof WS_ORDER_CONNECTION_ERROR;
}

export interface IWSOrderConnectionClosedAction {
    readonly type: typeof WS_ORDER_CONNECTION_CLOSED;
}

export interface IWsOrderGetAction {
    readonly type: typeof WS_ORDER_GET_MESSAGE;
    readonly orders: TWSOrdersFeed;
}

export interface IWSUserOrderConnectionStartAction {
    readonly type: typeof WS_USER_ORDER_CONNECTION_START;
}

export interface IWSUserOrderConnectionSuccessAction {
    readonly type: typeof WS_USER_ORDER_CONNECTION_SUCCESS;
}

export interface IWSUserOrderConnectionErrorAction {
    readonly type: typeof WS_USER_ORDER_CONNECTION_ERROR;
}

export interface IWSUserOrderConnectionClosedAction {
    readonly type: typeof WS_USER_ORDER_CONNECTION_CLOSED;
}

export interface IWsUserOrderGetAction {
    readonly type: typeof WS_USER_ORDER_GET_MESSAGE;
    readonly orders: TWSOrdersFeed;
}

export type TWSOrdersFeedActions =
    | IWSOrderConnectionStartAction
    | IWSOrderConnectionSuccessAction
    | IWSOrderConnectionErrorAction
    | IWSOrderConnectionClosedAction
    | IWsOrderGetAction
    | IWSUserOrderConnectionStartAction
    | IWSUserOrderConnectionSuccessAction
    | IWSUserOrderConnectionErrorAction
    | IWSUserOrderConnectionClosedAction
    | IWsUserOrderGetAction;

export const wsOrderConnectionStartAction = (): IWSOrderConnectionStartAction => ({ type: WS_ORDER_CONNECTION_START });

export const wsOrderConnectionSuccessAction = (): IWSOrderConnectionSuccessAction => ({ type: WS_ORDER_CONNECTION_SUCCESS });

export const wsOrderConnectionErrorAction = (): IWSOrderConnectionErrorAction => ({ type: WS_ORDER_CONNECTION_ERROR });

export const wsOrderConnectionClosedAction = (): IWSOrderConnectionClosedAction => ({ type: WS_ORDER_CONNECTION_CLOSED });

export const wsOrderGetAction = (orders: TWSOrdersFeed): IWsOrderGetAction => ({
    type: WS_ORDER_GET_MESSAGE,
    orders
});

export const wsUserOrderConnectionStartAction = (): IWSUserOrderConnectionStartAction => ({ type: WS_USER_ORDER_CONNECTION_START });

export const wsUserOrderConnectionSuccessAction = (): IWSUserOrderConnectionSuccessAction => ({ type: WS_USER_ORDER_CONNECTION_SUCCESS });

export const wsUserOrderConnectionErrorAction = (): IWSUserOrderConnectionErrorAction => ({ type: WS_USER_ORDER_CONNECTION_ERROR });

export const wsUserOrderConnectionClosedAction = (): IWSUserOrderConnectionClosedAction => ({ type: WS_USER_ORDER_CONNECTION_CLOSED });

export const wsUserOrderGetAction = (orders: TWSOrdersFeed): IWsUserOrderGetAction => ({
    type: WS_USER_ORDER_GET_MESSAGE,
    orders
});

export type TWSOrderActions = {
    wsInit: typeof WS_ORDER_CONNECTION_START;
    onOpen: typeof WS_ORDER_CONNECTION_SUCCESS;
    onError: typeof WS_ORDER_CONNECTION_ERROR;
    onClose: typeof WS_ORDER_CONNECTION_CLOSED;
    onOrders: typeof WS_ORDER_GET_MESSAGE;
};

export const wsOrderActions: TWSOrderActions = {
    wsInit: WS_ORDER_CONNECTION_START,
    onOpen: WS_ORDER_CONNECTION_SUCCESS,
    onError: WS_ORDER_CONNECTION_ERROR,
    onClose: WS_ORDER_CONNECTION_CLOSED,
    onOrders: WS_ORDER_GET_MESSAGE,
};

export type TWSUserOrderActions = {
    wsInit: typeof WS_USER_ORDER_CONNECTION_START;
    onOpen: typeof WS_USER_ORDER_CONNECTION_SUCCESS;
    onError: typeof WS_USER_ORDER_CONNECTION_ERROR;
    onClose: typeof WS_USER_ORDER_CONNECTION_CLOSED;
    onOrders: typeof WS_USER_ORDER_GET_MESSAGE;
};

export const wsUserOrderActions: TWSUserOrderActions = {
    wsInit: WS_USER_ORDER_CONNECTION_START,
    onOpen: WS_USER_ORDER_CONNECTION_SUCCESS,
    onError: WS_USER_ORDER_CONNECTION_ERROR,
    onClose: WS_USER_ORDER_CONNECTION_CLOSED,
    onOrders: WS_USER_ORDER_GET_MESSAGE,
}; 