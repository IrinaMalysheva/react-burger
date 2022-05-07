import { FC } from "react";
import { useEffect } from "react";
import { RootStateOrAny } from 'react-redux';
import { useSelector, useDispatch } from '../../services/hooks';
import orderDetailsStyles from './order-details.module.css';
import { getOrder } from '../../services/actions/generalBurgers';
import { API_URL } from '../../utils/constants';
import doneImg from "../../images/done.png";

const OrderDetails: FC = () => {
    const dispatch = useDispatch();
    const constructorFillingIngredients = useSelector((store: RootStateOrAny) => store.generalBurgers.constructorFillingIngredients);
    const constructorBun = useSelector((store: RootStateOrAny) => store.generalBurgers.constructorBun);
    const constructorIngredients = {ingredients: [...constructorFillingIngredients, constructorBun]};

    const { orderObject, orderRequest, orderFailed } = useSelector((store: RootStateOrAny) => store.generalBurgers);

    useEffect(() => {
        dispatch(getOrder(API_URL, constructorIngredients));
    }, [dispatch]);

    return (
        <div className={orderDetailsStyles.order + " pt-30 pb-30"}>
            {orderObject ?
                <>
                    <p className="text text_type_digits-large mb-8">{orderObject.order.number}</p>
                    <p className="text text_type_main-medium">идентификатор заказа</p>
                    <img src={doneImg} alt="done.png" className="pt-15 pb-15" />
                    <p className="text text_type_main-default pb-2">Ваш заказ начали готовить</p>
                    <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
                </>
                : orderRequest ? <p className="text text_type_main-medium">Ожидаем информацию о заказе</p> 
                               : orderFailed ? <p className="text text_type_main-medium">Информация о заказе не поступила</p> 
                                             : <p className="text text_type_main-medium">Статус заказа не определён</p> 
            }
        </div>
    )
}

export default OrderDetails;
