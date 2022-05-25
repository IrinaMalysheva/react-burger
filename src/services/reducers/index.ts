import { combineReducers } from 'redux';
import authRegisterReducer from './authRegister';
import generalBurgersReducer from './generalBurgers';
import wsOrdersFeedReducer from './wsOrdersFeed';

export const rootReducer = combineReducers({
    authRegister: authRegisterReducer,
    generalBurgers: generalBurgersReducer,
    wsOrdersFeed: wsOrdersFeedReducer,
});