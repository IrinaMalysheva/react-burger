import { checkResponse, getCookie, deleteCookie } from '../../utils/utils';
import { API_URL } from '../../utils/constants';

export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_ERROR = 'TOKEN_ERROR';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export function forgotPassword(emailValue) {
    return function (dispatch) {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        return fetch(API_URL + "/password-reset", {
            method: 'POST',
            body: JSON.stringify({
                "email": emailValue
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(checkResponse)
            .then(jsonResp => {
                dispatch({ type: FORGOT_PASSWORD_SUCCESS });
            })
            .catch((err) => {
                dispatch({ type: FORGOT_PASSWORD_ERROR });
            })
    }
};

export function getUser(accessToken) {
    return function (dispatch) {
        dispatch({ type: GET_USER_REQUEST });
        return fetch(API_URL + "/auth/user", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: 'Bearer ' + accessToken
            }
        })
            .then(checkResponse)
            .then(jsonResp => {
                if (jsonResp.success) {
                    const accessToken = jsonResp.accessToken.split('Bearer ')[1];
                    dispatch({
                        type: SET_USER_DATA,
                        data: {
                            "email": jsonResp.user.email,
                            "name": jsonResp.user.name
                        }
                    });
                    dispatch({
                        type: SET_ACCESS_TOKEN,
                        data: accessToken
                    });
                    dispatch({
                        type: SET_REFRESH_TOKEN,
                        data: jsonResp.refreshToken
                    });
                    dispatch({ type: GET_USER_SUCCESS });
                }
            })
            .catch((err) => {
                dispatch(updateToken());
                dispatch({ type: GET_USER_ERROR })
            })
    }
};

export function login(emailValue, passwordValue) {
    return function (dispatch) {
        dispatch({ type: LOGIN_REQUEST });
        return fetch(API_URL + "/auth/login", {
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
                        type: SET_USER_DATA,
                        data: {
                            "email": jsonResp.user.email,
                            "name": jsonResp.user.name
                        }
                    });
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
                dispatch({ type: LOGIN_ERROR });
            })
    }
};

export function logout() {
    return function (dispatch) {
        dispatch({ type: LOGOUT_REQUEST });
        return fetch(API_URL + "/auth/logout", {
            method: 'POST',
            body: JSON.stringify({
                "token": getCookie("refreshToken")
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(checkResponse)
            .then(jsonResp => {
                deleteCookie("refreshToken");
                if (jsonResp.success) {
                    dispatch({ type: LOGOUT_SUCCESS });
                }
            })
            .catch((err) => {
                dispatch({ type: LOGOUT_ERROR });
            })
    }
};

export function register(nameValue, emailValue, passwordValue) {
    return function (dispatch) {
        dispatch({ type: REGISTER_REQUEST });
        return fetch(API_URL + "/auth/register", {
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
                        type: SET_USER_DATA,
                        data: {
                            "email": jsonResp.user.email,
                            "name": jsonResp.user.name
                        }
                    });
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
                dispatch({ type: REGISTER_ERROR });
            })
    }
};

export function resetPassword(passwordValue, tokenValue) {
    return function (dispatch) {
        dispatch({ type: RESET_PASSWORD_REQUEST });
        return fetch(API_URL + "/password-reset/reset", {
            method: 'POST',
            body: JSON.stringify({
                "password": passwordValue,
                "token": tokenValue
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(checkResponse)
            .then(jsonResp => {
                dispatch({ type: RESET_PASSWORD_SUCCESS });
            })
            .catch((err) => {
                dispatch({ type: RESET_PASSWORD_ERROR });
            })
    }
};

export function updateToken() {
    return function (dispatch) {
        dispatch({ type: TOKEN_REQUEST });
        return fetch(API_URL + "/auth/token", {
            method: 'POST',
            body: JSON.stringify({
                "token": getCookie("refreshToken")
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
                    dispatch({ type: TOKEN_SUCCESS });
                    dispatch(getUser(accessToken));
                }
            })
            .catch((err) => {
                dispatch({ type: TOKEN_ERROR });
            })
    }
};

export function updateUser(email, name, password) {
    return function (dispatch) {
        dispatch({ type: UPDATE_USER_REQUEST });
        return fetch(API_URL + "/auth/user", {
            method: 'PATCH',
            body: JSON.stringify({ email, name, password }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: getCookie("refreshToken")
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
                    dispatch({ type: UPDATE_USER_SUCCESS });
                }
            })
            .catch((err) => {
                dispatch({ type: UPDATE_USER_ERROR });
            })
    }
};