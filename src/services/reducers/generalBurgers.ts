import type { TIngredient } from '../../utils/types';
import {
    OPEN_MODAL,
    CLOSE_MODAL,
    OPEN_INGREDIENT_MODAL,
    CLOSE_INGREDIENT_MODAL,
    OPEN_ORDER_MODAL,
    CLOSE_ORDER_MODAL,
    SET_TAB_NAME,
    SET_TAB_OFFSETTOP,
    
    GET_DATA_INGREDIENTS_REQUEST,
    GET_DATA_INGREDIENTS_SUCCESS,
    GET_DATA_INGREDIENTS_ERROR,

    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR,
    REMOVE_ORDER_OBJECT,

    SET_CONSTRUCTOR_BUN,
    ADD_CONSTRUCTOR_INGREDIENT,
    REMOVE_CONSTRUCTOR_INGREDIENT,
    CLEAR_CONSTRUCTOR,
    MOVE_CONSTRUCTOR_INGREDIENT,
} from '../constants/generalBurgers';
import { TGeneralBurgersActions } from '../actions/generalBurgers';

type TGeneralBurgersState = {
    tabName: string;
    tabOffsets: Array<object>;

    isModalOpen: boolean;
    isIngredientModal: boolean;
    isOrderModal: boolean;

    dataIngredientsList: TIngredient[];
    dataIngredientsRequest: boolean;
    dataIngredientsFailed: boolean;

    constructorFillingIngredients: TIngredient[];
    constructorBun: TIngredient | null;

    orderObject: object | null;
    orderRequest: boolean;
    orderFailed: boolean;
} 

const initialState: TGeneralBurgersState = {
    tabName: "one",
    tabOffsets: [],

    isModalOpen: false,
    isIngredientModal: false,
    isOrderModal: false,
    
    dataIngredientsList: [],
    dataIngredientsRequest: false,
    dataIngredientsFailed: false,

    constructorFillingIngredients: [],
    constructorBun: null,

    orderObject: null,
    orderRequest: false,
    orderFailed: false,
};

export const generalBurgersReducer = (state = initialState, action: TGeneralBurgersActions): TGeneralBurgersState => {
    switch (action.type) {
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
        case CLOSE_INGREDIENT_MODAL: {
            return {
                ...state,
                isIngredientModal: false
            };
        }
        case OPEN_ORDER_MODAL: {
            return {
                ...state,
                isOrderModal: true
            };
        }
        case CLOSE_ORDER_MODAL: {
            return {
                ...state,
                isOrderModal: false
            };
        }
        case SET_TAB_OFFSETTOP: {
            return {
                ...state,
                tabOffsets: [
                    ...state.tabOffsets, 
                    action.data
                ]
            };
        }
        case SET_TAB_NAME: {
            return {
                ...state,
                tabName: action.tabname
            };
        }
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
        case ADD_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                constructorFillingIngredients: [...state.constructorFillingIngredients, action.item]
            };
        }
        case SET_CONSTRUCTOR_BUN: {
            return {
                ...state,
                constructorBun: action.item
            };
        }
        case REMOVE_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                constructorFillingIngredients: [...state.constructorFillingIngredients.filter((ingredient) => ingredient.uuid !== action.uuid)]
            };
        }
        case CLEAR_CONSTRUCTOR: {
            return {
                ...state,
                constructorBun: null,
                constructorFillingIngredients: []
            };
        }
        case MOVE_CONSTRUCTOR_INGREDIENT: {
            let reorderedFillingIngredients = [...state.constructorFillingIngredients];
            const dragItem = reorderedFillingIngredients.splice(action.dragIndex, 1);
            reorderedFillingIngredients.splice(action.hoverIndex, 0, dragItem[0]);
            return {
                ...state,
                constructorFillingIngredients: [...reorderedFillingIngredients],
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
        case REMOVE_ORDER_OBJECT: {
            return {
                ...state, 
                orderObject: null
            };
        }
        default: {
            return state;
        }
    }
};