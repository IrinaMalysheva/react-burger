import { React, useState, useEffect } from 'react';
//import data from '../../utils/data';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const App = () => {
  const API_URL = "https://norma.nomoreparties.space/api/ingredients";

  const [state, setState] = useState(
    {
      data: null,
      isModalOpen: false
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const resJson = await response.json();
        setState({ data: resJson.data });
      }
      catch (e) {
        console.log(e)
      }
    };
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setState({ ...state, isModalOpen: true });
  }

  const handleCloseModal = () => {
    setState({ ...state, isModalOpen: false });
  }

  return (
    <div className={`App p-10 ${appStyles.App}`}>
      <AppHeader />
      {state.data &&
        <main className="flexContainerJcCenter">
          <BurgerIngredients data={state.data} />
          <BurgerConstructor data={state.data} />
          <button onClick={handleOpenModal}>Открыть модальное окно</button>
          {state.isModalOpen &&
          <Modal header={state.isIngredientsModal ? "Детали ингредиента" : ""} onClose={handleCloseModal}>
            { state.isIngredientsModal
              ? <p>IngredientDetails</p>
              : <p>OrderDetails</p>
            }
          </Modal>
      }
        </main>
      }
    </div>
  );
}

export default App;