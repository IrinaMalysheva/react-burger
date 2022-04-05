import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HomePage } from '../../pages/home';
import { LoginPage } from '../../pages/login';
import { NotFound404 } from '../../pages/404';
import { RegisterPage } from '../../pages/register';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password';
import { ProfilePage } from '../../pages/profile';
import { ProtectedRoute } from '../protected-route/protected-route';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { closeIngredientModal } from '../../services/actions';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { getUser, updateToken } from "../../services/actions/authRegister";
import { getDataIngredientsList } from '../../services/actions';
import { API_URL } from '../../utils/constants';
import { getCookie } from '../../utils/utils';

function ModalSwitch() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const background = location.state && location.state.background;
  const { accessToken, userData } = useSelector((store) => store.authRegister);

  const refreshToken = getCookie("refreshToken");
  useEffect(() => {
    if (accessToken) {
      dispatch(getUser(accessToken));
    } else if (refreshToken) {
      dispatch(updateToken());
    }
  }, []);

  useEffect(() => {
    dispatch(getDataIngredientsList(API_URL));
  }, [dispatch]);

  const handleModalClose = () => {
    dispatch(closeIngredientModal());
    history.goBack();
  };

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
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
        <Route path='/ingredients/:ingredientId' exact>
          <IngredientDetails />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>

      {background && (
        <Route
          path='/ingredients/:ingredientId'
          children={
            <Modal header="Детали ингредиента" onClose={handleModalClose}>
              <IngredientDetails />
            </Modal>
          }
        />
      )}
    </>
  );
};

const App = () => {
  return (
    <div className={`App ${appStyles.App}`}>
      <Router>
        <ModalSwitch />
      </Router>
    </div>
  );
}

export default App;