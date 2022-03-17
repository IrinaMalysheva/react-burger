import { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from 'react-redux';
import { menuItemPropTypes } from '../../utils/constants';
import constructorInnerElementStyles from './constructor-inner-element.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { moveIngredient } from '../../services/actions';

function ConstructorInnerElement({ itemData, id, index, onDelete }) {
    const ref = useRef(null);
    const dispatch = useDispatch();

    const [{ isDragging }, dragRef] = useDrag({
        type: "draggedIngredient",
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [{ handlerId }, dropTarget] = useDrop({
        accept: "draggedIngredient",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveConstructorIngredient(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    dragRef(dropTarget(ref));

    const moveConstructorIngredient = useCallback((dragIndex, hoverIndex) => {
        dispatch(moveIngredient(dragIndex, hoverIndex));
    }, []);

    return (
        <li className={`mr-2 mb-4 ${constructorInnerElementStyles.constructorItem}`} id={id} ref={ref} data-handler-id={handlerId}>
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