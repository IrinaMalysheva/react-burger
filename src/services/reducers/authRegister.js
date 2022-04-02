import {
    SET_USER_EMAIL,
    SET_USER_NAME,
    SET_USER_PASSWORD,
    SET_ACCESS_TOKEN,
    SET_REFRESH_TOKEN,

    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_ERROR,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
} from '../actions/authRegister';

import { setCookie } from '../../utils/utils';

const initialState = {
    userEmail: "",
    userName: "",
    userPassword: "",
    accessToken: "",
    refreshToken: "",

    isRegisterSuccessful: false,
    registerRequest: false,
    registerFailed: false,

    isLoginSuccessful: false,
    loginRequest: false,
    loginFailed: false,
};

export const authRegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_EMAIL: {
            return {
                ...state,
                userName: action.userName
            };
        }
        case SET_USER_NAME: {
            return {
                ...state,
                userName: action.userName
            };
        }
        case SET_USER_PASSWORD: {
            return {
                ...state,
                userPassword: action.userPassword
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
                isLoginSuccessful: true
            };
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                loginRequest: false,
                loginFailed: true
            };
        }
        default: {
            return state;
        }
    }
};