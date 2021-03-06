import { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from '../../services/hooks';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsSection from '../ingredients-section/ingredients-section';
import ScrollableSection from '../scrollable-section/scrollable-section';

const BurgerIngredients: FC = () => {
    const [current, setCurrent] = useState('one');
    const divElement = useRef<HTMLDivElement>(null);
    const { dataIngredientsList, tabName } = useSelector(store => store.generalBurgers);

    const tabHeadersOffset = (divElement.current?.offsetTop as number) + (divElement.current?.offsetHeight as number);

    useEffect(() => {
        setCurrent(tabName);
    }, [tabName]);
    
    return (
        <main className="mr-10" >
            <h2 className={`pt-10 pb-5 text text_type_main-large ${burgerIngredientsStyles.tabHeader}`}>
                Соберите бургер
            </h2>
            <div className={burgerIngredientsStyles.tabsWrapper} ref={divElement}>
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
                <IngredientsSection data={dataIngredientsList} header="Булки" ingredientsType="bun" tabName="one" tabHeadersOffset={tabHeadersOffset} />
                <IngredientsSection data={dataIngredientsList} header="Соусы" ingredientsType="sauce" tabName="two" tabHeadersOffset={tabHeadersOffset} />
                <IngredientsSection data={dataIngredientsList} header="Начинки" ingredientsType="main" tabName="three" tabHeadersOffset={tabHeadersOffset} />
            </ScrollableSection>
        </main>
    )
};

export default BurgerIngredients;