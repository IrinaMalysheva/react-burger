import { FC } from 'react';
import constructorInnerStyles from './constructor-inner.module.css';
import ConstructorInnerElement from '../constructor-inner-element/constructor-inner-element';
import ScrollableSection from '../scrollable-section/scrollable-section';
import { TConstructorInner } from '../../utils/types';

const ConstructorInner: FC<TConstructorInner> = ({ data, onDelete }) => {
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

export default ConstructorInner;