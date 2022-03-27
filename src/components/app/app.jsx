import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage } from '../../pages/home';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';

const App = () => {
  return (
    <div className={`App p-10 ${appStyles.App}`}>
      <AppHeader />
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;