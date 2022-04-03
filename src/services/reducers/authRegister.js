import {
    SET_USER_DATA,
    SET_ACCESS_TOKEN,
    SET_REFRESH_TOKEN,

    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_ERROR,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,

    TOKEN_REQUEST,
    TOKEN_SUCCESS,
    TOKEN_ERROR,

    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,

    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,
} from '../actions/authRegister';

import { setCookie } from '../../utils/utils';

const initialState = {
    userData: null,
    accessToken: "",
    refreshToken: "",

    isRegisterSuccessful: false,
    registerRequest: false,
    registerFailed: false,

    isLoggedIn: false,
    loginRequest: false,
    loginFailed: false,

    tokenRequest: false,
    tokenFailed: false,

    updateUserRequest: false,
    updateUserFailed: false,

    getUserRequest: false,
    getUserFailed: false,

    logoutRequest: false,
    logoutFailed: false,
};

export const authRegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                userData: {
                    "email": action.data.email,
                    "name": action.data.name
                }
            };
        }
        case SET_ACCESS_TOKEN: {
            return {
                ...state,
                accessToken: action.data
            };
        }
        case SET_REFRESH_TOKEN: {
            setCookie('refreshToken', action.data);
            return {
                ...state,
                refreshToken: action.data
            };
        }
        case REGISTER_REQUEST: {
            return {
                ...state,
                registerRequest: true,
                registerFailed: false
            };
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                registerRequest: false,
                registerFailed: false,
                isRegisterSuccessful: true
            };
        }
        case REGISTER_ERROR: {
            return {
                ...state,
                registerRequest: false,
                registerFailed: true
            };
        }
        case LOGIN_REQUEST: {
            return {
                ...state,
                loginRequest: true,
                loginFailed: false
            };
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                loginRequest: false,
                loginFailed: false,
                isLoggedIn: true
            };
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                loginRequest: false,
                loginFailed: true
            };
        }
        case TOKEN_REQUEST: {
            return {
                ...state,
                tokenRequest: true,
                tokenFailed: false
            };
        }
        case TOKEN_SUCCESS: {
            return {
                ...state,
                tokenRequest: false,
                tokenFailed: false
            };
        }
        case TOKEN_ERROR: {
            return {
                ...state,
                tokenRequest: false,
                tokenFailed: true
            };
        }
        case UPDATE_USER_REQUEST: {
            return {
                ...state,
                updateUserRequest: true,
                updateUserFailed: false
            };
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                updateUserRequest: false,
                updateUserFailed: false
            };
        }
        case UPDATE_USER_ERROR: {
            return {
                ...state,
                updateUserRequest: false,
                updateUserFailed: true
            };
        }
        case GET_USER_REQUEST: {
            return {
                ...state,
                getUserRequest: true,
                getUserFailed: false
            };
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                getUserRequest: false,
                getUserFailed: false
            };
        }
        case GET_USER_ERROR: {
            return {
                ...state,
                getUserRequest: false,
                getUserFailed: true
            };
        }
        case LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true,
                logoutFailed: false
            };
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: false
            };
        }
        case LOGOUT_ERROR: {
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: true
            };
        }
        default: {
            return state;
        }
    }
};