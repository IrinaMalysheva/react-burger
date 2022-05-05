import { FC } from "react";
import FeedItem from "../feed-item/feed-item";
import { useRouteMatch } from "react-router-dom";
import ordersListStyles from "./orders-list.module.css";
import { TOrder } from "../../utils/types";
import { ordersList } from "../../utils/constants";

const OrdersList: FC = () => {
  const isProfileOrder = useRouteMatch({ path: "/profile/orders" });

  return (
    <section className={isProfileOrder?.isExact ? (ordersListStyles.profileOrdersSection) : ""}>
      {ordersList &&
        <ul className="pr-2">
          {ordersList.map((item: TOrder) => (
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
        </ul>}
    </section>
  );
};

export default OrdersList;