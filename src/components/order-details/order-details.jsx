import React from "react";
import orderDetailsStyles from './order-details.module.css';
//import PropTypes from "prop-types";
import doneImg from "../../images/done.png";

function OrderDetails({ ingredientId, ingredientData }) {
    return (
        <div className={orderDetailsStyles.order + " pt-30 pb-30"}>
            <p className="text text_type_digits-large mb-8">034536</p>
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