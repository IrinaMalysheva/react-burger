import React, { FC, useEffect } from "react";
import { Link, useLocation, useParams, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from '../../services/hooks';
import orderInfoStyles from "./order-info.module.css";
import OrderIngrItem from "../order-ingr-item/order-ingr-item";
import ScrollableSection from "../scrollable-section/scrollable-section"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient, TLocation, TParams, TOrder } from "../../utils/types";
import { textFromStatus } from '../../utils/utils';
import {
    wsOrderConnectionStartAction,
    wsOrderConnectionClosedAction,
    wsUserOrderConnectionStartAction,
    wsUserOrderConnectionClosedAction
} from "../../services/actions/wsOrdersFeed";

const OrderInfo: FC = () => {
    const dispatch = useDispatch();
    const { id } = useParams<TParams>();
    const { state } = useLocation<TLocation>();
    const isBackground = state?.background;
    const dataIngredientsList = useSelector(store => store.generalBurgers.dataIngredientsList);
    const { isLoggedIn } = useSelector(store => store.authRegister);
    const isProfileOrder = useRouteMatch({ path: "/profile/orders" });
    const { feedOrders, userOrders, wsFeedConnected, wsUserConnected, wsFeedStarted, wsUserStarted } = useSelector(store => store.wsOrdersFeed);
    const feedOrder = feedOrders && feedOrders.find((item: TOrder) => item._id === id);
    const userOrder = userOrders && userOrders.find((item: TOrder) => item._id === id);
    const currentOrder = isProfileOrder ? userOrder : feedOrder;
    const burgerIngredients = dataIngredientsList && dataIngredientsList.filter((item: TIngredient) => currentOrder?.ingredients.includes(item._id));

    useEffect(
        () => {
            dispatch(isProfileOrder ? wsUserOrderConnectionStartAction() : wsOrderConnectionStartAction());
            return () => {
                dispatch(isProfileOrder ? wsUserOrderConnectionClosedAction() : wsOrderConnectionClosedAction());
            };
        }, [isLoggedIn]
    );

    const orderPrice = React.useMemo(
        () =>
            burgerIngredients
                ? burgerIngredients.reduce((sum: number, current: TIngredient) => sum + current.price, 0)
                : 0,
        [burgerIngredients]
    );

    const orderDateNewDate = currentOrder ? new Date(currentOrder.createdAt) : new Date(0);
    const orderDateFormated = currentOrder && orderDateNewDate.toLocaleString("ru");

    return (
        <div className={`${orderInfoStyles.orderInfo} ${isBackground && orderInfoStyles.orderModalInfo}`}>
            {
                (currentOrder && burgerIngredients)
                    ?
                    <>
                        <p className={`${orderInfoStyles.orderNumber} text text_type_digits-default ${isBackground ? "pt-6 pb-6" : "pb-10"}`}>#{currentOrder.number}</p>
                        <p className={`${orderInfoStyles.orderName} text text_type_main-default ${isBackground ? "pb-1" : "pb-3"}`}>{currentOrder.name}</p>
                        <p className={`${orderInfoStyles.orderStatus} text text_type_main-default ${isBackground ? "pb-10" : "pb-15"} ${currentOrder.status == "done" && orderInfoStyles.done}`}>
                            {textFromStatus(currentOrder.status)}
                        </p>
                        <h3 className={orderInfoStyles.orderTitle + " text text_type_main-default pb-6"}>Состав:</h3>
                        <ScrollableSection>
                            <ul className={orderInfoStyles.order_list}>
                                {burgerIngredients.map((ingredient: TIngredient) => (
                                    <OrderIngrItem
                                        key={ingredient._id}
                                        ingredient={ingredient}
                                        name={ingredient.name}
                                        image={ingredient.image}
                                        currentOrder={currentOrder}
                                    />
                                ))}
                            </ul>
                        </ScrollableSection>
                        <div className={orderInfoStyles.order_price + " mt-10 pb-10"}>
                            <p className={orderInfoStyles.order_date + " text text_type_main-default text_color_inactive"}>{orderDateFormated}</p>
                            <div className={orderInfoStyles.order_total}>
                                <p className={orderInfoStyles.orderNumber + " text text_type_digits-default"}>{orderPrice}</p>
                                &nbsp;<CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </>
                    :
                    (wsFeedStarted || wsUserStarted)
                        ? (wsFeedConnected || wsUserConnected)
                            ? (isProfileOrder)
                                ? (userOrders.length)
                                    ?
                                    <>
                                        <p className={orderInfoStyles.orderInfo + " " + orderInfoStyles.orderNumber + " text text_type_main-medium"}>
                                            Заказ с идентификатором <span className="text_color_inactive">{id}</span> не найден в списке Ваших последних заказов
                                        </p >
                                        <p className={orderInfoStyles.orderNumber + " text text_type_main-default pt-10"}>
                                            Перейти на <Link to='/' className="text_color_inactive">главную</Link>, чтобы сделать заказ
                                        </p>
                                    </>
                                    :
                                    <>
                                        <p className={orderInfoStyles.orderInfo + " " + orderInfoStyles.orderNumber + " text text_type_main-medium"}>
                                            В последнее время у Вас не было заказов 
                                        </p >
                                        <p className={orderInfoStyles.orderNumber + " text text_type_main-default pt-10"}>
                                            Чтобы создать заказ, перейдите на <Link to='/' className="text_color_inactive">главную</Link>
                                        </p>
                                    </>
                                :
                                <>
                                    <p className={orderInfoStyles.orderInfo + " " + orderInfoStyles.orderNumber + " text text_type_main-medium"}>
                                        Заказ с идентификатором <span className="text_color_inactive">{id}</span> не найден
                                    </p >
                                    <p className={orderInfoStyles.orderNumber + " text text_type_main-default pt-10"}>
                                        Перейти на <Link to='/' className="text_color_inactive">главную</Link>, чтобы сделать заказ
                                    </p>
                                </>
                            :
                            <p className={orderInfoStyles.orderInfo + " " + orderInfoStyles.orderNumber + " text text_type_main-medium"}>
                                Ожидаем данные от сервера
                            </p>
                        :
                        <p className={orderInfoStyles.orderInfo + " " + orderInfoStyles.orderNumber + " text text_type_main-medium"}>
                            Ожидаем подключение к серверу
                        </p>
            }
        </div>
    );
};

export default OrderInfo;