import reducer from './authRegister';
import initialState from './authRegister';
import * as types from '../constants/authRegister';

describe('authRegister reducer', () => {
    const userData = {
        "email": "test@ema.il",
        "name": "Test Name"
    };

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
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
            }
        )
    });

    it("should handle SET_USER_DATA", () => {
        expect(
            reducer(initialState, {
                type: types.SET_USER_DATA,
                data: userData
            })
        ).toEqual({
            ...initialState,
            userData: {
                "email": userData.email,
                "name": userData.name
            }
        });
    });

    it("should handle REGISTER_REQUEST", () => {
        expect(
            reducer(initialState, {
                type: types.REGISTER_REQUEST,
            })
        ).toEqual({
            ...initialState,
            isRegistered: false,
            registerRequest: true,
            registerFailed: false
        });
    });

    it("should handle REGISTER_SUCCESS", () => {
        expect(
            reducer(initialState, {
                type: types.REGISTER_SUCCESS,
            })
        ).toEqual({
            ...initialState,
            isRegistered: true,
            isLoggedIn: true,
            registerRequest: false,
            registerFailed: false
        });
    });

    it("should handle REGISTER_ERROR", () => {
        expect(
            reducer(initialState, {
                type: types.REGISTER_ERROR,
            })
        ).toEqual({
            ...initialState,
            isRegistered: false,
            registerRequest: false,
            registerFailed: true
        });
    });

    it("should handle LOGIN_REQUEST", () => {
        expect(
            reducer(initialState, {
                type: types.LOGIN_REQUEST,
            })
        ).toEqual({
            ...initialState,
            loginRequest: true,
            loginFailed: false
        });
    });

    it("should handle LOGIN_SUCCESS", () => {
        expect(
            reducer(initialState, {
                type: types.LOGIN_SUCCESS,
            })
        ).toEqual({
            ...initialState,
            isLoggedIn: true,
            isLoggedOut: false,
            loginRequest: false,
            loginFailed: false,
        });
    });

    it("should handle LOGIN_ERROR", () => {
        expect(
            reducer(initialState, {
                type: types.LOGIN_ERROR,
            })
        ).toEqual({
            ...initialState,
            loginRequest: false,
            loginFailed: true
        });
    });

    it("should handle UPDATE_TOKEN_REQUEST", () => {
        expect(
            reducer(initialState, {
                type: types.UPDATE_TOKEN_REQUEST,
            })
        ).toEqual({
            ...initialState,
            tokenRequest: true,
            tokenFailed: false
        });
    });

    it("should handle UPDATE_TOKEN_SUCCESS", () => {
        expect(
            reducer(initialState, {
                type: types.UPDATE_TOKEN_SUCCESS,
            })
        ).toEqual({
            ...initialState,
            tokenRequest: false,
            tokenFailed: false
        });
    });

    it("should handle UPDATE_TOKEN_ERROR", () => {
        expect(
            reducer(initialState, {
                type: types.UPDATE_TOKEN_ERROR,
            })
        ).toEqual({
            ...initialState,
            tokenRequest: false,
            tokenFailed: true
        });
    });

    it("should handle UPDATE_USER_REQUEST", () => {
        expect(
            reducer(initialState, {
                type: types.UPDATE_USER_REQUEST,
            })
        ).toEqual({
            ...initialState,
            updateUserRequest: true,
            updateUserFailed: false
        });
    });

    it("should handle UPDATE_USER_SUCCESS", () => {
        expect(
            reducer(initialState, {
                type: types.UPDATE_USER_SUCCESS,
            })
        ).toEqual({
            ...initialState,
            isLoggedIn: true,
            updateUserRequest: false,
            updateUserFailed: false
        });
    });

    it("should handle UPDATE_USER_ERROR", () => {
        expect(
            reducer(initialState, {
                type: types.UPDATE_USER_ERROR,
            })
        ).toEqual({
            ...initialState,
            updateUserRequest: false,
            updateUserFailed: true
        });
    });

    it("should handle GET_USER_REQUEST", () => {
        expect(
            reducer(initialState, {
                type: types.GET_USER_REQUEST,
            })
        ).toEqual({
            ...initialState,
            getUserRequest: true,
            getUserFailed: false
        });
    });

    it("should handle GET_USER_SUCCESS", () => {
        expect(
            reducer(initialState, {
                type: types.GET_USER_SUCCESS,
            })
        ).toEqual({
            ...initialState,
            isLoggedIn: true,
            getUserRequest: false,
            getUserFailed: false
        });
    });

    it("should handle GET_USER_ERROR", () => {
        expect(
            reducer(initialState, {
                type: types.GET_USER_ERROR,
            })
        ).toEqual({
            ...initialState,
            getUserRequest: false,
            getUserFailed: true
        });
    });

    it("should handle LOGOUT_REQUEST", () => {
        expect(
            reducer(initialState, {
                type: types.LOGOUT_REQUEST,
            })
        ).toEqual({
            ...initialState,
            isLoggedOut: false,
            logoutRequest: true,
            logoutFailed: false
        });
    });

    it("should handle LOGOUT_SUCCESS", () => {
        expect(
            reducer(initialState, {
                type: types.LOGOUT_SUCCESS,
            })
        ).toEqual({
            ...initialState,
            isRegistered: false,
            isLoggedIn: false,
            isLoggedOut: true,
            logoutRequest: false,
            logoutFailed: false
        });
    });

    it("should handle LOGOUT_ERROR", () => {
        expect(
            reducer(initialState, {
                type: types.LOGOUT_ERROR,
            })
        ).toEqual({
            ...initialState,
            isLoggedOut: false,
            logoutRequest: false,
            logoutFailed: true
        });
    });

    it("should handle FORGOT_PASSWORD_REQUEST", () => {
        expect(
            reducer(initialState, {
                type: types.FORGOT_PASSWORD_REQUEST,
            })
        ).toEqual({
            ...initialState,
            forgotPasswordRequest: true,
            forgotPasswordFailed: false
        });
    });

    it("should handle FORGOT_PASSWORD_SUCCESS", () => {
        expect(
            reducer(initialState, {
                type: types.FORGOT_PASSWORD_SUCCESS,
            })
        ).toEqual({
            ...initialState,
            forgotPasswordRequest: false,
            forgotPasswordFailed: false
        });
    });

    it("should handle FORGOT_PASSWORD_ERROR", () => {
        expect(
            reducer(initialState, {
                type: types.FORGOT_PASSWORD_ERROR,
            })
        ).toEqual({
            ...initialState,
            forgotPasswordRequest: false,
            forgotPasswordFailed: true
        });
    });

    it("should handle RESET_PASSWORD_REQUEST", () => {
        expect(
            reducer(initialState, {
                type: types.RESET_PASSWORD_REQUEST,
            })
        ).toEqual({
            ...initialState,
            isPasswordReseted: false,
            resetPasswordRequest: true,
            resetPasswordFailed: false
        });
    });

    it("should handle RESET_PASSWORD_SUCCESS", () => {
        expect(
            reducer(initialState, {
                type: types.RESET_PASSWORD_SUCCESS,
            })
        ).toEqual({
            ...initialState,
            isPasswordReseted: true,
            resetPasswordRequest: false,
            resetPasswordFailed: false
        });
    });

    it("should handle RESET_PASSWORD_ERROR", () => {
        expect(
            reducer(initialState, {
                type: types.RESET_PASSWORD_ERROR,
            })
        ).toEqual({
            ...initialState,
            isPasswordReseted: false,
            resetPasswordRequest: false,
            resetPasswordFailed: true
        });
    });
});