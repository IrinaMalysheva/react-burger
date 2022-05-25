import reducer from './wsOrdersFeed';
import initialState from './wsOrdersFeed';
import * as types from '../constants/wsOrdersFeed';

describe('wsOrdersFeedReducer reducer', () => {
    const orders = {
        "success": true,
        "orders": [
            {
                "_id": "6279059cfa747e001bd47373",
                "ingredients": [
                    "60d3b41abdacab0026a733c8",
                    "60d3b41abdacab0026a733d0",
                    "60d3b41abdacab0026a733c6"
                ],
                "status": "done",
                "name": "Люминесцентный краторный минеральный бургер",
                "createdAt": "2022-05-09T12:14:20.994Z",
                "updatedAt": "2022-05-09T12:14:21.337Z",
                "number": 15242
            },
            {
                "_id": "627905e4fa747e001bd47374",
                "ingredients": [
                    "60d3b41abdacab0026a733cd",
                    "60d3b41abdacab0026a733ca",
                    "60d3b41abdacab0026a733c6"
                ],
                "status": "done",
                "name": "Метеоритный space краторный бургер",
                "createdAt": "2022-05-09T12:15:32.143Z",
                "updatedAt": "2022-05-09T12:15:32.412Z",
                "number": 15243
            },
            {
                "_id": "62790952fa747e001bd4737a",
                "ingredients": [
                    "60d3b41abdacab0026a733cd",
                    "60d3b41abdacab0026a733c6"
                ],
                "status": "done",
                "name": "Space краторный бургер",
                "createdAt": "2022-05-09T12:30:10.401Z",
                "updatedAt": "2022-05-09T12:30:10.712Z",
                "number": 15244
            },
            {
                "_id": "62790bcffa747e001bd4737f",
                "ingredients": [
                    "60d3b41abdacab0026a733cc",
                    "60d3b41abdacab0026a733c6"
                ],
                "status": "done",
                "name": "Spicy краторный бургер",
                "createdAt": "2022-05-09T12:40:47.746Z",
                "updatedAt": "2022-05-09T12:40:48.023Z",
                "number": 15245
            },
            {
                "_id": "62790c37fa747e001bd47380",
                "ingredients": [
                    "60d3b41abdacab0026a733ce",
                    "60d3b41abdacab0026a733c6"
                ],
                "status": "done",
                "name": "Традиционный-галактический краторный бургер",
                "createdAt": "2022-05-09T12:42:31.738Z",
                "updatedAt": "2022-05-09T12:42:32.040Z",
                "number": 15246
            },
            {
                "_id": "628acb22fa747e001bd49b20",
                "ingredients": [
                    "60d3b41abdacab0026a733cc",
                    "60d3b41abdacab0026a733c6"
                ],
                "status": "done",
                "name": "Spicy краторный бургер",
                "createdAt": "2022-05-22T23:45:38.985Z",
                "updatedAt": "2022-05-22T23:45:39.261Z",
                "number": 15684
            }
        ],
        "total": 15614,
        "totalToday": 9
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                wsFeedStarted: false,
                wsUserStarted: false,
                wsFeedConnected: false,
                wsUserConnected: false,
                feedOrders: [],
                userOrders: [],
                total: 0,
                totalToday: 0
            }
        )
    });

    it("should handle WS_ORDER_CONNECTION_START", () => {
        expect(
            reducer(initialState, {
                type: types.WS_ORDER_CONNECTION_START,
            })
        ).toEqual({
            ...initialState,
            wsFeedStarted: true,
        });
    });

    it("should handle WS_ORDER_CONNECTION_SUCCESS", () => {
        expect(
            reducer(initialState, {
                type: types.WS_ORDER_CONNECTION_SUCCESS,
            })
        ).toEqual({
            ...initialState,
            wsFeedConnected: true,
        });
    });

    it("should handle WS_ORDER_CONNECTION_ERROR", () => {
        expect(
            reducer(initialState, {
                type: types.WS_ORDER_CONNECTION_ERROR,
            })
        ).toEqual({
            ...initialState,
            wsFeedConnected: false,
        });
    });

    it("should handle WS_ORDER_CONNECTION_CLOSED", () => {
        expect(
            reducer(initialState, {
                type: types.WS_ORDER_CONNECTION_CLOSED,
            })
        ).toEqual({
            ...initialState,
            wsFeedStarted: false,
            wsFeedConnected: false,
        });
    });

    it("should handle WS_ORDER_GET_MESSAGE", () => {
        expect(
            reducer(initialState, {
                type: types.WS_ORDER_GET_MESSAGE,
                orders
            })
        ).toEqual({
            ...initialState,
            feedOrders: orders.orders,
            total: orders.total,
            totalToday: orders.totalToday
        });
    });

    it("should handle WS_USER_ORDER_CONNECTION_START", () => {
        expect(
            reducer(initialState, {
                type: types.WS_USER_ORDER_CONNECTION_START,
            })
        ).toEqual({
            ...initialState,
            wsUserStarted: true,
        });
    });

    it("should handle WS_USER_ORDER_CONNECTION_SUCCESS", () => {
        expect(
            reducer(initialState, {
                type: types.WS_USER_ORDER_CONNECTION_SUCCESS,
            })
        ).toEqual({
            ...initialState,
            wsUserConnected: true,
        });
    });

    it("should handle WS_USER_ORDER_CONNECTION_ERROR", () => {
        expect(
            reducer(initialState, {
                type: types.WS_USER_ORDER_CONNECTION_ERROR,
            })
        ).toEqual({
            ...initialState,
            wsUserConnected: false,
        });
    });

    it("should handle WS_USER_ORDER_CONNECTION_CLOSED", () => {
        expect(
            reducer(initialState, {
                type: types.WS_USER_ORDER_CONNECTION_CLOSED,
            })
        ).toEqual({
            ...initialState,
            wsUserStarted: false,
            wsUserConnected: false,
        });
    });

    it("should handle WS_USER_ORDER_GET_MESSAGE", () => {
        expect(
            reducer(initialState, {
                type: types.WS_USER_ORDER_GET_MESSAGE,
                orders
            })
        ).toEqual({
            ...initialState,
            userOrders: orders.orders
        });
    });

});