import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { rootReducer } from '../services/reducers';
import thunk from 'redux-thunk';
import { socketMiddleware } from './middleware';
import {
    wsOrderActions,
    wsUserOrderActions,
} from "./actions/wsOrdersFeed";
import { wsUrl } from '../utils/constants';

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk, socketMiddleware(wsUrl, wsOrderActions), socketMiddleware(wsUrl, wsUserOrderActions))
    )
);