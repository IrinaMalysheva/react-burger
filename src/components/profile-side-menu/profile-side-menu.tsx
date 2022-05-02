import { FC, SyntheticEvent } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from '../../services/hooks';
import profileSideMenuStyles from './profile-side-menu.module.css';
import { logout } from "../../services/actions/authRegister";

const ProfileSideMenu: FC = () => {
    const dispatch = useDispatch();

    const handleLogout = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <div className={`${profileSideMenuStyles.sideMenu} mr-15`}>
            <div className={profileSideMenuStyles.sideMenuItem}>
                <NavLink to='/profile'
                    className={`text text_type_main-medium text_color_inactive ${profileSideMenuStyles.sideMenuLink}`}
                    activeClassName={profileSideMenuStyles.activeLink}
                >
                    Профиль
                </NavLink>
            </div>
            <div className={profileSideMenuStyles.sideMenuItem}>
                <NavLink to='/order-history'
                    className={`text text_type_main-medium text_color_inactive ${profileSideMenuStyles.sideMenuLink}`}
                    activeClassName={profileSideMenuStyles.activeLink}
                >
                    История заказов
                </NavLink>
            </div>
            <div className={profileSideMenuStyles.sideMenuItem}>
                <Link to="/profile" onClick={handleLogout}
                    className={`text text_type_main-medium text_color_inactive ${profileSideMenuStyles.sideMenuLink}`}
                >
                    Выход
                </Link>
            </div>
            <p className="text text_type_main-default text_color_inactive pt-20">
                В этом разделе вы можете изменить свои персональные данные
            </p>
        </div>
    )
};

export default ProfileSideMenu;