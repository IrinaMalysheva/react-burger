import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from "../services/actions/authRegister";
import { getCookie } from '../utils/utils';

export function RegisterPage() {
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { isLoggedIn, isRegistered, registerFailed } = useSelector(state => state.authRegister);

    const [nameValue, setNameValue] = useState('');
    const inputNameRef = useRef(null);
    const [emailValue, setEmailValue] = useState('');
    const inputEmailRef = useRef(null);
    const [passwordValue, setPasswordValue] = useState('');

    if (isLoggedIn || getCookie("refreshToken")) {
        return <Redirect to={ state?.from || '/' } />;
    }

    const handleRegister = () => {
        dispatch(register(nameValue, emailValue, passwordValue));
    };

    return (
        <div className="autorizeBox">
            <p className="text text_type_main-medium pb-6">
                Регистрация
            </p>
            <div className="inputWrapper">
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setNameValue(e.target.value)}
                    value={nameValue}
                    name={'name'}
                    error={false}
                    ref={inputNameRef}
                    errorText={'Ошибка'}
                />
            </div>
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
                <Button type="primary" size="medium" onClick={handleRegister}>
                    Зарегистрироваться
                </Button>
            </div>
            {registerFailed &&
                <p className="text text_type_main-default text_color_inactive pb-8">
                    Вероятно, пользователь с таким E-mail уже существует. Попробуйте <Link to='/login'>Войти</Link> или использовать другой E-mail для регистрации
                </p>
            }
            {isRegistered &&
                <p className="text text_type_main-default pb-8">
                    Вы успешно зарегистрированы! <Link to='/login' style={{ textDecoration: "underline" }}>Войдите</Link>
                </p>
            }
            <p className="text text_type_main-default text_color_inactive">
                Уже зарегистрированы? <Link to='/login'>Войти</Link>
            </p>
        </div>
    );
}