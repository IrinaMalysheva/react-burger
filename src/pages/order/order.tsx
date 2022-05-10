import { FC } from "react";
import orderPageStyles from "./order.module.css";
import OrderInfo from "../../components/order-info/order-info";

export const OrderPage: FC = () => {
  return (
    <main className={orderPageStyles.orderContainer}>
        <OrderInfo />
    </main>
  );
}; 