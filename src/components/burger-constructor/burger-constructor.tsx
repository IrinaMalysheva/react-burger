import { FC, SyntheticEvent } from 'react';
import { useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import { useHistory } from 'react-router-dom';
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import burgerConstructorStyles from './burger-constructor.module.css';
import ConstructorInner from '../constructor-inner/constructor-inner';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { openModal, openOrderModal } from '../../services/actions/generalBurgers';
import {
    addBun,
    addIngredient,
    removeIngredient,
} from "../../services/actions/generalBurgers";
import { TIngredient } from '../../utils/types';

const BurgerConstructor: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isLoggedIn } = useSelector(store => store.authRegister);
    const { constructorBun, constructorFillingIngredients, orderRequest } = useSelector(store => store.generalBurgers);

    const totalPrice = useMemo(() => {
        let interimPrice = constructorBun ? constructorBun.price * 2 : 0;
        return (constructorFillingIngredients)
            ? constructorFillingIngredients?.reduce((sum: number, item: TIngredient) => sum + item.price, interimPrice)
            : interimPrice
    }, [constructorBun, constructorFillingIngredients] );

    const handleClick = (e: SyntheticEvent) => {
        if (!isLoggedIn) {
            history.push({ pathname: '/login', state: { prevPathname: history.location.pathname } });
            return;
        }
        dispatch(openModal());
        dispatch(openOrderModal());
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop: (ingredient: TIngredient) => {
            handleDrop(ingredient);
        },
    });

    const handleDrop = (item: TIngredient) => {
        const uuid = uuidv4();
        if (item.type === "bun") {
            dispatch(addBun(item, uuid));
        } else {
            dispatch(addIngredient(item, uuid));
        }
    };

    const handleRemove = (uuid: string) => {
        dispatch(removeIngredient(uuid));
    };

    const isDisabled = !constructorBun || !constructorFillingIngredients?.length || orderRequest;

    return (
        <main className="pt-25 pb-13 pl-4">
            <div className={`${burgerConstructorStyles.constructorTarget} ${!constructorBun && !constructorFillingIngredients.length && burgerConstructorStyles.constructorBordered}`}
                ref={dropTarget}
                data-test="constructor_target"
            >
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