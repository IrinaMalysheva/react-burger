import type { Middleware, MiddlewareAPI } from "redux";
import type { TApplicationActions, AppDispatch, RootState } from "../types";
import {
    TWSUserOrderActions,
    TWSOrderActions
} from "../actions/wsOrdersFeed";
import {
    WS_ORDER_CONNECTION_START,
    WS_USER_ORDER_CONNECTION_START,
} from "../constants/wsOrdersFeed";
import { getCookie } from "../../utils/utils";

export const socketMiddleware = (
    wsUrl: string,
    wsActions: TWSOrderActions | TWSUserOrderActions
): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return (next) => (action: TApplicationActions) => {
            const { dispatch, getState } = store;
            const { type } = action;
            const { wsInit, onOpen, onClose, onError, onOrders } = wsActions;

            if (type === wsInit && type === WS_ORDER_CONNECTION_START) {
                socket = new WebSocket(`${wsUrl}/all`);
            }

            if (type === wsInit && type === WS_USER_ORDER_CONNECTION_START) {
                socket = new WebSocket(`${wsUrl}?token=${getCookie('accessToken')}`);
            }

            if (socket) {
                socket.onopen = (event) => {
                    dispatch({ type: onOpen, orders: event });
                };

                socket.onerror = (event) => {
                    dispatch({ type: onError, orders: event });
                };

                socket.onclose = (event) => {
                    dispatch({ type: onClose, orders: event });
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({ type: onOrders, orders: parsedData });
                };
            }

            next(action);
        };
    }) as Middleware;
};