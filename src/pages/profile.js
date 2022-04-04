import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, Redirect } from 'react-router-dom';
import profileStyles from './profile.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { logout, updateUser } from "../services/actions/authRegister";

export function ProfilePage() {
    const dispatch = useDispatch();
    const { isLoggedOut, userData } = useSelector((store) => store.authRegister);
    const [profileValues, setProfileValues] = useState({ 
        name: userData ? userData.name : "",
        email: userData ? userData?.email : "",
        password: ""
    });
    const inputNameRef = useRef(null);
    const inputEmailRef = useRef(null);
    const inputPasswordRef = useRef(null);

    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        setIsChanged(
            profileValues?.name !== userData?.name || profileValues?.email !== userData?.email || profileValues?.password !== userData?.password
        );
    }, [userData, profileValues]);

    if (isLoggedOut) {
        return <Redirect to="/login" />;
    }

    const handleChange = (e) => {
        setProfileValues({ ...profileValues, [e.target.name]: e.target.value });
    };

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(profileValues.email, profileValues.name, profileValues.password));
    };

    const onCancel = (e) => {
        e.preventDefault();
        setProfileValues({ name: "", email: "", password: ""});
    };

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
                    <NavLink to='/profile' className={`text text_type_main-medium ${profileStyles.sideMenuLink} ${profileStyles.activeLink}`}>
                        Профиль
                    </NavLink>
                </div>
                <div className={profileStyles.sideMenuItem}>
                    <NavLink to='/order-history' className={`text text_type_main-medium text_color_inactive ${profileStyles.sideMenuLink}`}>
                        История заказов
                    </NavLink>
                </div>
                <div className={profileStyles.sideMenuItem}>
                    <Link to="/profile" onClick={handleLogout} className={`text text_type_main-medium text_color_inactive ${profileStyles.sideMenuLink}`}>
                        Выход
                    </Link>
                </div>
                <p className="text text_type_main-default text_color_inactive pt-20">
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <form onSubmit={handleSubmit} className={profileStyles.profileBox}>
                <div className="inputWrapper">
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={handleChange}
                        icon={'EditIcon'}
                        value={profileValues.name}
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
                        onChange={handleChange}
                        icon={'EditIcon'}
                        value={profileValues.email}
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
                        onChange={handleChange}
                        icon={'EditIcon'}
                        value={profileValues.password}
                        name={'password'}
                        error={false}
                        ref={inputPasswordRef}
                        onIconClick={onPasswordIconClick}
                        errorText={'Ошибка'}
                    />
                </div>
                {isChanged && (
                    <div className="mt-8">
                        <Button
                            type="secondary"
                            size="medium"
                            onClick={onCancel}
                        >
                            Отмена
                        </Button>
                        <Button type="primary" size="medium">
                            Сохранить
                        </Button>
                    </div>
                )}
            </form>
        </div>
    );
}