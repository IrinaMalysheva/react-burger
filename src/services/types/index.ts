import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { store } from '../store';
import { TMainBurgersActions } from '../actions';
import { TAuthRegisterActions } from '../actions/authRegister';

export type RootState = ReturnType<typeof store.getState>; 
type TApplicationActions = TMainBurgersActions | TAuthRegisterActions;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 
export type AppDispatch = typeof store.dispatch;