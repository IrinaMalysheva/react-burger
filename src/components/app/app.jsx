import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BurgerDataContext, OrderIngredientsContext } from '../../utils/burgerDataContext';
import { API_URL } from '../../utils/constants';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

const App = () => {
  const [state, setState] = useState({
    data: null,
    clickedIngredient: ""
  });
  
  const isModalOpen = useSelector(state => state.ingredientsOrder.isModalOpen);
  const isIngredientModal = useSelector(state => state.ingredientsOrder.isIngredientModal);
  const isOrderModal = useSelector(state => state.ingredientsOrder.isOrderModal);
  const [ingredients, setIngredients] = useState({ "ingredients": [] });

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
          <BurgerIngredients />
          <BurgerDataContext.Provider value={state.data}>
            <OrderIngredientsContext.Provider value={{ingredients, setIngredients}}>
              <BurgerConstructor />
            </OrderIngredientsContext.Provider>
          </BurgerDataContext.Provider>
          {isIngredientModal && isModalOpen &&
            <Modal header="Детали ингредиента" >
              <IngredientDetails ingredientId={state.clickedIngredient} ingredientData={state.data} />
            </Modal>
          }
          {isOrderModal && isModalOpen &&
            <Modal >
              <OrderIngredientsContext.Provider value={{ingredients, setIngredients}}>
                <OrderDetails />
              </OrderIngredientsContext.Provider>
            </Modal>
          }
        </main>
      }
    </div>
  );
}

export default App;