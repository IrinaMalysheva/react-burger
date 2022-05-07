import { FC } from "react";
import { useEffect, useRef } from 'react';
import { useDispatch } from '../../services/hooks';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import ingredientsSectionStyles from './ingredients-section.module.css';
import { setTabOffsettopAction } from '../../services/actions/generalBurgers';
import { TIngredient, TIngredientsSection } from '../../utils/types';

const IngredientsSection: FC<TIngredientsSection> = ({ data, header, ingredientsType, tabName }) => {
    let minOffsetTop = 0;
    const dispatch = useDispatch();
    const sectionElement = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        let tabName = sectionElement?.current?.getAttribute("data-tabname") as string;
        if (tabName === "one") {
            minOffsetTop = sectionElement?.current?.offsetTop as number;
        }
        let sectionElementOffsetTop = sectionElement?.current?.offsetTop as number;
        dispatch(setTabOffsettopAction({[tabName]: sectionElementOffsetTop - minOffsetTop}));
    }, []);

    return (
        <section className={`mt-10 mb-10 ${ingredientsSectionStyles.secContainer}`}>
            <h2 className={`pb-6 text text_type_main-medium ${ingredientsSectionStyles.header}`} data-tabname={tabName} ref={sectionElement}>
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