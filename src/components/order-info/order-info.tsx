import React, { FC } from "react";
import { RootStateOrAny } from "react-redux";
import { useLocation, useParams, useRouteMatch } from "react-router-dom";
import { useSelector } from '../../services/hooks';
import orderInfoStyles from "./order-info.module.css";
import OrderIngrItem from "../order-ingr-item/order-ingr-item";
import ScrollableSection from "../scrollable-section/scrollable-section"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ordersList } from "../../utils/constants";
import { TIngredient, TLocation, TParams, TOrder } from "../../utils/types";

const OrderInfo: FC = () => {
    const { id } = useParams<TParams>();
    const dataIngredientsList = useSelector((store: RootStateOrAny) => store.general.dataIngredientsList);
    const { state } = useLocation<TLocation>();
    const isBackground = state?.background;
    const isUserOrder = useRouteMatch({ path: "/profile/orders/" });
    const feedOrder = ordersList && ordersList.find((item: TOrder) => item._id === id);
    const userOrder = ordersList && ordersList.find((item: TOrder) => item._id === id);
    const currentOrder = isUserOrder ? userOrder : feedOrder;
    const burgerIngredients = dataIngredientsList && dataIngredientsList.filter((item: TIngredient) => currentOrder?.ingredients.includes(item._id));

    const orderPrice = React.useMemo(
        () =>
            burgerIngredients
                ? burgerIngredients.reduce((sum: number, current: TIngredient) => sum + current.price, 0)
                : 0,
        [burgerIngredients]
    );

    let status;
    {
        currentOrder && (status =
            currentOrder.status == "created" ? "Создан" :
                currentOrder.status == "pending" ? "Готовится" :
                    currentOrder.status == "done" ? "Выполнен" :
                        "Неопределён")
    }

    const orderDateNewDate = currentOrder ? new Date(currentOrder.createdAt) : new Date(0);
    const orderDateFormated = currentOrder && orderDateNewDate.toLocaleString("ru");

    return (
        <div className={`${orderInfoStyles.orderInfo} ${isBackground && orderInfoStyles.orderModalInfo}`}>
            {currentOrder && burgerIngredients &&
                <>
                    <p className={`${orderInfoStyles.order_id} text text_type_digits-default ${isBackground ? "pt-6 pb-6" : "pb-10"}`}>#{currentOrder.number}</p>
                    <p className={`${orderInfoStyles.order_name} text text_type_main-default ${isBackground ? "pb-1" : "pb-3"}`}>{currentOrder.name}</p>
                    <p className={`${orderInfoStyles.order_status} text text_type_main-default ${isBackground ? "pb-10" : "pb-15"} ${currentOrder.status == "done" && orderInfoStyles.done}`}>
                        {status}
                    </p>
                    <h3 className={orderInfoStyles.order_title + " text text_type_main-default pb-6"}>Состав:</h3>
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
                            &nbsp;
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </>}
        </div>
    );
};

export default OrderInfo;