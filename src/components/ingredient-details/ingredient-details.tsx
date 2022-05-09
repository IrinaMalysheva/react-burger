import { FC, useMemo } from "react";
import { useSelector } from '../../services/hooks';
import { Link, useLocation, useParams } from 'react-router-dom';
import ingredientDetailsStyles from './ingredient-details.module.css';
import { TIngredient, TLocation, TParams } from '../../utils/types';

const IngredientDetails: FC = () => {
    const params = useParams<TParams>();
    const { state } = useLocation<TLocation>();
    const isBackground = state?.background;
    const ingredientId = params.id;
    const dataIngredientsList = useSelector(store => store.generalBurgers.dataIngredientsList);

    const ingredientItem = useMemo(
        () => dataIngredientsList?.find((item: TIngredient) => item._id === ingredientId),
        [dataIngredientsList, ingredientId]
    );

    return (
        <>
            {ingredientItem ?
                <div className={ingredientDetailsStyles.ingredientContainer + (isBackground ? " pb-15" : " pt-30 pb-30") } key={ingredientItem._id}>
                    {!isBackground && <p className="text text_type_main-large">Детали ингредиента</p>}
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
                :
                <>{dataIngredientsList?.length &&
                    <div className={ingredientDetailsStyles.noIngredientBox}>
                        <p className="text text_type_main-large pb-15">Такого ингредиента пока нет</p>
                        <p className="text text_type_main-medium pb-4">
                            Вы по-пержнему можете выбрать что-то <span></span> на <Link to='/'>главной странице</Link>.
                        </p>
                    </div>
                }</>
            }
        </>
    )
};

export default IngredientDetails;