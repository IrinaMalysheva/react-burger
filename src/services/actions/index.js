export const GET_DATA_INGREDIENTS_REQUEST = 'GET_DATA_INGREDIENTS_REQUEST';
export const GET_DATA_INGREDIENTS_SUCCESS = 'GET_DATA_INGREDIENTS_SUCCESS';
export const GET_DATA_INGREDIENTS_ERROR = 'GET_DATA_INGREDIENTS_ERROR';

export const GET_CURRENT_INGREDIENT_DETAILS = 'GET_CURRENT_INGREDIENT_DETAILS';
export const REMOVE_CURRENT_INGREDIENT_DETAILS = 'REMOVE_CURRENT_INGREDIENT_DETAILS';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_MODAL = 'OPEN_MODAL';
export const OPEN_INGREDIENT_MODAL = 'OPEN_INGREDIENT_MODAL';
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';

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

export function getOrder(apiUrl, constructorIngredientsList) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        const json = JSON.stringify(constructorIngredientsList);

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