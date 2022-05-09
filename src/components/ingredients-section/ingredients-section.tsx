import { FC } from "react";
import { useEffect, useRef } from 'react';
import { useDispatch } from '../../services/hooks';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import ingredientsSectionStyles from './ingredients-section.module.css';
import { setTabOffsettopAction } from '../../services/actions/generalBurgers';
import { TIngredient, TIngredientsSection } from '../../utils/types';

const IngredientsSection: FC<TIngredientsSection> = ({ data, header, ingredientsType, tabName, tabHeadersOffset }) => {
    const dispatch = useDispatch();
    const headerElement = useRef<HTMLHeadingElement>(null);
    const sectionElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tabName = headerElement?.current?.getAttribute("data-tabname") as string;
        const sectionElemOffsetTop = sectionElement?.current?.offsetTop as number;
        dispatch(setTabOffsettopAction({[tabName]: sectionElemOffsetTop - tabHeadersOffset}));
    }, [data]);

    return (
        <section className={`pt-10 pb-10 ${ingredientsSectionStyles.secContainer}`} ref={sectionElement}>
            <h2 className={`pb-6 text text_type_main-medium ${ingredientsSectionStyles.header}`} data-tabname={tabName} ref={headerElement}>
                {header}
            </h2>
            <ul className={`pl-4 ${ingredientsSectionStyles.ingredientsContainer}`}>
                {
                    data.map((item: TIngredient) => {
                        return <BurgerIngredient item={item} key={item._id} ingredientsType={ingredientsType} />;
                    })
                }
            </ul>
        </section>
    )
};

export default IngredientsSection;