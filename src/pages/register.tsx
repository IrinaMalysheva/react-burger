import { FC, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from '../services/hooks';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from "../services/actions/authRegister";
import { TLocation } from "../utils/types";

export const RegisterPage: FC = () => {
    const dispatch = useDispatch();
    const { state } = useLocation<TLocation>();
    const { isLoggedIn, isRegistered, registerFailed } = useSelector(store => store.authRegister);

    const [nameValue, setNameValue] = useState('');
    const inputNameRef = useRef(null);
    const [emailValue, setEmailValue] = useState('');
    const inputEmailRef = useRef(null);
    const [passwordValue, setPasswordValue] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (isRegistered) {
            setIsDisabled(true);
        }
    }, [isRegistered]);

    if (isLoggedIn) {
        return <Redirect to={ state?.from || '/login' } />;
    }

    const handleRegister = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(register(nameValue, emailValue, passwordValue));
        setIsDisabled(true);
    };

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value);
        setIsDisabled(false);
    };

    return (
        <div className="autorizeBox">
            <p className="text text_type_main-medium pb-6">
                Регистрация
            </p>
            <form onSubmit={handleRegister}>
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
                        onChange={onEmailChange}
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
                    <Button type="primary" size="medium" disabled={isDisabled}>
                        Зарегистрироваться
                    </Button>
                </div>
            </form>
            {registerFailed &&
                <p className="text text_type_main-default text_color_inactive pb-8">
                    Возможно, пользователь с таким E-mail уже существует. Попробуйте <Link to='/login'>Войти</Link> или использовать другой E-mail для регистрации
                </p>
            }
            <p className="text text_type_main-default text_color_inactive">
                Уже зарегистрированы? <Link to='/login'>Войти</Link>
            </p>
        </div>
    );
}