import { useState, useContext, useEffect } from "react";
import { OrderIngredientsContext } from '../../utils/burgerDataContext';
import { API_URL } from '../../utils/constants';
import orderDetailsStyles from './order-details.module.css';
import doneImg from "../../images/done.png";

function OrderDetails() {
    const [orderResponse, setOrderResponse] = useState({
        "success": false,
        "name": "",
        "order": { "number": 0 }
    });

    const ingredients = useContext(OrderIngredientsContext);

    useEffect(() => {
        const json = JSON.stringify(ingredients.ingredients);

        const fetchData = async () => {
            try {
                const response = await fetch(API_URL + "111/orders", {
                    method: 'POST',
                    body: json,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                });
                if (!response.ok) {
                    throw new Error("POST fetch() was not succeed.");
                  }
                const jsonResp = await response.json();
                setOrderResponse(jsonResp);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className={orderDetailsStyles.order + " pt-30 pb-30"}>
            {(orderResponse.order.number != 0) ?
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