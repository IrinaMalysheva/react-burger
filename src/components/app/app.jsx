import { React, useState, useEffect } from 'react';
//import data from '../../utils/data';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

const App = () => {
  const API_URL = "https://norma.nomoreparties.space/api/ingredients";

  const [state, setState] = useState(
    {
      data: null,
      isModalOpen: false,
      isIngredientModal: true,
      isOrderModal: true,
      clickedIngredient: ""
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
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

  const handleCloseModal = () => {
    setState({ ...state, isModalOpen: false });

  }

  const handleOpenIngrModal = (id) => {
    setState({ ...state, isModalOpen: true, isIngredientModal: true, isOrderModal: false, clickedIngredient: id });
  }

  const handleOpenOrderModal = () => {
    setState({ ...state, isModalOpen: true, isIngredientModal: false, isOrderModal: true });
  }

  return (
    <div className={`App p-10 ${appStyles.App}`}>
      <AppHeader />
      {state.data &&
        <main className="flexContainerJcCenter">
          <BurgerIngredients data={state.data} clickHandler={handleOpenIngrModal} />
          <BurgerConstructor data={state.data} orderHandler={handleOpenOrderModal} />
          {state.isIngredientModal && state.isModalOpen &&
            <Modal header="Детали ингредиента" onClose={handleCloseModal}>
              <IngredientDetails ingredientId={state.clickedIngredient} ingredientData={state.data} />
            </Modal>
          }
          {state.isOrderModal && state.isModalOpen &&
            <Modal onClose={handleCloseModal}>
              <OrderDetails />
            </Modal>
          }
        </main>
      }
    </div>
  );
}

export default App;