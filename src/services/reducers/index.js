import { combineReducers } from 'redux';
import { ingredientsOrderReducer } from './ingredientsOrder';
import {
    SET_TAB_NAME,
    SET_TAB_OFFSETTOP,
} from '../actions';

const initialState = {
    tabName: "one",
    tabOffsets: []
};

export const generalReducer = (state = initialState, action) => {
    switch (action.type) {
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