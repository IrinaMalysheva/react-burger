import { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RootStateOrAny } from 'react-redux';
import { useSelector, useDispatch } from '../services/hooks';
import { closeOrderModal } from '../services/actions';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import Modal from '../components/modal/modal';
import OrderDetails from '../components/order-details/order-details';

export const HomePage: FC = () => {
    const isOrderModal = useSelector((store: RootStateOrAny) => store.general.isOrderModal);

    const dispatch = useDispatch();

    const onOrderModalClose = () => {
        dispatch(closeOrderModal());
    };

    return (
        <main className="flexContainerJcCenter pb-10">
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
            </DndProvider>
            {isOrderModal &&
                <Modal onClose={onOrderModalClose}>
                    <OrderDetails />
                </Modal>
            }
        </main>
    );
}