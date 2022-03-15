export const GET_DATA_INGREDIENTS_REQUEST = 'GET_DATA_INGREDIENTS_REQUEST';
export const GET_DATA_INGREDIENTS_SUCCESS = 'GET_DATA_INGREDIENTS_SUCCESS';
export const GET_DATA_INGREDIENTS_ERROR = 'GET_DATA_INGREDIENTS_ERROR';

export const SET_CONSTRUCTOR_BUN = 'SET_CONSTRUCTOR_BUN';
export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';
export const REMOVE_CONSTRUCTOR_INGREDIENT = 'REMOVE_CONSTRUCTOR_INGREDIENT';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const SET_CURRENT_INGREDIENT_DETAILS = 'SET_CURRENT_INGREDIENT_DETAILS';
export const REMOVE_CURRENT_INGREDIENT_DETAILS = 'REMOVE_CURRENT_INGREDIENT_DETAILS';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_MODAL = 'OPEN_MODAL';
export const OPEN_INGREDIENT_MODAL = 'OPEN_INGREDIENT_MODAL';
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';

export const SET_TAB_NAME = 'SET_TAB_NAME';
export const SET_TAB_OFFSETTOP = 'SET_TAB_OFFSETTOP';

export function getDataIngredientsList(apiUrl) {
    return function (dispatch) {
        dispatch({
            type: GET_DATA_INGREDIENTS_REQUEST
        });
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl + "/ingredients");
                if (!response.ok) {
                    dispatch({
                        type: GET_DATA_INGREDIENTS_ERROR
                    });
                    throw new Error("fetch() was not succeed.");
                }
                const resJson = await response.json();
                dispatch({
                    type: GET_DATA_INGREDIENTS_SUCCESS,
                    data: resJson.data
                });
            }
            catch (e) {
                console.log(e);
                dispatch({
                    type: GET_DATA_INGREDIENTS_ERROR
                });
            }
        };
        fetchData();
    };
}

export function getOrder(apiUrl, constructorIngredients) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        const json = JSON.stringify(constructorIngredients);        

        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl + "/orders", {
                    method: 'POST',
                    body: json,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                });
                if (!response.ok) {
                    dispatch({
                        type: GET_ORDER_ERROR
                    });
                    throw new Error("POST fetch() was not succeed.");
                  }
                const jsonResp = await response.json();
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    data: jsonResp
                });
                dispatch({ type: CLEAR_CONSTRUCTOR });
            } catch (error) {
                console.error(error);
                dispatch({
                    type: GET_ORDER_ERROR
                });
            }
        }
        fetchData();
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