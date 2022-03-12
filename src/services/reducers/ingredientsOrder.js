
import {
    GET_DATA_INGREDIENTS_REQUEST,
    GET_DATA_INGREDIENTS_SUCCESS,
    GET_DATA_INGREDIENTS_ERROR,

    GET_CURRENT_INGREDIENT_DETAILS,
    REMOVE_CURRENT_INGREDIENT_DETAILS,

    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR,

    CLOSE_MODAL,
    OPEN_MODAL,
    OPEN_INGREDIENT_MODAL,
    OPEN_ORDER_MODAL,
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

    isModalOpen: false,
    isIngredientModal: false,
    isOrderModal: false,
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
        case CLOSE_MODAL: {
            return {
                ...state,
                isModalOpen: false
            };
        }
        case OPEN_MODAL: {
            return {
                ...state,
                isModalOpen: true,
                isIngredientModal: false,
                isOrderModal: false
            };
        }
        case OPEN_INGREDIENT_MODAL: {
            return {
                ...state,
                isIngredientModal: true
            };
        }
        case OPEN_ORDER_MODAL: {
            return {
                ...state,
                isOrderModal: true
            };
        }
        default: {
            return state;
        }
    }
};
