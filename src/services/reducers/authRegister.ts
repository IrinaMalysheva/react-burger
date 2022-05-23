import { TUserData } from '../../utils/types';
import {
    SET_USER_DATA,

    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_ERROR,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,

    UPDATE_TOKEN_REQUEST,
    UPDATE_TOKEN_SUCCESS,
    UPDATE_TOKEN_ERROR,

    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,

    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_ERROR,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
} from '../constants/authRegister';
import { TAuthRegisterActions } from '../actions/authRegister';

type TAuthRegisterState = {
    userData: TUserData | null;
    refreshToken: string;

    isRegistered: boolean;
    registerRequest: boolean;
    registerFailed: boolean;

    isLoggedIn: boolean;
    loginRequest: boolean;
    loginFailed: boolean;

    tokenRequest: boolean;
    tokenFailed: boolean;

    updateUserRequest: boolean;
    updateUserFailed: boolean;

    getUserRequest: boolean;
    getUserFailed: boolean;

    isLoggedOut: boolean;
    logoutRequest: boolean;
    logoutFailed: boolean;

    forgotPasswordRequest: boolean;
    forgotPasswordFailed: boolean;

    isPasswordReseted: boolean;
    resetPasswordRequest: boolean;
    resetPasswordFailed: boolean;
}

export const initialState: TAuthRegisterState = {
    userData: null,
    refreshToken: "",

    isRegistered: false,
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

    isLoggedOut: false,
    logoutRequest: false,
    logoutFailed: false,

    forgotPasswordRequest: false,
    forgotPasswordFailed: false,

    isPasswordReseted: false,
    resetPasswordRequest: false,
    resetPasswordFailed: false,
};

const authRegisterReducer = (state = initialState, action: TAuthRegisterActions): TAuthRegisterState => {
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
        case REGISTER_REQUEST: {
            return {
                ...state,
                isRegistered: false,
                registerRequest: true,
                registerFailed: false
            };
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                isRegistered: true,
                isLoggedIn: true,
                registerRequest: false,
                registerFailed: false
            };
        }
        case REGISTER_ERROR: {
            return {
                ...state,
                isRegistered: false,
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
                isLoggedIn: true,
                isLoggedOut: false,
                loginRequest: false,
                loginFailed: false,
            };
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                loginRequest: false,
                loginFailed: true
            };
        }
        case UPDATE_TOKEN_REQUEST: {
            return {
                ...state,
                tokenRequest: true,
                tokenFailed: false
            };
        }
        case UPDATE_TOKEN_SUCCESS: {
            return {
                ...state,
                tokenRequest: false,
                tokenFailed: false
            };
        }
        case UPDATE_TOKEN_ERROR: {
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
                isLoggedIn: true,
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
                isLoggedIn: true,
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
                isLoggedOut: false,
                logoutRequest: true,
                logoutFailed: false
            };
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                isRegistered: false,
                isLoggedIn: false,
                isLoggedOut: true,
                logoutRequest: false,
                logoutFailed: false
            };
        }
        case LOGOUT_ERROR: {
            return {
                ...state,
                isLoggedOut: false,
                logoutRequest: false,
                logoutFailed: true
            };
        }
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordRequest: true,
                forgotPasswordFailed: false
            };
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordFailed: false
            };
        }
        case FORGOT_PASSWORD_ERROR: {
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordFailed: true
            };
        }
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                isPasswordReseted: false,
                resetPasswordRequest: true,
                resetPasswordFailed: false
            };
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                isPasswordReseted: true,
                resetPasswordRequest: false,
                resetPasswordFailed: false
            };
        }
        case RESET_PASSWORD_ERROR: {
            return {
                ...state,
                isPasswordReseted: false,
                resetPasswordRequest: false,
                resetPasswordFailed: true
            };
        }
        default: {
            return state;
        }
    }
};

export default authRegisterReducer;