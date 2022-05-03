import React, { FC } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from '../../services/hooks';
import { RootStateOrAny } from 'react-redux';
import feedItemStyles from "./feed-item.module.css";
import { TFeedItemComponent, TIngredient } from "../../utils/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const FeedItem: FC<TFeedItemComponent> = ({ orderID, orderNumber, orderDate, orderName, ingredients, status, isUserOrder }) => {
    const location = useLocation();
    const dataIngredientsList = useSelector((store: RootStateOrAny) => store.general.dataIngredientsList);
    const burgerIngredients = dataIngredientsList?.filter((item: TIngredient) => ingredients.includes(item._id));

    const orderPrice = React.useMemo(
        () =>
            burgerIngredients
                ? burgerIngredients.reduce((sum: number, current: TIngredient) => sum + current.price, 0)
                : 0,
        [burgerIngredients]
    );

    const ingrIconsVisible = burgerIngredients.length > 5
        ? burgerIngredients.slice(0, 5)
        : burgerIngredients;

    const ingrIconsHidden = burgerIngredients.length > 5
        ? burgerIngredients.length - 5
        : 0;

    const orderDateNewDate = new Date(orderDate);
    const orderDateFormated = orderDateNewDate.toLocaleString("ru");

    return (
        <Link
            to={{
                pathname: `${location.pathname}/${orderID}`,
                state: { background: location }
            }}
            className={feedItemStyles.link}
        >
            <article className={feedItemStyles.feedItem + " mb-4"}>
                <div>
                    <div className={feedItemStyles.feedItemSubblock}>
                        <p className={feedItemStyles.orderId + " text text_type_digits-default pb-6"}>#{orderNumber}</p>
                        <p className="text text_type_main-default text_color_inactive pb-6">{orderDateFormated}</p>
                    </div>
                    <p className={feedItemStyles.orderName + " text text_type_main-default pb-6"}>{orderName}</p>
                    <div className={feedItemStyles.feedItemSubblock}>
                        <ul className={feedItemStyles.feedIngredientsList}>
                            {ingrIconsVisible.map((item: TIngredient, index: number) => (
                                <li key={index} className={feedItemStyles.feedIngredientImg}>
                                    <img className={feedItemStyles.orderIngrImg} src={item.image} alt={item.name} />
                                    {index === 0 && ingrIconsHidden > 0 && (
                                        <span className={`text text_type_main-small ${feedItemStyles.moreIngredients}`}>+{ingrIconsHidden}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div className={feedItemStyles.orderPrice}>
                            <p className="text text_type_digits-default">{orderPrice}</p>
                            &nbsp;
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default FeedItem;