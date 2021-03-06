import { FC, SyntheticEvent, useState } from 'react';
import { useSelector, useDispatch } from '../services/hooks';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPassword } from "../services/actions/authRegister";
import { TLocation } from "../utils/types";

export const ForgotPasswordPage: FC = () => {
    const dispatch = useDispatch();
    const { state } = useLocation<TLocation>();
    const history = useHistory();

    const isLoggedIn = useSelector(store => store.authRegister.isLoggedIn);
    const [emailValue, setEmailValue] = useState('');

    if (isLoggedIn) {
        return <Redirect to={ state?.from || '/' } />;
    }

    const handleForgotPassword = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(forgotPassword(emailValue));
        history.push({ pathname: '/reset-password', state: { prevPathname: history.location.pathname } });
    };

    return (
        <div className="autorizeBox">
            <p className="text text_type_main-medium pb-6">
                Восстановление пароля
            </p>
            <form onSubmit={handleForgotPassword}>
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
                    <Button type="primary" size="medium">
                        Восстановить
                    </Button>
                </div>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль? <Link to='/login'>Войти</Link>
                </p>
            </form>
        </div>
    );
}