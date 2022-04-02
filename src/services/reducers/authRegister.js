import {
    SET_USER_EMAIL,
    SET_USER_NAME,
    SET_USER_PASSWORD,
    SET_ACCESS_TOKEN,
    SET_REFRESH_TOKEN,
    GET_REGISTER_ERROR,
} from '../actions/authRegister';

const initialState = {
    userEmail: "",
    userName: "",
    userPassword: "",
    accessToken: "",
    refreshToken: "",
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
            return {
                ...state,
                refreshToken: action.data
            };
        }
        default: {
            return state;
        }
    }
};