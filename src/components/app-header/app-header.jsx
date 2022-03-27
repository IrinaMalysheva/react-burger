import { Link } from 'react-router-dom';
import appHeaderStyles from './app-header.module.css';
import { BurgerIcon, ListIcon, ProfileIcon, Logo, Typography } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
    return (
        <header className={appHeaderStyles.header}>
            <nav className={appHeaderStyles.nav}>
                <div className={appHeaderStyles.innerNav}>
                    <a className={`mb-4 mt-4 mr-2 pl-5 pr-5 pb-4 pt-4 text text_type_main-default ${appHeaderStyles.headerLink} ${appHeaderStyles.active}`} href="">
                        <span className={`mr-2 text_type_main-default ${appHeaderStyles.iconWrapper}`}><BurgerIcon type="primary" /></span>
                        <span className=''>Конструктор</span>
                    </a>
                    <a className={`mb-4 mt-4 pl-5 pr-5 pb-4 pt-4 text text_type_main-default ${appHeaderStyles.headerLink} ${appHeaderStyles.inactive}`} href="">
                        <span className={`mr-2 text_type_main-default ${appHeaderStyles.iconWrapper}`}><ListIcon type="secondary" /></span>
                        <span className=''>Лента заказов</span>
                    </a>
                </div>
                <Link className={appHeaderStyles.headerLink} to='/'><Logo /></Link>
                <div className={`${appHeaderStyles.innerNav} ${appHeaderStyles.alignedRight}`}>
                    <a className={`mb-4 mt-4 pl-5 pr-5 pb-4 pt-4 text text_type_main-default ${appHeaderStyles.headerLink} ${appHeaderStyles.inactive}`} href="">
                        <span className={`mr-2 text_type_main-default ${appHeaderStyles.iconWrapper}`}><ProfileIcon type="secondary" /></span>
                        <span className=''>Личный кабинет</span>
                    </a>
                </div>
            </nav>
        </header>
    )
};

export default AppHeader;