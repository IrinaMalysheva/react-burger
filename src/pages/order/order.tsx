import { FC } from "react";
import styles from "./order.module.css";
import OrderInfo from "../../components/order-info/order-info";

export const OrderPage: FC = () => {
  return (
    <main className={styles.order_section}>
        <OrderInfo />
    </main>
  );
}; 