import { FC } from "react";
import ordersTotalStyles from "./orders-stand.module.css";
import { TOrder } from "../../utils/types";
import { ordersList } from "../../utils/constants";

const OrdersStand: FC = () => {
    const doneOrders = ordersList.slice(0, 3);
    const pendingOrders = ordersList.slice(3);

    return (
        <div className={ordersTotalStyles.standContainer}>
            <div className={ordersTotalStyles.standSubontainer}>
                <div>
                    <h2 className="text text_type_main-medium pb-6">
                        Готовы:
                    </h2>
                    <ul className={ordersTotalStyles.doneUl}>
                        {doneOrders.map((order: TOrder) => (
                            <li className="text text_type_digits-default pb-2" key={order._id}>{order.number}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text text_type_main-medium pb-6">
                        В работе:
                    </h2>
                    <ul>
                        {pendingOrders.map((order: TOrder) => (
                            <li className="text text_type_digits-default pb-2" key={order._id}>{order.number}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <h2 className="text text_type_main-medium mt-15">
                Выполнено за все время:
            </h2>
            <p className={`text text_type_digits-large ${ordersTotalStyles.totalNumber}`}>28 752</p>
            <h2 className="text text_type_main-medium mt-15">
                Выполнено за сегодня:
            </h2>
            <p className={`text text_type_digits-large ${ordersTotalStyles.totalNumber}`}>138</p>
        </div>
    );
};

export default OrdersStand;