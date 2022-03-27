import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage } from '../../pages/home';
import { LoginPage } from '../../pages/login';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';

const App = () => {
  return (
    <div className={`App ${appStyles.App}`}>
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;