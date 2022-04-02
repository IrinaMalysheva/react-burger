import { checkResponse } from '../../utils/utils';
import { API_REGISTER, API_LOGIN } from '../../utils/constants';

export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_PASSWORD = 'SET_USER_PASSWORD';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export function login(emailValue, passwordValue) {
    return function (dispatch) {
        dispatch({ type: LOGIN_REQUEST });
        return fetch(API_LOGIN, {
            method: 'POST',
            body: JSON.stringify({
                "email": emailValue,
                "password": passwordValue
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(checkResponse)
            .then(jsonResp => {
                if (jsonResp.success) {
                    const accessToken = jsonResp.accessToken.split('Bearer ')[1];
                    dispatch({
                        type: SET_ACCESS_TOKEN,
                        data: accessToken
                    });
                    dispatch({
                        type: SET_REFRESH_TOKEN,
                        data: jsonResp.refreshToken
                    });
                    dispatch({ type: LOGIN_SUCCESS });
                }
            })
            .catch((err) => {
                dispatch({
                    type: LOGIN_ERROR
                });
            })
    }
};

export function register(nameValue, emailValue, passwordValue) {
    return function (dispatch) {
        dispatch({ type: REGISTER_REQUEST });
        return fetch(API_REGISTER, {
            method: 'POST',
            body: JSON.stringify({
                "email": emailValue,
                "password": passwordValue,
                "name": nameValue
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(checkResponse)
            .then(jsonResp => {
                if (jsonResp.success) {
                    const accessToken = jsonResp.accessToken.split('Bearer ')[1];
                    dispatch({
                        type: SET_ACCESS_TOKEN,
                        data: accessToken
                    });
                    dispatch({
                        type: SET_REFRESH_TOKEN,
                        data: jsonResp.refreshToken
                    });
                    dispatch({ type: REGISTER_SUCCESS });
                }
            })
            .catch((err) => {
                dispatch({
                    type: REGISTER_ERROR
                });
            })
    }
};