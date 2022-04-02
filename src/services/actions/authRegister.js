import { checkResponse } from '../../utils/utils';
import { API_REGISTER } from '../../utils/constants';

export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_PASSWORD = 'SET_USER_PASSWORD';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';
export const GET_REGISTER_ERROR = 'GET_REGISTER_ERROR';

export function register(nameValue, emailValue, passwordValue) {
    return function (dispatch) {
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
                const accessToken = jsonResp.accessToken.split('Bearer ')[1];
                dispatch({
                    type: SET_ACCESS_TOKEN,
                    data: accessToken
                });
                dispatch({
                    type: SET_REFRESH_TOKEN,
                    data: jsonResp.refreshToken
                });
            })
            .catch((err) => {
                dispatch({
                    type: GET_REGISTER_ERROR
                });
            })
    }
};
