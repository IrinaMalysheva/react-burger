import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage } from '../../pages/home';
import { LoginPage } from '../../pages/login';
import { NotFound404 } from '../../pages/404';
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
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;