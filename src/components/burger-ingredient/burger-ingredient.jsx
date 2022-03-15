
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { menuItemPropTypes } from '../../utils/constants';
import BurgerIngredientStyles from './burger-ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OPEN_MODAL, OPEN_INGREDIENT_MODAL, SET_CURRENT_INGREDIENT_DETAILS } from '../../services/actions';

function BurgerIngredient({ ingredientsType, item }) {
    const dispatch = useDispatch();
    const constructorBun = useSelector(state => state.ingredientsOrder.constructorBun);
    const constructorFillingIngredients = useSelector(state => state.ingredientsOrder.constructorFillingIngredients);
    let count = 0;

    if (item.type === "bun") {
        count = constructorBun?._id === item._id ? 2 : 0;
    } else {
        count = constructorFillingIngredients?.filter((dataItem) => dataItem._id === item._id).length;
    }
    
    const handleClick = (e) => {
        let currentTargetId = e.currentTarget.id;
        dispatch({ type: OPEN_MODAL });
        dispatch({ type: OPEN_INGREDIENT_MODAL });
        dispatch({
            type: SET_CURRENT_INGREDIENT_DETAILS,
            id: currentTargetId
        });
    }

    return (
        (item.type == ingredientsType) &&
        <li className={`mb-8 ${BurgerIngredientStyles.ingredient}`} onClick={handleClick} id={item._id}>
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
    )
};

BurgerIngredient.propTypes = {
    item: menuItemPropTypes.isRequired,
}

export default BurgerIngredient;