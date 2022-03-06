import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { menuItemPropTypes } from '../../utils/constants';
import { OrderIngredientsContext } from '../../utils/burgerDataContext';
import constructorInnerStyles from './constructor-inner.module.css';
import ConstructorInnerElement from '../constructor-inner-element/constructor-inner-element';
import ScrollableSection from '../scrollable-section/scrollable-section';

function ConstructorInner(props) {
    const { ingredients, setIngredients } = useContext(OrderIngredientsContext);

    return (
        <ScrollableSection parentClassName={constructorInnerStyles.scrollContainerStyles}>
            <ul className={constructorInnerStyles.innerContainer}>
                {
                    props.data.map((item, index) => {
                        return (item.type != "bun") && <ConstructorInnerElement itemData={item} key={index} id={item._id} />
                    })
                }
            </ul>
        </ScrollableSection>
    )
};

ConstructorInner.propTypes = {
    data: PropTypes.arrayOf(menuItemPropTypes).isRequired
}

export default ConstructorInner;