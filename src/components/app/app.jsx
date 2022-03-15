import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from '../../utils/constants';
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
  const [state, setState] = useState({
    data: null,
    clickedIngredient: ""
  });
  
  const isModalOpen = useSelector(state => state.general.isModalOpen);
  const isIngredientModal = useSelector(state => state.general.isIngredientModal);
  const isOrderModal = useSelector(state => state.general.isOrderModal);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "/ingredients");
        if (!response.ok) {
          throw new Error("fetch() was not succeed.");
        }
        const resJson = await response.json();
        setState({ data: resJson.data });
      }
      catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={`App p-10 ${appStyles.App}`}>
      <AppHeader />
      {state.data &&
        <main className="flexContainerJcCenter">
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
          {isIngredientModal && isModalOpen &&
            <Modal header="Детали ингредиента" >
              <IngredientDetails ingredientId={state.clickedIngredient} />
            </Modal>
          }
          {isOrderModal && isModalOpen &&
            <Modal >
              <OrderDetails />
            </Modal>
          }
        </main>
      }
    </div>
  );
}

export default App;