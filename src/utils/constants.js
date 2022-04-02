import PropTypes from 'prop-types';

export const menuItemPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
});

export const Escape_keyCode = 27;
export const API_URL = "https://norma.nomoreparties.space/api";
export const API_LOGIN = "https://norma.nomoreparties.space/api/auth/login";
export const API_REGISTER = "https://norma.nomoreparties.space/api/auth/register";
export const API_LOGOUT = "https://norma.nomoreparties.space/api/auth/logout";
export const API_TOKEN = "https://norma.nomoreparties.space/api/auth/token";