import React from 'react';
import data from '../../utils/data';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

function App() {
  return (
    <div className={`App p-10 ${appStyles.App}`}>
      <AppHeader />
      <main className="flexContainerJcCenter">
        <BurgerIngredients data={data} nameOfClass="mr-10" />
        {/*
          Дублирование компонента BurgerIngredients ниже - только для демонтрации вида основного раздела страницы.
          После добавления BurgerConstructor будет стоять нужный компонент.
         */}
        <BurgerIngredients data={data} />
      </main>
    </div>
  );
}

export default App;