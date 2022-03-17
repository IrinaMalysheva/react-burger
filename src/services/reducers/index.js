import { combineReducers } from 'redux';
import { ingredientsOrderReducer } from './ingredientsOrder';
import {
    OPEN_MODAL,
    CLOSE_MODAL,
    OPEN_INGREDIENT_MODAL,
    CLOSE_INGREDIENT_MODAL,
    OPEN_ORDER_MODAL,
    CLOSE_ORDER_MODAL,
    SET_TAB_NAME,
    SET_TAB_OFFSETTOP,
} from '../actions';

const initialState = {
    tabName: "one",
    tabOffsets: [],

    isModalOpen: false,
    isIngredientModal: false,
    isOrderModal: false,
};

export const generalReducer = (state = initialState, action) => {
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
        default: {
            return state;
        }
    }
};

export const rootReducer = combineReducers({
    ingredientsOrder: ingredientsOrderReducer,
    general: generalReducer
});