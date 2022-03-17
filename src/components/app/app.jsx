import { useSelector } from 'react-redux';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  const isModalOpen = useSelector(state => state.general.isModalOpen);
  const isIngredientModal = useSelector(state => state.general.isIngredientModal);
  const isOrderModal = useSelector(state => state.general.isOrderModal);

  return (
    <div className={`App p-10 ${appStyles.App}`}>
      <AppHeader />
      <main className="flexContainerJcCenter">
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
        {isIngredientModal && isModalOpen &&
          <Modal header="Детали ингредиента" >
            <IngredientDetails />
          </Modal>
        }
        {isOrderModal && isModalOpen &&
          <Modal >
            <OrderDetails />
          </Modal>
        }
      </main>
    </div>
  );
}

export default App;