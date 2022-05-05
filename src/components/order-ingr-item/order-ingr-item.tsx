import { FC } from "react";
import styles from "./order-ingr-item.module.css";
import { TIngredientId, TOrderIngrItem } from "../../utils/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderIngrItem: FC<TOrderIngrItem> = ({name, ingredient, image, currentOrder}) => {
    const orderIngrItemCount = currentOrder.ingredients.filter((item: TIngredientId) => item === ingredient._id).length;
    return (
        <div className={styles.orderItemContainer + " pb-4"}>
            <div className={styles.orderItemIngrBox}>
                <div  className={styles.orderItemImgOuter}><img className={styles.orderItemImg + " ml-1 mt-1"} src={image} alt={name}/></div>
                <p className="text text_type_main-default ml-8 pt-5 pb-5">{name}</p>
            </div>
            <div className={styles.orderItemPricing + " text text_type_digits-default ml-4 pt-5 pb-5"}>
                <p className={styles.orderNumber}>{orderIngrItemCount}</p>
                &nbsp;x&nbsp;
                <p className={styles.orderNumber}>{ingredient.price}</p> 
                &nbsp;<CurrencyIcon type="primary" />
            </div>
        </div>
    )
}

export default OrderIngrItem; 