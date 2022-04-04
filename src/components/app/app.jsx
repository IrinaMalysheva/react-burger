import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HomePage } from '../../pages/home';
import { LoginPage } from '../../pages/login';
import { NotFound404 } from '../../pages/404';
import { RegisterPage } from '../../pages/register';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password';
import { ProfilePage } from '../../pages/profile';
import { ProtectedRoute } from '../protected-route/protected-route';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { 
  getUser,
  updateToken,
} from "../../services/actions/authRegister";
import { getCookie } from '../../utils/utils';

const App = () => {
  const dispatch = useDispatch();
  const { accessToken, userData } = useSelector((store) => store.authRegister);

  const refreshToken = getCookie("refreshToken");
  useEffect(() => {
    if (accessToken) {
      dispatch(getUser(accessToken));
    } else if (refreshToken) {
      dispatch(updateToken());
    }
  }, []);

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
          <ProtectedRoute path="/profile" exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;