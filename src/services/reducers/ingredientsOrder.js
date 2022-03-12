
import { SET_CURRENT_INGREDIENT_DETAILS_OBJECT } from '../actions';

const initialState = {
    dataIngredientsList: [],
    constructorIngredientsList: [],
    currentIngredientDetailsObject: null,
    orderObject: null,
};

export const ingredientsOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_INGREDIENT_DETAILS_OBJECT: {
            return {
                ...state, 
                currentIngredientDetailsObject: [...state.dataIngredientsList].filter(item => item.id !== action.id)
            };
        }
        default: {
            return state;
        }
    }
};
