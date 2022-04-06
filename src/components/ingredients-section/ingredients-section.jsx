
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { menuItemPropTypes } from '../../utils/constants';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import ingredientsSectionStyles from './ingredients-section.module.css';
import { SET_TAB_OFFSETTOP } from '../../services/actions';

function IngredientsSection({ data, header, ingredientsType, tabName }) {
    let minOffsetTop = 0;
    const dispatch = useDispatch();
    const sectionElement = useRef(null);

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
            <h2 className={`pb-6 text text_type_main-medium ${ingredientsSectionStyles.header}`} data-tabname={tabName} ref={sectionElement}>
                {header}
            </h2>
            <ul className={`pl-4 ${ingredientsSectionStyles.ingredientsContainer}`}>
                {
                    data.map((item) => {
                        return <BurgerIngredient item={item} data={data} key={item._id} ingredientsType={ingredientsType} />;
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
    tabName: PropTypes.string.isRequired,
}

export default IngredientsSection;