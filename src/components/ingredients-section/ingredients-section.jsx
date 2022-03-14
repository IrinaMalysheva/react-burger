
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { menuItemPropTypes } from '../../utils/constants';
import ingredientsSectionStyles from './ingredients-section.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OPEN_MODAL, OPEN_INGREDIENT_MODAL, SET_CURRENT_INGREDIENT_DETAILS, SET_TAB_OFFSETTOP } from '../../services/actions';

function IngredientsSection(props) {
    let minOffsetTop = 0;
    const dispatch = useDispatch();
    const sectionElement = useRef(null);

    const handleClick = (e) => {
        let currentTargetId = e.currentTarget.id;
        dispatch({ type: OPEN_MODAL });
        dispatch({ type: OPEN_INGREDIENT_MODAL });
        dispatch({
            type: SET_CURRENT_INGREDIENT_DETAILS,
            id: currentTargetId
        });
    }
    
    useEffect(() => {
        let tabName = sectionElement.current.getAttribute("data-tabname");
        if (tabName === "one") {
            minOffsetTop = sectionElement.current.offsetTop;
        }
        dispatch({
            type: SET_TAB_OFFSETTOP,
            data: {[tabName]: sectionElement.current.offsetTop - minOffsetTop}
        });
    }, []);

    return (
        <section className={`mt-10 mb-10 ${ingredientsSectionStyles.secContainer}`}>
            <h2 className={`pb-6 text text_type_main-medium ${ingredientsSectionStyles.header}`} data-tabname={props.tabName} ref={sectionElement}>
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