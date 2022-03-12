
import { A_B } from '../actions';

const initialState = {
    dataIngredientsList: [],
    constructorIngredientsList: [],
    currentIngredientDetailsObject: null,
    orderObject: null,
};

export const ingredientsOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
};
