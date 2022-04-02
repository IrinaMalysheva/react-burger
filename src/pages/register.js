import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from "../services/actions/authRegister";

export function RegisterPage() {
    const dispatch = useDispatch();

    const [nameValue, setNameValue] = useState('');
    const inputNameRef = useRef(null);
    const [emailValue, setEmailValue] = useState('');
    const inputEmailRef = useRef(null);
    const [passwordValue, setPasswordValue] = useState('');

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
            <p className="text text_type_main-default text_color_inactive">
                Уже зарегистрированы? <Link to='/login'>Войти</Link>
            </p>
        </div>
    );
}