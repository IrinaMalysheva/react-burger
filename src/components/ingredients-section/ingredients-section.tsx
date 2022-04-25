import { FC } from "react";
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import ingredientsSectionStyles from './ingredients-section.module.css';
import { SET_TAB_OFFSETTOP } from '../../services/actions';
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
        dispatch({
            type: SET_TAB_OFFSETTOP,
            data: {[tabName]: sectionElementOffsetTop - minOffsetTop}
        });
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