import React from 'react';
import PropTypes from 'prop-types';
import { menuItemPropTypes } from '../../utils/constants';
import burgerConstructorStyles from './burger-constructor.module.css';
import ConstructorInner from '../constructor-inner/constructor-inner';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor(props) {
    let bunTopBottom = props.data.find((item) => {
        return (item.type == "bun");
    })
    return (
        <main className="pt-25 pb-13 pl-4">
            <section className="ml-8">
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={bunTopBottom.name}
                    price={bunTopBottom.price}
                    thumbnail={bunTopBottom.image_mobile}
                />
            </section>
            <ConstructorInner data={props.data} />
            <section className="ml-8">
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={bunTopBottom.name}
                    price={bunTopBottom.price}
                    thumbnail={bunTopBottom.image_mobile}
                />
            </section>
            <div className={`mt-10 ${burgerConstructorStyles.finalPart}`}>
                <p className={`mr-10`}>
                    <span className={`text text_type_digits-medium ${burgerConstructorStyles.pricePart}`}>610</span>
                    <CurrencyIcon type="primary" />
                </p>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </main>
    )
};

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(menuItemPropTypes).isRequired
}

export default BurgerConstructor;