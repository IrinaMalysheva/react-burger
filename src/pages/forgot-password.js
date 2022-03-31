import { useRef, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { checkResponse } from '../utils/utils';

export function ForgotPasswordPage() {
    const [emailValue, setEmailValue] = useState('');
    const inputEmailRef = useRef(null);
    const [isPasswordReseted, setIsPasswordReseted] = useState(false);

    const resetPassword = () => {
        fetch("https://norma.nomoreparties.space/api/password-reset", {
            method: 'POST',
            body: JSON.stringify({
                "email": emailValue
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(checkResponse)
            .then(jsonResp => {
                console.log(jsonResp);
                setIsPasswordReseted(jsonResp.success);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    return (
        (isPasswordReseted ?
            <Redirect to="/reset-password" />
            :
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
                    <Button type="primary" size="medium" onClick={resetPassword}>
                        Восстановить
                    </Button>
                </div>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль? <Link to='/login'>Войти</Link>
                </p>
            </div>
        )
    );
}