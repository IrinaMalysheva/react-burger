import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { menuItemPropTypes } from '../../utils/constants';
import { TotalPriceContext } from '../../utils/burgerDataContext';
import constructorInnerElementStyles from './constructor-inner-element.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function ConstructorInnerElement({ itemData, id, onDelete }) {
    const totalPriceDispatch = useContext(TotalPriceContext);

    useEffect(() => {
        totalPriceDispatch({ type: 'add', reducerPrice: itemData.price });
    }, []);

    return (
        <li className={`mr-2 mb-4 ${constructorInnerElementStyles.constructorItem}`} id={id}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={itemData.name}
                price={itemData.price}
                thumbnail={itemData.image}
                handleClose={() => onDelete(itemData.uuid)}
            />
        </li>
    )
};

ConstructorInnerElement.propTypes = {
    itemData: menuItemPropTypes.isRequired,
    id: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default ConstructorInnerElement;