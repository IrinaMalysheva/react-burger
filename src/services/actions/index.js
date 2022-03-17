import { checkResponse } from '../../utils/utils';
export const GET_DATA_INGREDIENTS_REQUEST = 'GET_DATA_INGREDIENTS_REQUEST';
export const GET_DATA_INGREDIENTS_SUCCESS = 'GET_DATA_INGREDIENTS_SUCCESS';
export const GET_DATA_INGREDIENTS_ERROR = 'GET_DATA_INGREDIENTS_ERROR';

export const SET_CONSTRUCTOR_BUN = 'SET_CONSTRUCTOR_BUN';
export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';
export const REMOVE_CONSTRUCTOR_INGREDIENT = 'REMOVE_CONSTRUCTOR_INGREDIENT';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';
export const MOVE_CONSTRUCTOR_INGREDIENT = 'MOVE_CONSTRUCTOR_INGREDIENT';

export const SET_CURRENT_INGREDIENT_DETAILS = 'SET_CURRENT_INGREDIENT_DETAILS';
export const REMOVE_CURRENT_INGREDIENT_DETAILS = 'REMOVE_CURRENT_INGREDIENT_DETAILS';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';
export const REMOVE_ORDER_OBJECT = 'REMOVE_ORDER_OBJECT';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_INGREDIENT_MODAL = 'OPEN_INGREDIENT_MODAL';
export const CLOSE_INGREDIENT_MODAL = 'CLOSE_INGREDIENT_MODAL';
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

export const SET_TAB_NAME = 'SET_TAB_NAME';
export const SET_TAB_OFFSETTOP = 'SET_TAB_OFFSETTOP';

export function getDataIngredientsList(apiUrl) {
    return function (dispatch) {
        dispatch({
            type: GET_DATA_INGREDIENTS_REQUEST
        });
        return fetch(apiUrl + "/ingredients")
            .then(checkResponse)
            .then(jsonResp => dispatch({
                type: GET_DATA_INGREDIENTS_SUCCESS,
                data: jsonResp.data
            }))
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: GET_DATA_INGREDIENTS_ERROR
                });
            })
    };
}

export function getOrder(apiUrl, constructorIngredients) {
    const json = JSON.stringify(constructorIngredients);

    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        return fetch(apiUrl + "/orders", {
            method: 'POST',
            body: json,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(checkResponse)
            .then(jsonResp => {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    data: jsonResp
                });
                dispatch({ type: CLEAR_CONSTRUCTOR });
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: GET_ORDER_ERROR
                });
            })
    };
}

export function addBun(item, uuid) {
    return {
        type: SET_CONSTRUCTOR_BUN,
        item: { ...item, uuid: uuid }
    };
}

export function addIngredient(item, uuid) {
    return {
        type: ADD_CONSTRUCTOR_INGREDIENT,
        item: { ...item, uuid: uuid }
    };
}

export function removeIngredient(uuid) {
    return {
        type: REMOVE_CONSTRUCTOR_INGREDIENT,
        uuid
    };
}

export function moveIngredient(dragIndex, hoverIndex) {
    return {
        type: MOVE_CONSTRUCTOR_INGREDIENT,
        dragIndex,
        hoverIndex
    };
}

export function closeIngredientModal() {
    return function (dispatch) {
        dispatch({ type: CLOSE_INGREDIENT_MODAL });
        dispatch({ type: REMOVE_CURRENT_INGREDIENT_DETAILS });
    }
}

export function closeOrderModal() {
    return function (dispatch) {
        dispatch({ type: CLOSE_ORDER_MODAL });
        dispatch({ type: REMOVE_ORDER_OBJECT });
    }
}