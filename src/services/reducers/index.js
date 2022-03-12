import { combineReducers } from 'redux';
import { ingredientsOrderReducer } from './ingredientsOrder';

export const rootReducer = combineReducers({
    ingredientsOrder: ingredientsOrderReducer
});