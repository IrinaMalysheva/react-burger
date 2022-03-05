import React, { useState, useEffect } from "react";
import orderDetailsStyles from './order-details.module.css';
//import PropTypes from "prop-types";
import doneImg from "../../images/done.png";

function OrderDetails({ ingredientId, ingredientData }) {
    const [orderResponse, setOrderResponse] = useState({
        "success": false,
        "name": "",
        "order": { "number": 0 }
    });

    useEffect(() => {    
        let json = JSON.stringify({"ingredients":["60d3b41abdacab0026a733c7","60d3b41abdacab0026a733c7","60d3b41abdacab0026a733c8","60d3b41abdacab0026a733c9","60d3b41abdacab0026a733ca","60d3b41abdacab0026a733cb","60d3b41abdacab0026a733cc","60d3b41abdacab0026a733cd","60d3b41abdacab0026a733ce","60d3b41abdacab0026a733cf","60d3b41abdacab0026a733d0","60d3b41abdacab0026a733d1","60d3b41abdacab0026a733d2","60d3b41abdacab0026a733d3","60d3b41abdacab0026a733d4"]});

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
            <p className="text text_type_digits-large mb-8">{orderResponse.order.number}</p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <img src={doneImg} alt="done.png" className="pt-15 pb-15" />
            <p className="text text_type_main-default pb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    //: PropTypes.string.isRequired
};

export default OrderDetails;