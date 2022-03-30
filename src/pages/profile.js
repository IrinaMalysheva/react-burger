import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import profileStyles from './profile.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

export function ProfilePasswordPage() {
    const [nameValue, setNameValue] = useState('Марк');
    const inputNameRef = useRef(null);
    const [emailValue, setEmailValue] = useState('mail@stellar.burgers');
    const inputEmailRef = useRef(null);
    const [passwordValue, setPasswordValue] = useState('111111');
    const inputPasswordRef = useRef(null);

    const onNameIconClick = () => {
        setTimeout(() => inputNameRef.current.focus(), 0);
    }

    const onEmailIconClick = () => {
        setTimeout(() => inputEmailRef.current.focus(), 0);
    }

    const onPasswordIconClick = () => {
        setTimeout(() => inputPasswordRef.current.focus(), 0);
    }

    return (
        <div className={profileStyles.profileContainer}>
            <div className={`${profileStyles.sideMenu} mr-15`}>
                <div className={profileStyles.sideMenuItem}>
                    <Link to='/profile' className={`text text_type_main-medium ${profileStyles.sideMenuLink} ${profileStyles.activeLink}`}>
                        Профиль
                    </Link>
                </div>
                <div className={profileStyles.sideMenuItem}>
                    <Link to='/order-history' className={`text text_type_main-medium text_color_inactive ${profileStyles.sideMenuLink}`}>
                        История заказов
                    </Link>
                </div>
                <div className={profileStyles.sideMenuItem}>
                    <Link to='/logout' className={`text text_type_main-medium text_color_inactive ${profileStyles.sideMenuLink}`}>
                        Выход
                    </Link>
                </div>
                <p className="text text_type_main-default text_color_inactive pt-20">
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <div className={profileStyles.profileBox}>
                <div className="inputWrapper">
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setNameValue(e.target.value)}
                        icon={'EditIcon'}
                        value={nameValue}
                        name={'name'}
                        error={false}
                        ref={inputNameRef}
                        onIconClick={onNameIconClick}
                        errorText={'Ошибка'}
                    />
                </div>
                <div className="inputWrapper">
                    <Input
                        type={'email'}
                        placeholder={'Логин'}
                        onChange={e => setEmailValue(e.target.value)}
                        icon={'EditIcon'}
                        value={emailValue}
                        name={'email'}
                        error={false}
                        ref={inputEmailRef}
                        onIconClick={onEmailIconClick}
                        errorText={'Ошибка'}
                    />
                </div>
                <div className="inputWrapper">
                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        onChange={e => setPasswordValue(e.target.value)}
                        icon={'EditIcon'}
                        value={passwordValue}
                        name={'password'}
                        error={false}
                        ref={inputPasswordRef}
                        onIconClick={onPasswordIconClick}
                        errorText={'Ошибка'}
                    />
                </div>
            </div>
        </div>
    );
}