import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import burgerConstructorStyles from './burger-constructor.module.css';
import ConstructorInner from '../constructor-inner/constructor-inner';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OPEN_MODAL, OPEN_ORDER_MODAL } from '../../services/actions';
import {
    addBun,
    addIngredient,
    removeIngredient,
} from "../../services/actions";

function BurgerConstructor() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isLoggedIn } = useSelector(store => store.authRegister);
    const { constructorBun, constructorFillingIngredients, orderRequest } = useSelector(state => state.ingredientsOrder);

    const totalPrice = useMemo(() => {
        let interimPrice = constructorBun ? constructorBun.price * 2 : 0;
        return (constructorFillingIngredients)
            ? constructorFillingIngredients?.reduce((sum, item) => sum + item.price, interimPrice)
            : interimPrice
    }, [constructorBun, constructorFillingIngredients] );

    const handleClick = (e) => {
        if (!isLoggedIn) {
            history.push({ pathname: '/login', state: { prevPathname: history.location.pathname } });
            return;
        }
        dispatch({ type: OPEN_MODAL });
        dispatch({ type: OPEN_ORDER_MODAL });
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop: (ingredient) => {
            handleDrop(ingredient);
        },
    });

    const handleDrop = (item) => {
        const uuid = uuidv4();
        if (item.type === "bun") {
            dispatch(addBun(item, uuid));
        } else {
            dispatch(addIngredient(item, uuid));
        }
    };

    const handleRemove = (uuid) => {
        dispatch(removeIngredient(uuid));
    };

    const isDisabled = !constructorBun || !constructorFillingIngredients?.length || orderRequest;

    return (
        <main className="pt-25 pb-13 pl-4">
            <div className={`${burgerConstructorStyles.constructorTarget} ${!constructorBun && !constructorFillingIngredients.length && burgerConstructorStyles.constructorBordered}`} ref={dropTarget}>
                {constructorBun &&
                    <section className="ml-8" >
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${constructorBun.name} (верх)`}
                            price={constructorBun.price}
                            thumbnail={constructorBun.image_mobile}
                        />
                    </section>
                }
                {constructorFillingIngredients &&
                    <ConstructorInner data={constructorFillingIngredients} onDelete={handleRemove} />
                }
                {constructorBun &&
                    <section className="ml-8">
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${constructorBun.name} (низ)`}
                            price={constructorBun.price}
                            thumbnail={constructorBun.image_mobile}
                        />
                    </section>
                }
            </div>
            <div className={`mt-10 ${burgerConstructorStyles.finalPart}`}>
                <p className={`mr-10`}>
                    <span className={`text text_type_digits-medium ${burgerConstructorStyles.pricePart}`}>{totalPrice}</span>
                    <CurrencyIcon type="primary" />
                </p>
                <Button type="primary" size="large" onClick={handleClick} disabled={isDisabled}>
                    Оформить заказ
                </Button>
            </div>
        </main>
    )
};

export default BurgerConstructor;