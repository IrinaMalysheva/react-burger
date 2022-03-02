import React from "react";
import ingredientDetailsStyles from './ingredient-details.module.css';
import { menuItemPropTypes } from '../../utils/constants';
import PropTypes from "prop-types";

function IngredientDetails({ ingredientId, ingredientData }) {
    const ingredientItem = ingredientData.find((item) => item._id === ingredientId);

    return (
        <div className={ingredientDetailsStyles.ingredientContainer + " pb-15"} key={ingredientItem._id}>
            <img src={ingredientItem.image_large} alt={ingredientItem.name} />
            <p className="text_type_main-medium mt-4 mb-8">{ingredientItem.name}</p>
            <ul className={ingredientDetailsStyles.list}>
                <li className={ingredientDetailsStyles.listItem}>
                    <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredientItem.calories}</p>
                </li>
                <li className={ingredientDetailsStyles.listItem}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredientItem.proteins}</p>
                </li>
                <li className={ingredientDetailsStyles.listItem}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredientItem.fat}</p>
                </li>
                <li className={ingredientDetailsStyles.listItem}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredientItem.carbohydrates}</p>
                </li>
            </ul>
        </div>
    )
};

IngredientDetails.propTypes = {
    ingredientData: PropTypes.arrayOf(menuItemPropTypes).isRequired,
    ingredientId: PropTypes.string.isRequired
};

export default IngredientDetails;