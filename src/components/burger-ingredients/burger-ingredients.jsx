import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsSection from '../ingredients-section/ingredients-section';
import ScrollableSection from '../scrollable-section/scrollable-section';

function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState('one');

    return (
        <main className={props.className}>
            <h2 className={`pt-10 pb-5 text text_type_main-large ${burgerIngredientsStyles.header}`}>
                Соберите бургер
            </h2>
            <div style={{ display: 'flex' }}>
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
            <ScrollableSection className={burgerIngredientsStyles.scrollSection}>
                <IngredientsSection data={props.data} header="Булки" ingredientsType={"bun"} />
                <IngredientsSection data={props.data} header="Соусы" ingredientsType={"sauce"} />
                <IngredientsSection data={props.data} header="Начинки" ingredientsType={"main"} />
            </ScrollableSection>
        </main>
    )
};

export default BurgerIngredients;