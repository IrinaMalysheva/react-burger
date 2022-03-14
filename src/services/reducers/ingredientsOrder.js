
import {
    GET_DATA_INGREDIENTS_REQUEST,
    GET_DATA_INGREDIENTS_SUCCESS,
    GET_DATA_INGREDIENTS_ERROR,

    SET_CONSTRUCTOR_INGREDIENTS,
    SET_CONSTRUCTOR_BUN,

    SET_CURRENT_INGREDIENT_DETAILS,
    REMOVE_CURRENT_INGREDIENT_DETAILS,

    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR,
} from '../actions';

const initialState = {
    dataIngredientsList: [],
    dataIngredientsRequest: false,
    dataIngredientsFailed: false,

    constructorInnerIngredients: [],
    constructorBun: null,

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
        case SET_CONSTRUCTOR_INGREDIENTS: {
            return {
                ...state, 
                constructorInnerIngredients: [...action.data],
            };
        }
        case SET_CONSTRUCTOR_BUN: {
            return {
                ...state, 
                constructorBun: action.data,
            };
        }
        case SET_CURRENT_INGREDIENT_DETAILS: {
            return {
                ...state,
                currentIngredientDetailsObject: [...state.dataIngredientsList].filter(item => item._id == action.id)[0]
            };
        }
        case REMOVE_CURRENT_INGREDIENT_DETAILS: {
            return {
                ...state,
                currentIngredientDetailsObject: null
            };
        }
        case REMOVE_CURRENT_INGREDIENT_DETAILS: {
            return {
                ...state,
                currentIngredientDetailsObject: null
            };
        }
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderFailed: false,
                orderRequest: true
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state, 
                orderObject: action.data,
                orderRequest: false,
                orderFailed: false,
            };
        }
        case GET_ORDER_ERROR: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true
            };
        }
        default: {
            return state;
        }
    }
};
