import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { menuItemPropTypes } from '../../utils/constants';
import ingredientsSectionStyles from './ingredients-section.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { GET_CURRENT_INGREDIENT_DETAILS, OPEN_MODAL, OPEN_INGREDIENT_MODAL } from '../../services/actions';

function IngredientsSection(props) {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        let currentTargetId = e.currentTarget.id;
        dispatch({ type: OPEN_MODAL });
        dispatch({ type: OPEN_INGREDIENT_MODAL });
        dispatch({
            type: GET_CURRENT_INGREDIENT_DETAILS,
            id: currentTargetId
        });
    }
    
    return (
        <section className={`mt-10 mb-10 ${ingredientsSectionStyles.secContainer}`}>
            <h2 className={`pb-6 text text_type_main-medium ${ingredientsSectionStyles.header}`}>
                {props.header}
            </h2>
            <ul className={`pl-4 ${ingredientsSectionStyles.ingredientsContainer}`}>
                {
                    props.data.map((item) => {
                        return (item.type == props.ingredientsType) &&
                            <li className={`mb-8 ${ingredientsSectionStyles.ingredient}`} key={item._id} onClick={handleClick} id={item._id}>
                                <img className="pl-4 pr-4" src={item.image} />
                                <p className="pt-1 pb-1 flexContainerJcCenter">
                                    <span className={`pr-1 text text_type_digits-default ${ingredientsSectionStyles.price}`}>{item.price}</span>
                                    <CurrencyIcon type="primary" />
                                </p>
                                <p className={`text text_type_main-default ${ingredientsSectionStyles.ingredientsName}`}>
                                    {item.name}
                                </p>
                            </li>
                    })
                }
            </ul>
        </section>
    )
};

IngredientsSection.propTypes = {
    data: PropTypes.arrayOf(menuItemPropTypes).isRequired,
    header: PropTypes.string.isRequired,
    ingredientsType: PropTypes.string.isRequired,
}

export default IngredientsSection;