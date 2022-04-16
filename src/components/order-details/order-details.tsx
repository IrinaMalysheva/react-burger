import { FC } from "react";
import { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import orderDetailsStyles from './order-details.module.css';
import { getOrder } from '../../services/actions';
import { API_URL } from '../../utils/constants';
import doneImg from "../../images/done.png";

const OrderDetails: FC = () => {
    const dispatch = useDispatch();
    const constructorFillingIngredients = useSelector((store: RootStateOrAny) => store.ingredientsOrder.constructorFillingIngredients);
    const constructorBun = useSelector((store: RootStateOrAny) => store.ingredientsOrder.constructorBun);
    const constructorIngredients = {ingredients: [...constructorFillingIngredients, constructorBun]};

    const orderResponse = useSelector((store: RootStateOrAny) => store.ingredientsOrder.orderObject);

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
                : <p className="text text_type_main-medium">Заказ не создан</p>
            }
        </div>
    )
}

export default OrderDetails;
