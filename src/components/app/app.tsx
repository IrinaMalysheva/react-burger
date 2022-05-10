import { FC, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/hooks';
import { HomePage } from '../../pages/home';
import { LoginPage } from '../../pages/login';
import { NotFound404 } from '../../pages/404';
import { RegisterPage } from '../../pages/register';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password';
import { ProfilePage } from '../../pages/profile/profile';
import { FeedPage } from '../../pages/feed/feed';
import { OrderPage } from '../../pages/order/order';
import { ProtectedRoute } from '../protected-route/protected-route';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { closeIngredientModal, closeModal } from '../../services/actions/generalBurgers';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { getUser, } from "../../services/actions/authRegister";
import { getDataIngredientsList } from '../../services/actions/generalBurgers';
import { API_URL } from '../../utils/constants';
import { TLocation } from '../../utils/types';

function ModalSwitch() {
  const location = useLocation<TLocation>();
  const dispatch = useDispatch();
  const history = useHistory();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDataIngredientsList(API_URL));
  }, [dispatch]);

  const handleIngredienModalClose = () => {
    dispatch(closeIngredientModal());
    history.goBack();
  };

  const handleModalClose = () => {
    dispatch(closeModal());
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
        <ProtectedRoute path="/profile/orders/:id" exact={true}>
          <OrderPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/feed" exact={true}>
          <FeedPage />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <OrderPage />
        </Route>
        <Route path='/ingredients/:id' exact={true}>
          <IngredientDetails />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>

      {background && (
        <Route
          path='/ingredients/:id'
          children={
            <Modal header="Детали ингредиента" onClose={handleIngredienModalClose}>
              <IngredientDetails />
            </Modal>
          }
        />
      )}
      {background && (
        <Route path="/feed/:id">
          <Modal header="Заказ" onClose={handleModalClose}>
            <OrderPage />
          </Modal>
        </Route>
      )}
      {background && (
        <ProtectedRoute path="/profile/orders/:id">
          <Modal header="Заказ" onClose={handleModalClose}>
            <OrderPage />
          </Modal>
        </ProtectedRoute>
      )}
    </>
  );
};

const App: FC = () => {
  return (
    <div className={`App ${appStyles.App}`}>
      <Router>
        <ModalSwitch />
      </Router>
    </div>
  );
}

export default App;