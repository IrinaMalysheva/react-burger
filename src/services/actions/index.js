export const SET_CURRENT_INGREDIENT_DETAILS_OBJECT = 'SET_CURRENT_INGREDIENT_DETAILS_OBJECT';

export function setCurrentIngredientDetailsObject(id) {
    return function (dispatch) {
        dispatch({
            type: SET_CURRENT_INGREDIENT_DETAILS_OBJECT,
            id
        });
    };
}