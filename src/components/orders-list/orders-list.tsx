import { FC } from "react";
import FeedItem from "../feed-item/feed-item";
import { useRouteMatch } from "react-router-dom";
import { TOrder } from "../../utils/types";
import { ordersList } from "../../utils/constants";

const OrdersList: FC = () => {
  const isUserOrder = useRouteMatch({ path: "/profile/orders/" });

  return (
    <section>
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
              isUserOrder={isUserOrder}
            />
          ))}
        </ul>}
    </section>
  );
};

export default OrdersList;