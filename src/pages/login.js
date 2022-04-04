import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from "../services/actions/authRegister";

export function LoginPage() {
    const dispatch = useDispatch();
    const { state } = useLocation();
    const isLoggedIn = useSelector(state => state.authRegister.isLoggedIn);

    const [emailValue, setEmailValue] = useState('');
    const inputEmailRef = useRef(null);
    const [passwordValue, setPasswordValue] = useState('');

    if (isLoggedIn) {
        return <Redirect to={ state?.from || '/' } />;
    }

    const handleLogin = () => {
        dispatch(login(emailValue, passwordValue));
    };

    return (
        <div className="autorizeBox">
            <p className="text text_type_main-medium pb-6">
                Вход
            </p>
            <div className="inputWrapper">
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    onChange={e => setEmailValue(e.target.value)}
                    value={emailValue}
                    name={'email'}
                    error={false}
                    ref={inputEmailRef}
                    errorText={'Ошибка'}
                />
            </div>
            <div className="inputWrapper">
                <PasswordInput
                    onChange={e => setPasswordValue(e.target.value)}
                    value={passwordValue}
                    name={'password'}
                />
            </div>
            <div className="pb-20">
                <Button type="primary" size="medium" onClick={handleLogin}>
                    Войти
                </Button>
            </div>
            <p className="text text_type_main-default text_color_inactive pb-4">
                Вы — новый пользователь? <Link to='/register'>Зарегистрироваться</Link>
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link>
            </p>
        </div>
    );
}