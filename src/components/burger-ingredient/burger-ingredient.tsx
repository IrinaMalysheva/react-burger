import { FC, SyntheticEvent } from 'react';
import { RootStateOrAny } from 'react-redux';
import { useSelector, useDispatch } from '../../services/hooks';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from "react-dnd";
import BurgerIngredientStyles from './burger-ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { openIngredientModal, openModal } from '../../services/actions/generalBurgers';
import { TBurgerIngredient, TIngredient } from '../../utils/types';

const BurgerIngredient: FC<TBurgerIngredient> = ({ ingredientsType, item }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const constructorBun = useSelector((store: RootStateOrAny) => store.generalBurgers.constructorBun);
    const constructorFillingIngredients = useSelector((store: RootStateOrAny) => store.generalBurgers.constructorFillingIngredients);
    let count = 0;

    const ingredientId = item['_id'];

    if (item.type === "bun") {
        count = constructorBun?._id === item._id ? 2 : 0;
    } else {
        count = constructorFillingIngredients?.filter((dataItem: TIngredient) => dataItem._id === item._id).length;
    }
    
    const handleClick = (e: SyntheticEvent) => {
        dispatch(openModal());
        dispatch(openIngredientModal());
    }

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: item,
    });

    return (
        <Link
            key={ingredientId}
            to={{
                pathname: `/ingredients/${ingredientId}`,
                state: { background: location },
            }}
            className={BurgerIngredientStyles.ingredientLink}
        >
            {
                (item.type == ingredientsType) &&
                <li className={`mb-8 ${BurgerIngredientStyles.ingredient}`} onClick={handleClick} id={item._id} ref={dragRef}>
                    {count != 0 && <Counter count={count} size="default" />}
                    <img className="pl-4 pr-4" src={item.image} />
                    <p className="pt-1 pb-1 flexContainerJcCenter">
                        <span className={`pr-1 text text_type_digits-default ${BurgerIngredientStyles.price}`}>{item.price}</span>
                        <CurrencyIcon type="primary" />
                    </p>
                    <p className={`text text_type_main-default ${BurgerIngredientStyles.ingredientsName}`}>
                        {item.name}
                    </p>
                </li>
            }
        </Link >
    )
};

export default BurgerIngredient;