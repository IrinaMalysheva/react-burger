import { FC, SyntheticEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import profileStyles from './profile.module.css';
import OrdersList from "../../components/orders-list/orders-list";
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUser } from "../../services/actions/authRegister";
import ProfileSideMenu from "../../components/profile-side-menu/profile-side-menu";
import ScrollableSection from '../../components/scrollable-section/scrollable-section';
import { getUser } from "../../services/actions/authRegister";
import { TUserData } from '../../utils/types';

export const ProfilePage: FC = () => {
    const dispatch = useDispatch();
    const { path } = useRouteMatch();
    const { isLoggedIn, userData } = useSelector(store => store.authRegister);
    const [profileValues, setProfileValues] = useState<TUserData>({
        name: "",
        email: "",
        password: ""
    });
    const inputNameRef = useRef<HTMLInputElement>(null);
    const inputEmailRef = useRef<HTMLInputElement>(null);
    const inputPasswordRef = useRef<HTMLInputElement>(null);

    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        setIsChanged(
            profileValues?.name !== userData?.name || profileValues?.email !== userData?.email || profileValues?.password !== userData?.password
        );
    }, [userData, profileValues]);

    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfileValues({ ...profileValues, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(updateUser(profileValues.email, profileValues.name, profileValues.password));
    };

    const onCancel = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(getUser());
        setProfileValues({ ...userData, password: "" });
    };

    const onNameIconClick = () => {
        setTimeout(() => inputNameRef?.current?.focus(), 0);
    }

    const onEmailIconClick = () => {
        setTimeout(() => inputEmailRef?.current?.focus(), 0);
    }

    const onPasswordIconClick = () => {
        setTimeout(() => inputPasswordRef?.current?.focus(), 0);
    }

    return (
        <div className={profileStyles.profileContainer}>
            <ProfileSideMenu />
            <Switch>
                <Route path={`${path}`} exact={true}>
                    <form onSubmit={handleSubmit} className={profileStyles.profileBox}>
                        <div className="inputWrapper">
                            <Input
                                type={'text'}
                                placeholder={'Имя'}
                                onChange={handleChange}
                                icon={'EditIcon'}
                                value={`${profileValues.name}`}
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
                                value={`${profileValues.email}`}
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
                                value={`${profileValues.password}`}
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
                </Route>
                <Route path={`${path}/orders`} exact={true}>
                    <ScrollableSection parentClassName={profileStyles.scrollContainerStyles}>
                        <OrdersList />
                    </ScrollableSection>
                </Route>
            </Switch>
        </div>
    );
}