import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HomePage } from '../../pages/home';
import { LoginPage } from '../../pages/login';
import { NotFound404 } from '../../pages/404';
import { RegisterPage } from '../../pages/register';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password';
import { ProfilePasswordPage } from '../../pages/profile';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { 
  getUser
  ,updateToken 
} from "../../services/actions/authRegister";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.authRegister.isLoggedIn);

  useEffect(() => {
    dispatch(updateToken());
    dispatch(getUser());
  }, [dispatch]);

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
          <Route path="/register" exact={true}>
            <RegisterPage />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPasswordPage />
          </Route>
          <Route path="/profile" exact={true}>
            <ProfilePasswordPage />
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