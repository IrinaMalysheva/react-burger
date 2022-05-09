import { FC, useMemo } from "react";
import { useSelector } from '../../services/hooks';
import ordersTotalStyles from "./orders-stand.module.css";
import { TOrder } from "../../utils/types";

const OrdersStand: FC = () => {
    const { feedOrders, total, totalToday } = useSelector(store => store.wsOrdersFeed);
    const doneOrders = useMemo(() => feedOrders.filter((item: TOrder) => item.status === "done"), [feedOrders]);
    const pendingOrders = useMemo(() => feedOrders.filter((item: TOrder) => item.status === "pending"), [feedOrders]);
    let doneOrders1Col = doneOrders;
    let doneOrders2Col = doneOrders;
    let pendingOrders1Col = pendingOrders;
    let pendingOrders2Col = pendingOrders;

    if (doneOrders.length > 5) {
        doneOrders1Col = doneOrders.slice(0, 5);
        doneOrders2Col = doneOrders.slice(5, 10);
    } else {
        doneOrders2Col = [];
    }
    if (pendingOrders.length > 5) {
        pendingOrders1Col = pendingOrders.slice(0, 5);
        pendingOrders2Col = pendingOrders.slice(5, 10);
    } else {
        pendingOrders2Col = [];
    }

    return (
        <div className={ordersTotalStyles.standContainer}>
            <div className={ordersTotalStyles.standSubcontainer}>
                <div>
                    <h2 className="text text_type_main-medium pb-6">
                        Готовы:
                    </h2>
                    <div className={ordersTotalStyles.standColsBox}>
                        <ul className={ordersTotalStyles.doneUl}>
                            {doneOrders1Col.map((order: TOrder) => (
                                <li className="text text_type_digits-default pb-2" key={order._id}>{order.number}</li>
                            ))}
                        </ul>
                        <ul className={ordersTotalStyles.doneUl}>
                            {doneOrders2Col.map((order: TOrder) => (
                                <li className="text text_type_digits-default pb-2" key={order._id}>{order.number}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                    <h2 className="text text_type_main-medium pb-6">
                        В работе:
                    </h2>
                    <div className={ordersTotalStyles.standColsBox}>
                        <ul>
                            {pendingOrders1Col.map((order: TOrder) => (
                                <li className="text text_type_digits-default pb-2" key={order._id}>{order.number}</li>
                            ))}
                        </ul>
                        <ul>
                            {pendingOrders2Col.map((order: TOrder) => (
                                <li className="text text_type_digits-default pb-2" key={order._id}>{order.number}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <h2 className="text text_type_main-medium mt-15">
                Выполнено за все время:
            </h2>
            <p className={`text text_type_digits-large ${ordersTotalStyles.totalNumber}`}>{total}</p>
            <h2 className="text text_type_main-medium mt-15">
                Выполнено за сегодня:
            </h2>
            <p className={`text text_type_digits-large ${ordersTotalStyles.totalNumber}`}>{totalToday}</p>
        </div>
    );
};

export default OrdersStand;