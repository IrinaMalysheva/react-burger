import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

export function RegisterPage() {
    const [emailValue, setEmailValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const inputEmailRef = useRef(null);
    const inputNameRef = useRef(null);
    const [passwordValue, setPasswordValue] = useState('');

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
                <Button type="primary" size="medium">
                    Зарегистрироваться
                </Button>
            </div>
            <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы? <Link to='/login'>Войти</Link>
            </p>
        </div>
    );
}