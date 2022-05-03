import { FC } from 'react';
import OrdersList from "../components/orders-list/orders-list";
import OrdersStand from "../components/orders-stand/orders-stand";
import ScrollableSection from '../components/scrollable-section/scrollable-section';
import feedStyles from './feed.module.css';

export const FeedPage: FC = () => {
    return (
        <div className={feedStyles.feedContainer}>
            <main className="mr-15">
                <h2 className={"text text_type_main-large pb-5"}>
                    Лента заказов
                </h2>
                <ScrollableSection parentClassName={feedStyles.scrollContainerStyles}>
                    <OrdersList />
                </ScrollableSection>
            </main>
            <main className="pt-15">
                <ScrollableSection parentClassName={feedStyles.scrollContainerStyles}>
                    <OrdersStand />
                </ScrollableSection>
            </main>
        </div>
    );
}