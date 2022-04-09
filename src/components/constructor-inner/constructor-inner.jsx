import PropTypes from 'prop-types';
import { menuItemPropTypes } from '../../utils/constants';
import constructorInnerStyles from './constructor-inner.module.css';
import ConstructorInnerElement from '../constructor-inner-element/constructor-inner-element';
import ScrollableSection from '../scrollable-section/scrollable-section';

function ConstructorInner({ data, onDelete }) {
    return (
        <ScrollableSection parentClassName={constructorInnerStyles.scrollContainerStyles}>
            <ul className={constructorInnerStyles.innerContainer}>
                {
                    data.map((item, index) => {
                        return (item.type != "bun") && <ConstructorInnerElement
                            itemData={item}
                            key={item.uuid}
                            id={item._id}
                            onDelete={onDelete}
                            index={index}
                        />
                    })
                }
            </ul>
        </ScrollableSection>
    )
};

ConstructorInner.propTypes = {
    data: PropTypes.arrayOf(menuItemPropTypes).isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default ConstructorInner;