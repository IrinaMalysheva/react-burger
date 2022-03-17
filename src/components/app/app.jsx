import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { closeIngredientModal, closeOrderModal } from '../../services/actions';

const App = () => {
  const isIngredientModal = useSelector(state => state.general.isIngredientModal);
  const isOrderModal = useSelector(state => state.general.isOrderModal);

  const dispatch = useDispatch();

  const onIngredientModalClose = () => {
    dispatch(closeIngredientModal());
  };

  const onOrderModalClose = () => {
    dispatch(closeOrderModal());
  };

  return (
    <div className={`App p-10 ${appStyles.App}`}>
      <AppHeader />
      <main className="flexContainerJcCenter">
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
        {isIngredientModal &&
          <Modal header="Детали ингредиента" onClose={onIngredientModalClose}>
            <IngredientDetails />
          </Modal>
        }
        {isOrderModal &&
          <Modal onClose={onOrderModalClose}>
            <OrderDetails />
          </Modal>
        }
      </main>
    </div>
  );
}

export default App;