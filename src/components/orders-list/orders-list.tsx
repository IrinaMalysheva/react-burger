import { FC, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from '../../services/hooks';
import ordersListStyles from "./orders-list.module.css";
import FeedItem from "../feed-item/feed-item";
import { TOrder } from "../../utils/types";
import {
  wsOrderConnectionStartAction,
  wsOrderConnectionClosedAction,
  wsUserOrderConnectionStartAction,
  wsUserOrderConnectionClosedAction
} from "../../services/actions/wsOrdersFeed";

const OrdersList: FC = () => {
  const dispatch = useDispatch();
  const isProfileOrder = useRouteMatch({ path: "/profile/orders" });
  const { feedOrders, userOrders, wsFeedStarted, wsUserStarted, wsFeedConnected, wsUserConnected } = useSelector(store => store.wsOrdersFeed);
  const currentOrder = isProfileOrder ? userOrders : feedOrders;

  useEffect(
    () => {
      dispatch(isProfileOrder ? wsUserOrderConnectionStartAction() : wsOrderConnectionStartAction());
      return () => {
        dispatch(isProfileOrder ? wsUserOrderConnectionClosedAction() : wsOrderConnectionClosedAction());
      };
    }, [],
  );

  return (
    <section className={isProfileOrder?.isExact ? (ordersListStyles.profileOrdersSection) : ""}>
      {currentOrder.length ?
        <ul className="pr-2">
          {currentOrder.map((item: TOrder) => (
            <FeedItem
              key={item._id}
              orderId={item._id}
              orderNumber={item.number}
              orderName={item.name}
              orderDate={item.createdAt}
              ingredients={item.ingredients}
              status={item.status}
              isProfileOrder={isProfileOrder}
            />
          ))}
        </ul>
        : (wsFeedStarted || wsUserStarted)
          ? (wsFeedConnected || wsUserConnected)
            ?
            <>
              <p className="text text_type_main-medium mt-5">Список {isProfileOrder && "Ваших"} заказов пуст</p>
              {isProfileOrder &&
                <p className="text text_type_main-default mt-9">
                  Чтобы создать заказ, перейдите на <Link to='/' className="text_color_inactive">главную</Link>
                </p>
              }
            </>
            :
            <p className="text text_type_main-medium mt-5">
              Ожидаем данные от сервера
            </p>
          :
          <p className={"text text_type_main-medium mt-5"}>
            Ожидаем подключение к серверу
          </p>
      }
    </section>
  );
};

export default OrdersList;