import { FC } from "react";
import { Link, NavLink } from 'react-router-dom';
import appHeaderStyles from './app-header.module.css';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader: FC = () => {
    return (
        <header className={appHeaderStyles.header}>
            <nav className={appHeaderStyles.nav}>
                <div className={appHeaderStyles.innerNav}>
                    <NavLink
                        to="/" exact
                        className={`mb-4 mt-4 mr-2 pl-5 pr-5 pb-4 pt-4 text text_type_main-default text_color_inactive ${appHeaderStyles.headerLink}`}
                        activeClassName={appHeaderStyles.activeLink}
                    >
                        <span className={`mr-2 text_type_main-default ${appHeaderStyles.iconWrapper}`}><BurgerIcon type="secondary" /></span>
                        <span className=''>Конструктор</span>
                    </NavLink>
                    <NavLink
                        to="/feed" exact
                        className={`mb-4 mt-4 pl-5 pr-5 pb-4 pt-4 text text_type_main-default text_color_inactive ${appHeaderStyles.headerLink}`}
                        activeClassName={appHeaderStyles.activeLink}
                    >
                        <span className={`mr-2 text_type_main-default ${appHeaderStyles.iconWrapper}`}><ListIcon type="secondary" /></span>
                        <span className=''>Лента заказов</span>
                    </NavLink>
                </div>
                <Link className={appHeaderStyles.headerLink} to='/'><Logo /></Link>
                <div className={`${appHeaderStyles.innerNav} ${appHeaderStyles.alignedRight}`}>
                    <NavLink
                        to="/profile" exact
                        className={`mb-4 mt-4 pl-5 pr-5 pb-4 pt-4 text text_type_main-default text_color_inactive ${appHeaderStyles.headerLink}`}
                        activeClassName={appHeaderStyles.activeLink}
                    >
                        <span className={`mr-2 text_type_main-default ${appHeaderStyles.iconWrapper}`}><ProfileIcon type="secondary" /></span>
                        Личный кабинет
                    </NavLink>
                </div>
            </nav>
        </header>
    )
};

export default AppHeader;