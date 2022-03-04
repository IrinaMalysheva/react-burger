import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { menuItemPropTypes } from '../../utils/constants';
import { TotalPriceContext } from '../../utils/burgerDataContext';
import constructorInnerElementStyles from './constructor-inner-element.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function ConstructorInnerElement({ itemData, id, propKey }) {

    const totalPriceDispatch = useContext(TotalPriceContext);

    useEffect(() => {
        totalPriceDispatch({ type: 'add', reducerPrice: itemData.price });
    }, []);

    return (
        <li className={`mr-2 mb-4 ${constructorInnerElementStyles.constructorItem}`} key={propKey} id={id}>
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
    itemData: menuItemPropTypes.isRequired
}

export default ConstructorInnerElement;