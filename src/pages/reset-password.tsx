import { FC, SyntheticEvent, useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../services/hooks';
import { Link, useLocation, useHistory, Redirect } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from "../services/actions/authRegister";
import { THistory, TLocation } from "../utils/types";

export const ResetPasswordPage: FC = () => {
    const dispatch = useDispatch();
    const { state } = useLocation<TLocation>();
    const history = useHistory<THistory>();
    const { isLoggedIn, isPasswordReseted } = useSelector(store => store.authRegister);
    const prevPathname = history.location.state?.prevPathname;

    const [passwordValue, setPasswordValue] = useState('');
    const inputPasswordRef = useRef(null);
    const [mailCodeValue, setMailCodeValue] = useState('');
    const inputMailCodeRef = useRef(null);

    const [inputType, setInputType] = useState<'password' | 'text' | 'email'>('password');
    const [iconType, setIconType] = useState<'ShowIcon' | 'HideIcon'>('ShowIcon');
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

    const handleResetPassword = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(resetPassword(passwordValue, mailCodeValue));
    };

    return (
        <div className="autorizeBox">
            <p className="text text_type_main-medium pb-6">
                ???????????????????????????? ????????????
            </p>
            <form onSubmit={handleResetPassword}>
                <div className="inputWrapper">
                    <Input
                        type={inputType}
                        placeholder={'?????????????? ?????????? ????????????'}
                        onChange={e => setPasswordValue(e.target.value)}
                        icon={iconType}
                        value={passwordValue}
                        name={'password'}
                        error={false}
                        ref={inputPasswordRef}
                        onIconClick={onPasswordIconClick}
                        errorText={'????????????'}
                    />
                </div>
                <div className="inputWrapper">
                    <Input
                        type={'text'}
                        placeholder={'?????????????? ?????? ???? ????????????'}
                        onChange={e => setMailCodeValue(e.target.value)}
                        value={mailCodeValue}
                        name={'mailCode'}
                        error={false}
                        ref={inputMailCodeRef}
                        errorText={'????????????'}
                    />
                </div>
                {isPasswordReseted && <p className="text text_type_main-default mt-8 mb-20">
                    ???????????? ?????????????? ??????????????. ???? ???????????? ???????????????????????????? ???? ???????????????? ??????????
                    </p>}
                <div className="pb-20">
                    <Button type="primary" size="medium">
                        ??????????????????
                    </Button>
                </div>
            </form>
            <p className="text text_type_main-default text_color_inactive">
                ?????????????????? ????????????? <Link to='/login'>??????????</Link>
            </p>
        </div>
    );
}