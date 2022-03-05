import React, { useState, useContext, useEffect } from "react";
import { OrderIngsContext } from '../../utils/burgerDataContext';
import orderDetailsStyles from './order-details.module.css';
//import PropTypes from "prop-types";
import doneImg from "../../images/done.png";

function OrderDetails() {
    const [orderResponse, setOrderResponse] = useState({
        "success": false,
        "name": "",
        "order": { "number": 0 }
    });

    const ingredients = useContext(OrderIngsContext);

    useEffect(() => {
        let json = JSON.stringify(ingredients.ingredients);

        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://norma.nomoreparties.space/api/orders');
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(json);

        xhr.onload = function () {
            if (xhr.status != 200) {
                console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            } else {
                let jsonResp = JSON.parse(xhr.response);
                setOrderResponse(jsonResp);
            }
        };
    
        xhr.onerror = function () {
            console.log("Запрос не удался");
        };    
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
                : <p className="text text_type_main-medium">Заказ не создан</p>
            }
        </div>
    )
}

OrderDetails.propTypes = {
    //: PropTypes.string.isRequired
};

export default OrderDetails;