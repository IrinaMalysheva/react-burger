import React from 'react';
import appStyles from './app-header.module.css';
import { Icons, BurgerIcon, ListIcon, ProfileIcon, Logo, Typography } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader(props) {
    return (
        <header className={`ml-5 mr-4 mt-4 ${appStyles.header}`}>
            <nav className={appStyles.nav}>
                <div className={appStyles.leftNav}>
                    <a className={`mb-4 mt-4 mr-2 pl-5 pr-5 pb-4 pt-4 text text_type_main-default ${appStyles.headerLink} ${appStyles.active}`} href="">
                        <span className={`mr-2 text_type_main-default ${appStyles.iconWrapper}`}><BurgerIcon type="primary" /></span>
                        <span className=''>Конструктор</span>
                    </a>
                    <a className={`mb-4 mt-4 pl-5 pr-5 pb-4 pt-4 text text_type_main-default ${appStyles.headerLink} ${appStyles.inactive}`} href="">
                        <span className={`mr-2 text_type_main-default ${appStyles.iconWrapper}`}><ListIcon type="secondary" /></span>
                        <span className=''>Лента заказов</span>
                    </a>
                </div>
                <a className={appStyles.headerLink} href=""><Logo /></a>
                <a className={`mb-4 mt-4 pl-5 pr-5 pb-4 pt-4 text text_type_main-default ${appStyles.headerLink} ${appStyles.inactive}`} href="">
                    <span className={`mr-2 text_type_main-default ${appStyles.iconWrapper}`}><ProfileIcon type="secondary" /></span>
                    <span className=''>Личный кабинет</span>
                </a>
            </nav>
        </header>
    )
};

export default AppHeader;