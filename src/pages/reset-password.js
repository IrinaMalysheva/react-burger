import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

export function ResetPasswordPage() {
    const [passwordValue, setPasswordValue] = useState('');
    const [mailCodeValue, setMailCodeValue] = useState('');
    const inputMailCodeRef = useRef(null);

    return (
        <div className="autorizeBox">
            <p className="text text_type_main-medium pb-6">
                Восстановление пароля
            </p>
            <div className="inputWrapper">
                <PasswordInput
                    onChange={e => setPasswordValue(e.target.value)}
                    value={passwordValue}
                    name={'password'}
                />
            </div>
            <div className="inputWrapper">
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setMailCodeValue(e.target.value)}
                    value={mailCodeValue}
                    name={'mailCode'}
                    error={false}
                    ref={inputMailCodeRef}
                    errorText={'Ошибка'}
                />
            </div>
            <div className="pb-20">
                <Button type="primary" size="medium">
                    Сохранить
                </Button>
            </div>
            <p className="text text_type_main-default text_color_inactive">
                Вспомнили пароль? <Link to='/login'>Войти</Link>
            </p>
        </div>
    );
}