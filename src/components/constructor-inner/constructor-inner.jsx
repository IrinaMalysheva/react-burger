import React from 'react';
import PropTypes from 'prop-types';
import { menuItemPropTypes } from '../../utils/constants';
import constructorInnerStyles from './constructor-inner.module.css';
import ScrollableSection from '../scrollable-section/scrollable-section';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function ConstructorInner(props) {
    return (
        <ScrollableSection parentClassName={constructorInnerStyles.scrollContainerStyles}>
            <ul className={constructorInnerStyles.innerContainer}>
                {
                    props.data.map((item) => {
                        return (item.type != "bun") &&
                            <li className={`mr-2 mb-4 ${constructorInnerStyles.constructorItem}`} key={item._id} id={item._id}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                />
                            </li>
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