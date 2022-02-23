import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import data from './utils/data';

function App() {
  return (
    <div className="App p-10">
      <AppHeader />
      <main className="flexContainerJcCenter">
        <BurgerIngredients data={data} className="mr-10"/>
        <BurgerIngredients data={data}/>
      </main>
    </div>
  );
}

export default App;
