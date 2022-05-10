import { checkResponse, getCookie, deleteCookie, setCookie } from '../../utils/utils';
import { API_URL } from '../../utils/constants';
import { AppDispatch, AppThunk } from '../types';
import { TSetUserData } from '../../utils/types';
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

export interface ISetUserDataAction {
    readonly type: typeof SET_USER_DATA;
    readonly data: TSetUserData;
}

export interface IRegisterRequestAction {
    readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
}

export interface IRegisterErrorAction {
    readonly type: typeof REGISTER_ERROR;
}

export interface ILoginRequestAction {
    readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
}

export interface ILoginErrorAction {
    readonly type: typeof LOGIN_ERROR;
}

export interface IUpdateTokenRequestAction {
    readonly type: typeof UPDATE_TOKEN_REQUEST;
}

export interface IUpdateTokenSuccessAction {
    readonly type: typeof UPDATE_TOKEN_SUCCESS;
}

export interface IUpdateTokenErrorAction {
    readonly type: typeof UPDATE_TOKEN_ERROR;
}

export interface IUpdateUserRequestAction {
    readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_SUCCESS;
}

export interface IUpdateUserErrorAction {
    readonly type: typeof UPDATE_USER_ERROR;
}

export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
}

export interface IGetUserErrorAction {
    readonly type: typeof GET_USER_ERROR;
}

export interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutErrorAction {
    readonly type: typeof LOGOUT_ERROR;
}

export interface IForgotPasswordRequestAction {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordErrorAction {
    readonly type: typeof FORGOT_PASSWORD_ERROR;
}

export interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordErrorAction {
    readonly type: typeof RESET_PASSWORD_ERROR;
}

export type TAuthRegisterActions =
    | ISetUserDataAction
    | IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterErrorAction
    | ILoginRequestAction
    | ILoginSuccessAction
    | ILoginErrorAction
    | IUpdateTokenRequestAction
    | IUpdateTokenSuccessAction
    | IUpdateTokenErrorAction
    | IUpdateUserRequestAction
    | IUpdateUserSuccessAction
    | IUpdateUserErrorAction
    | IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserErrorAction
    | ILogoutRequestAction
    | ILogoutSuccessAction
    | ILogoutErrorAction
    | IForgotPasswordRequestAction
    | IForgotPasswordSuccessAction
    | IForgotPasswordErrorAction
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordErrorAction
    ;

const setUserDataAction = (data: TSetUserData): ISetUserDataAction => ({
    type: SET_USER_DATA,
    data,
});

const registerRequestAction = (): IRegisterRequestAction => ({ type: REGISTER_REQUEST });
const registerSuccessAction = (): IRegisterSuccessAction => ({ type: REGISTER_SUCCESS });
const registerErrorAction = (): IRegisterErrorAction => ({ type: REGISTER_ERROR });

const loginRequestAction = (): ILoginRequestAction => ({ type: LOGIN_REQUEST });
const loginSuccessAction = (): ILoginSuccessAction => ({ type: LOGIN_SUCCESS });
const loginErrorAction = (): ILoginErrorAction => ({ type: LOGIN_ERROR });

const updateTokenRequestAction = (): IUpdateTokenRequestAction => ({ type: UPDATE_TOKEN_REQUEST });
const updateTokenSuccessAction = (): IUpdateTokenSuccessAction => ({ type: UPDATE_TOKEN_SUCCESS });
const updateTokenErrorAction = (): IUpdateTokenErrorAction => ({ type: UPDATE_TOKEN_ERROR });

const updateUserRequestAction = (): IUpdateUserRequestAction => ({ type: UPDATE_USER_REQUEST });
const updateUserSuccessAction = (): IUpdateUserSuccessAction => ({ type: UPDATE_USER_SUCCESS });
const updateUserErrorAction = (): IUpdateUserErrorAction => ({ type: UPDATE_USER_ERROR });

const getUserRequestAction = (): IGetUserRequestAction => ({ type: GET_USER_REQUEST });
const getUserSuccessAction = (): IGetUserSuccessAction => ({ type: GET_USER_SUCCESS });
const getUserErrorAction = (): IGetUserErrorAction => ({ type: GET_USER_ERROR });

const logoutRequestAction = (): ILogoutRequestAction => ({ type: LOGOUT_REQUEST });
const logoutSuccessAction = (): ILogoutSuccessAction => ({ type: LOGOUT_SUCCESS });
const logoutErrorAction = (): ILogoutErrorAction => ({ type: LOGOUT_ERROR });

const forgotPasswordRequestAction = (): IForgotPasswordRequestAction => ({ type: FORGOT_PASSWORD_REQUEST });
const forgotPasswordSuccessAction = (): IForgotPasswordSuccessAction => ({ type: FORGOT_PASSWORD_SUCCESS });
const forgotPasswordErrorAction = (): IForgotPasswordErrorAction => ({ type: FORGOT_PASSWORD_ERROR });

const resetPasswordRequestAction = (): IResetPasswordRequestAction => ({ type: RESET_PASSWORD_REQUEST });
const resetPasswordSuccessAction = (): IResetPasswordSuccessAction => ({ type: RESET_PASSWORD_SUCCESS });
const resetPasswordErrorAction = (): IResetPasswordErrorAction => ({ type: RESET_PASSWORD_ERROR });

export const forgotPassword: AppThunk = (emailValue: string) => (dispatch: AppDispatch) => {
    dispatch(forgotPasswordRequestAction());
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
        .then(() => {
            dispatch(forgotPasswordSuccessAction());
        })
        .catch((err) => {
            dispatch(forgotPasswordErrorAction());
        })
};

export const getUser: AppThunk = () => (dispatch) => {
    dispatch(getUserRequestAction());
    return fetch(API_URL + "/auth/user", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken')
        }
    })
        .then(checkResponse)
        .then(jsonResp => {
            if (jsonResp.success) {
                dispatch(setUserDataAction({
                    "email": jsonResp.user.email,
                    "name": jsonResp.user.name
                }));
                dispatch(getUserSuccessAction());
            }
        })
        .catch((err) => {
            if (getCookie('refreshToken')) {
                dispatch(updateToken());
                dispatch(getUser());
            } else {
                dispatch(getUserErrorAction())
            }
        })
};

export const login: AppThunk = (emailValue: string, passwordValue: string) => (dispatch: AppDispatch) => {
    dispatch(loginRequestAction());
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
                setCookie('accessToken', accessToken, { path: '/' });
                setCookie('refreshToken', jsonResp.refreshToken, { path: '/' });
                dispatch(setUserDataAction({
                    "email": jsonResp.user.email,
                    "name": jsonResp.user.name
                }));
                dispatch(loginSuccessAction());
            }
        })
        .catch((err) => {
            dispatch(loginErrorAction());
        })
};

export const logout: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(logoutRequestAction());
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
            deleteCookie("accessToken");
            deleteCookie("refreshToken");
            if (jsonResp.success) {
                dispatch(logoutSuccessAction());
            }
        })
        .catch((err) => {
            dispatch(logoutErrorAction());
        })
};

export const register: AppThunk = (nameValue: string, emailValue: string, passwordValue: string) => (dispatch: AppDispatch) => {
    dispatch(registerRequestAction());
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
                setCookie('accessToken', accessToken, { path: '/' });
                setCookie('refreshToken', jsonResp.refreshToken, { path: '/' });
                dispatch(setUserDataAction({
                    "email": jsonResp.user.email,
                    "name": jsonResp.user.name
                }));
                dispatch(registerSuccessAction());
            }
        })
        .catch((err) => {
            dispatch(registerErrorAction());
        })
};

export const resetPassword: AppThunk = (passwordValue: string, tokenValue: string) => (dispatch: AppDispatch) => {
    dispatch(resetPasswordRequestAction());
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
        .then(() => {
            dispatch(resetPasswordSuccessAction());
        })
        .catch((err) => {
            dispatch(resetPasswordErrorAction());
        })
};

export const updateToken: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(updateTokenRequestAction());
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
                setCookie('accessToken', accessToken, { path: '/' });
                dispatch(updateTokenSuccessAction());
            }
        })
        .catch((err) => {
            dispatch(updateTokenErrorAction());
        })
};

export const updateUser: AppThunk = (email: string, name: string, password: string) => (dispatch: AppDispatch) => {
    dispatch(updateUserRequestAction());
    dispatch({ type: UPDATE_USER_REQUEST });
    return fetch(API_URL + "/auth/user", {
        method: 'PATCH',
        body: JSON.stringify({ email, name, password }),
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken')
        }
    })
        .then(checkResponse)
        .then(jsonResp => {
            if (jsonResp.success) {
                dispatch(setUserDataAction({
                    "email": jsonResp.user.email,
                    "name": jsonResp.user.name
                }));
                dispatch(updateUserSuccessAction());
            }
        })
        .catch((err) => {
            dispatch(updateUserErrorAction());
        })
};