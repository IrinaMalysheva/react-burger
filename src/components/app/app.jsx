import React from 'react';
import data from '../../utils/data';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  return (
    <div className={`App p-10 ${appStyles.App}`}>
      <AppHeader />
      <main className="flexContainerJcCenter">
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;