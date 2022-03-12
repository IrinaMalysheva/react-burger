export const GET_DATA_INGREDIENTS_REQUEST = 'GET_DATA_INGREDIENTS_REQUEST';
export const GET_DATA_INGREDIENTS_SUCCESS = 'GET_DATA_INGREDIENTS_SUCCESS';
export const GET_DATA_INGREDIENTS_ERROR = 'GET_DATA_INGREDIENTS_ERROR';

export const GET_CURRENT_INGREDIENT_DETAILS = 'GET_CURRENT_INGREDIENT_DETAILS';

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