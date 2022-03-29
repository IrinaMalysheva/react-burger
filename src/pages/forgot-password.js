import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

export function ForgotPasswordPage() {
    const [emailValue, setEmailValue] = useState('');
    const inputEmailRef = useRef(null);

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
                    ref={inputEmailRef}
                    errorText={'Ошибка'}
                />
            </div>
            <div className="pb-20">
                <Button type="primary" size="medium">
                    Восстановить
                </Button>
            </div>
            <p className="text text_type_main-default text_color_inactive">
                Вспомнили пароль? <Link to='/login'>Войти</Link>
            </p>
        </div>
    );
}