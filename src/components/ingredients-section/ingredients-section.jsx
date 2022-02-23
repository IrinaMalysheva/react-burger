import React from 'react';
import ingredientsSectionStyles from './ingredients-section.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientsSection(props) {
    return (
        <section className="mt-10 mb-10">
            <h2 className={`pb-6 text text_type_main-medium ${ingredientsSectionStyles.header}`}>
                {props.header}
            </h2>
            <ul className={`pl-4 ${ingredientsSectionStyles.secContainer}`}>
                {
                    props.data.map((item) => {
                        return (item.type == props.ingredientsType) &&
                            <li className={`mb-8 ${ingredientsSectionStyles.ingredient}`} key={item._id}>
                                <img className="pl-4 pr-4" src={item.image} />
                                <p className="pt-1 pb-1 flexContainerJcCenter">
                                    <span className={`pr-1 ${ingredientsSectionStyles.price}`}>{item.price}</span>
                                    <CurrencyIcon type="primary" />
                                </p>
                                <p className={`text text_type_main-default ${ingredientsSectionStyles.ingredientsName}`}>
                                    {item.name}
                                </p>
                            </li>
                    })
                }
            </ul>
        </section>
    )
};

export default IngredientsSection;