import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import orderDetailsStyles from './order-details.module.css';
import { getOrder } from '../../services/actions';
import { API_URL } from '../../utils/constants';
import doneImg from "../../images/done.png";

function OrderDetails() {
    const dispatch = useDispatch();
    const constructorInnerIngredients = useSelector(state => state.ingredientsOrder.constructorInnerIngredients);
    const constructorBun = useSelector(state => state.ingredientsOrder.constructorBun);
    const constructorIngredients = {ingredients: [...constructorInnerIngredients, constructorBun]};

    const orderResponse = useSelector(state => state.ingredientsOrder.orderObject);

    useEffect(() => {
        dispatch(getOrder(API_URL, constructorIngredients));
    }, [dispatch]);

    return (
        <div className={orderDetailsStyles.order + " pt-30 pb-30"}>
            {orderResponse ?
                <>
                    <p className="text text_type_digits-large mb-8">{orderResponse.order.number}</p>
                    <p className="text text_type_main-medium">идентификатор заказа</p>
                    <img src={doneImg} alt="done.png" className="pt-15 pb-15" />
                    <p className="text text_type_main-default pb-2">Ваш заказ начали готовить</p>
                    <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
                </>
                : <p className="text text_type_main-medium">Заказ не был создан</p>
            }
        </div>
    )
}

export default OrderDetails;
