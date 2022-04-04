import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useHistory, Redirect } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from "../services/actions/authRegister";

export function ResetPasswordPage() {
    const dispatch = useDispatch();
    const { state } = useLocation();
    const history = useHistory();
    const { isLoggedIn, isPasswordReseted } = useSelector(state => state.authRegister);
    const prevPathname = history.location.state?.prevPathname;

    const [passwordValue, setPasswordValue] = useState('');
    const inputPasswordRef = useRef(null);
    const [mailCodeValue, setMailCodeValue] = useState('');
    const inputMailCodeRef = useRef(null);

    const [inputType, setInputType] = useState('password');
    const [iconType, setIconType] = useState('ShowIcon');
    const onPasswordIconClick = () => {
        setInputType(inputType == 'password' ? 'text' : 'password');
        setIconType(iconType == 'ShowIcon' ? 'HideIcon' : 'ShowIcon');
        //setTimeout(() => inputPasswordRef.current.focus(), 0);
    }

    useEffect(() => {
        if (isPasswordReseted) {
            window.setTimeout(() => {
                history.push({ pathname: '/login' });
            }, 3000)
        }
    }, [isPasswordReseted]);

    if (isLoggedIn) {
        return <Redirect to={state?.from || '/'} />;
    }

    if (!prevPathname) {
        return (
            <Redirect to={'/forgot-password'} />
        );
    }

    const handleResetPassword = () => {
        dispatch(resetPassword(passwordValue, mailCodeValue));
    };

    return (
        <div className="autorizeBox">
            <p className="text text_type_main-medium pb-6">
                Восстановление пароля
            </p>
            <div className="inputWrapper">
                <Input
                    type={inputType}
                    placeholder={'Введите новый пароль'}
                    onChange={e => setPasswordValue(e.target.value)}
                    icon={iconType}
                    value={passwordValue}
                    name={'password'}
                    error={false}
                    ref={inputPasswordRef}
                    onIconClick={onPasswordIconClick}
                    errorText={'Ошибка'}
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
            {isPasswordReseted && <p className="text text_type_main-default mt-4 mb-10">Пароль успешно изменён</p>}
            <div className="pb-20">
                <Button type="primary" size="medium" onClick={handleResetPassword}>
                    Сохранить
                </Button>
            </div>
            <p className="text text_type_main-default text_color_inactive">
                Вспомнили пароль? <Link to='/login'>Войти</Link>
            </p>
        </div>
    );
}