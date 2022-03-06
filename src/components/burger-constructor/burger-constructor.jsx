import React, { useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { menuItemPropTypes } from '../../utils/constants';
import { BurgerDataContext, OrderIngredientsContext, TotalPriceContext } from '../../utils/burgerDataContext';
import burgerConstructorStyles from './burger-constructor.module.css';
import ConstructorInner from '../constructor-inner/constructor-inner';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor(props) {
    const data = useContext(BurgerDataContext);
    const { ingredients, setIngredients } = useContext(OrderIngredientsContext);
    const initialTotalPrice = { totalPrice: 0 };
    const [totalPrice, totalPriceDispatch] = useReducer(reducer, initialTotalPrice);

    const bunTopBottom = data.find((item) => {
        return (item.type === "bun");
    })

    function reducer(state, action) {
        switch (action.type) {
            case "add":
                return { totalPrice: state.totalPrice + action.reducerPrice };
            case "remove":
                return { totalPrice: state.totalPrice - action.reducerPrice };
            default:
                throw new Error(`Wrong type of action: ${action.type}`);
        }
    }

    useEffect(() => {
        setIngredients(prevState => ({ "ingredients": [...prevState.ingredients, bunTopBottom._id]}));
        totalPriceDispatch({ type: 'add', reducerPrice: bunTopBottom.price * 2 });
    }, []);

    return (
        <main className="pt-25 pb-13 pl-4">
            <section className="ml-8" >
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bunTopBottom.name} (верх)`}
                    price={bunTopBottom.price}
                    thumbnail={bunTopBottom.image_mobile}
                />
            </section>
            <TotalPriceContext.Provider value={totalPriceDispatch}>
                <ConstructorInner data={data} totalPriceDispatch={totalPriceDispatch} />
            </TotalPriceContext.Provider>
            <section className="ml-8">
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bunTopBottom.name} (низ)`}
                    price={bunTopBottom.price}
                    thumbnail={bunTopBottom.image_mobile}
                />
            </section>
            <div className={`mt-10 ${burgerConstructorStyles.finalPart}`}>
                <p className={`mr-10`}>
                    <span className={`text text_type_digits-medium ${burgerConstructorStyles.pricePart}`}>{totalPrice.totalPrice}</span>
                    <CurrencyIcon type="primary" />
                </p>
                <Button type="primary" size="large" onClick={props.orderHandler}>
                    Оформить заказ
                </Button>
            </div>
        </main>
    )
};

BurgerConstructor.propTypes = {
    orderHandler: PropTypes.func.isRequired
}

export default BurgerConstructor;