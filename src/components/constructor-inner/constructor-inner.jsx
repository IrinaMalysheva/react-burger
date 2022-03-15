import PropTypes from 'prop-types';
import { menuItemPropTypes } from '../../utils/constants';
import constructorInnerStyles from './constructor-inner.module.css';
import ConstructorInnerElement from '../constructor-inner-element/constructor-inner-element';
import ScrollableSection from '../scrollable-section/scrollable-section';

function ConstructorInner(props) {
    return (
        <ScrollableSection parentClassName={constructorInnerStyles.scrollContainerStyles}>
            <ul className={constructorInnerStyles.innerContainer}>
                {
                    props.data.map((item, index) => {
                        return (item.type != "bun") && <ConstructorInnerElement itemData={item} key={index} id={item._id} onDelete={props.onDelete} />
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