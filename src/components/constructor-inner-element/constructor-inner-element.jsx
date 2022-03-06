import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { menuItemPropTypes } from '../../utils/constants';
import { OrderIngredientsContext, TotalPriceContext } from '../../utils/burgerDataContext';
import constructorInnerElementStyles from './constructor-inner-element.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function ConstructorInnerElement({ itemData, id }) {
    const { ingredients, setIngredients } = useContext(OrderIngredientsContext);
    const totalPriceDispatch = useContext(TotalPriceContext);
    const [curId, setCurId] = useState("");

    useEffect(() => {
        setCurId(id);
        setIngredients(prevState => ({ "ingredients": [...prevState.ingredients, id]}));
        totalPriceDispatch({ type: 'add', reducerPrice: itemData.price });
    }, [curId]);

    return (
        <li className={`mr-2 mb-4 ${constructorInnerElementStyles.constructorItem}`} id={id}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={itemData.name}
                price={itemData.price}
                thumbnail={itemData.image}
            />
        </li>
    )
};

ConstructorInnerElement.propTypes = {
    itemData: menuItemPropTypes.isRequired,
    id: PropTypes.string.isRequired
}

export default ConstructorInnerElement;