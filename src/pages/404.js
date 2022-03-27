import { Link } from 'react-router-dom';

export function NotFound404() {
    return (
        <div className="autorizeBox">
            <p className="text text_type_main-large text_color_inactive pb-15">Ошибка 404</p>
            <p className="text text_type_main-default text_color_inactive pb-4">
                Страница, которую Вы запрашиваете, не существует.
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Проверьте адрес или попробуйте перейти на <Link to='/'>главную</Link>.
            </p>
        </div>
    );
}