import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsSection from '../ingredients-section/ingredients-section';
import ScrollableSection from '../scrollable-section/scrollable-section';
import { getDataIngredientsList } from '../../services/actions';
import { API_URL } from '../../utils/constants';

function BurgerIngredients(props) {
    const [current, setCurrent] = useState('one');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDataIngredientsList(API_URL));
    }, [dispatch]);

    const dataIngredientsList = useSelector(state => state.ingredientsOrder.dataIngredientsList);

    return (
        <main className="mr-10" >
            <h2 className={`pt-10 pb-5 text text_type_main-large ${burgerIngredientsStyles.header}`}>
                Соберите бургер
            </h2>
            <div className={burgerIngredientsStyles.tabsWrapper}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <ScrollableSection parentClassName={burgerIngredientsStyles.scrollContainerStyles}>
                <IngredientsSection data={dataIngredientsList} header="Булки" ingredientsType="bun" clickHandler={props.clickHandler} />
                <IngredientsSection data={dataIngredientsList} header="Соусы" ingredientsType="sauce" clickHandler={props.clickHandler} />
                <IngredientsSection data={dataIngredientsList} header="Начинки" ingredientsType="main" clickHandler={props.clickHandler} />
            </ScrollableSection>
        </main>
    )
};

BurgerIngredients.propTypes = {
    clickHandler: PropTypes.func.isRequired
}

export default BurgerIngredients;