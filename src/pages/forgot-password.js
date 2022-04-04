import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPassword } from "../services/actions/authRegister";
import { getCookie } from '../utils/utils';

export function ForgotPasswordPage() {
    const dispatch = useDispatch();
    const { state } = useLocation();
    const history = useHistory();

    const isLoggedIn = useSelector(state => state.authRegister.isLoggedIn);
    const [emailValue, setEmailValue] = useState('');

    if (isLoggedIn || getCookie("refreshToken")) {
        return <Redirect to={ state?.from || '/' } />;
    }

    const handleForgotPassword = () => {
        dispatch(forgotPassword(emailValue));
        history.push({ pathname: '/reset-password', state: { prevPathname: history.location.pathname } });
    };

    return (
        <div className="autorizeBox">
            <p className="text text_type_main-medium pb-6">
                Восстановление пароля
            </p>
            <div className="inputWrapper">
                <Input
                    type={'text'}
                    placeholder={'Укажите e-mail'}
                    onChange={e => setEmailValue(e.target.value)}
                    value={emailValue}
                    name={'email'}
                    error={false}
                    errorText={'Ошибка'}
                />
            </div>
            <div className="pb-20">
                <Button type="primary" size="medium" onClick={handleForgotPassword}>
                    Восстановить
                </Button>
            </div>
            <p className="text text_type_main-default text_color_inactive">
                Вспомнили пароль? <Link to='/login'>Войти</Link>
            </p>
        </div>
    );
}