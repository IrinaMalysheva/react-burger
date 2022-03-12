
import {
    GET_DATA_INGREDIENTS_REQUEST,
    GET_DATA_INGREDIENTS_SUCCESS,
    GET_DATA_INGREDIENTS_ERROR,

    GET_CURRENT_INGREDIENT_DETAILS,
} from '../actions';

const initialState = {
    dataIngredientsList: [],
    dataIngredientsRequest: false,
    dataIngredientsFailed: false,

    constructorIngredientsList: [],
    constructorIngredientsRequest: false,
    constructorIngredientsFailed: false,

    currentIngredientDetailsObject: null,

    orderObject: null,
    orderRequest: false,
    orderFailed: false,
};

export const ingredientsOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_INGREDIENTS_REQUEST: {
            return {
                ...state,
                dataIngredientsFailed: false,
                dataIngredientsRequest: true
            };
        }
        case GET_DATA_INGREDIENTS_SUCCESS: {
            return {
                ...state, 
                dataIngredientsList: [...action.data],
                dataIngredientsRequest: false,
                dataIngredientsFailed: false,
            };
        }
        case GET_DATA_INGREDIENTS_ERROR: {
            return {
                ...state,
                dataIngredientsRequest: false,
                dataIngredientsFailed: true
            };
        }
        case GET_CURRENT_INGREDIENT_DETAILS: {
            return {
                ...state,
                currentIngredientDetailsObject: [...state.dataIngredientsList].filter(item => item._id == action.id)[0]
            };
        }
        default: {
            return state;
        }
    }
};
