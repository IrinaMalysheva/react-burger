import { useContext, useReducer, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BurgerDataContext, OrderIngredientsContext, TotalPriceContext } from '../../utils/burgerDataContext';
import burgerConstructorStyles from './burger-constructor.module.css';
import ConstructorInner from '../constructor-inner/constructor-inner';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OPEN_MODAL, OPEN_ORDER_MODAL } from '../../services/actions';

function BurgerConstructor(props) {
    const data = useContext(BurgerDataContext);
    const dispatch = useDispatch();
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

    const handleClick = (e) => {
        dispatch({ type: OPEN_MODAL });
        dispatch({ type: OPEN_ORDER_MODAL });
    }

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
                <Button type="primary" size="large" onClick={handleClick}>
                    Оформить заказ
                </Button>
            </div>
        </main>
    )
};

export default BurgerConstructor;