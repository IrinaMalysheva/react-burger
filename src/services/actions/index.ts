import { checkResponse, getCookie } from '../../utils/utils';
import type { TIngredient } from '../../utils/types';
import { AppDispatch, AppThunk } from '../types';
import { 
    GET_DATA_INGREDIENTS_REQUEST,
    GET_DATA_INGREDIENTS_SUCCESS,
    GET_DATA_INGREDIENTS_ERROR,

    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR,
    REMOVE_ORDER_OBJECT,

    SET_CONSTRUCTOR_BUN,
    ADD_CONSTRUCTOR_INGREDIENT,
    REMOVE_CONSTRUCTOR_INGREDIENT,
    CLEAR_CONSTRUCTOR,
    MOVE_CONSTRUCTOR_INGREDIENT,

    OPEN_MODAL,
    CLOSE_MODAL,
    OPEN_INGREDIENT_MODAL,
    CLOSE_INGREDIENT_MODAL,
    OPEN_ORDER_MODAL,
    CLOSE_ORDER_MODAL,
    SET_TAB_NAME,
    SET_TAB_OFFSETTOP,
} from '../constants';

export interface IGetDataIngredientsRequestAction {
    readonly type: typeof GET_DATA_INGREDIENTS_REQUEST;
}

export interface IGetDataIngredientsSuccessAction {
    readonly type: typeof GET_DATA_INGREDIENTS_SUCCESS;
    readonly data: TIngredient[];
}

export interface IGetDataIngredientsErrorAction {
    readonly type: typeof GET_DATA_INGREDIENTS_ERROR;
}

export interface ISetConstructorBunAction {
    readonly type: typeof SET_CONSTRUCTOR_BUN;
    item: TIngredient;
}

export interface IAddConstructorIngredientAction {
    readonly type: typeof ADD_CONSTRUCTOR_INGREDIENT;
    item: TIngredient;
}

export interface IRemoveConstructorIngredientAction {
    readonly type: typeof REMOVE_CONSTRUCTOR_INGREDIENT;
    uuid: string;
}

export interface IClearConstructorAction {
    readonly type: typeof CLEAR_CONSTRUCTOR;
}
       
export interface IMoveConstructorIngredientAction {
    readonly type: typeof MOVE_CONSTRUCTOR_INGREDIENT;
    dragIndex: number;
    hoverIndex: number;
}

export interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    data: object;
}

export interface IGetOrderErrorAction {
    readonly type: typeof GET_ORDER_ERROR;
}

export interface IRemoveOrderObjectAction {
    readonly type: typeof REMOVE_ORDER_OBJECT;
}

export interface IOpenModalAction {
    readonly type: typeof OPEN_MODAL;
}

export interface ICloseModalAction {
    readonly type: typeof CLOSE_MODAL;
}

export interface IOpenIngredientModalAction {
    readonly type: typeof OPEN_INGREDIENT_MODAL;
}

export interface ICloseIngredientModalAction {
    readonly type: typeof CLOSE_INGREDIENT_MODAL;
}

export interface IOpenOrderModalAction {
    readonly type: typeof OPEN_ORDER_MODAL;
}

export interface ICloseOrderModalAction {
    readonly type: typeof CLOSE_ORDER_MODAL;
}

export interface ISetTabNameAction {
    readonly type: typeof SET_TAB_NAME;
    tabname: string;
}

export interface ISetTabOffsettopAction {
    readonly type: typeof SET_TAB_OFFSETTOP;
    data: {[tabName: string]: number};
}

export type TMainBurgersActions =
    | IGetDataIngredientsRequestAction
    | IGetDataIngredientsSuccessAction
    | IGetDataIngredientsErrorAction
    | ISetConstructorBunAction
    | IAddConstructorIngredientAction
    | IRemoveConstructorIngredientAction
    | IClearConstructorAction
    | IMoveConstructorIngredientAction
    | IGetOrderRequestAction
    | IGetOrderSuccessAction
    | IGetOrderErrorAction
    | IRemoveOrderObjectAction
    | IOpenModalAction
    | ICloseModalAction
    | IOpenIngredientModalAction
    | ICloseIngredientModalAction
    | IOpenOrderModalAction
    | ICloseOrderModalAction
    | ISetTabNameAction
    | ISetTabOffsettopAction
    ;

const getDataIngredientsRequestAction = (): IGetDataIngredientsRequestAction => ({ type: GET_DATA_INGREDIENTS_REQUEST });
const getDataIngredientsSuccessAction = (data: TIngredient[]): IGetDataIngredientsSuccessAction => ({
    type: GET_DATA_INGREDIENTS_SUCCESS,
    data
});
const getDataIngredientsErrorAction = (): IGetDataIngredientsErrorAction => ({ type: GET_DATA_INGREDIENTS_ERROR });

const setConstructorBunAction = (item: TIngredient): ISetConstructorBunAction => ({
    type: SET_CONSTRUCTOR_BUN,
    item
});
const addConstructorIngredientRequestAction = (item: TIngredient): IAddConstructorIngredientAction => ({ 
    type: ADD_CONSTRUCTOR_INGREDIENT,
    item
});
const removeConstructorIngredientRequestAction = (uuid: string): IRemoveConstructorIngredientAction => ({ 
    type: REMOVE_CONSTRUCTOR_INGREDIENT,
    uuid
});
const clearConstructorAction = (): IClearConstructorAction => ({ type: CLEAR_CONSTRUCTOR });
const moveConstructorIngredientRequestAction = (dragIndex: number, hoverIndex: number): IMoveConstructorIngredientAction => ({
    type: MOVE_CONSTRUCTOR_INGREDIENT,
    dragIndex,
    hoverIndex,
});

const getOrderRequestAction = (): IGetOrderRequestAction => ({ type: GET_ORDER_REQUEST });
const getOrderSuccessAction = (data: object): IGetOrderSuccessAction => ({
    type: GET_ORDER_SUCCESS,
    data
});
const getOrderErrorAction = (): IGetOrderErrorAction => ({ type: GET_ORDER_ERROR });
const removeOrderObjectAction = (): IRemoveOrderObjectAction => ({ type: REMOVE_ORDER_OBJECT });

const closeOrderModalAction = (): ICloseOrderModalAction => ({ type: CLOSE_ORDER_MODAL });

export const getDataIngredientsList: AppThunk = (apiUrl: string) => (dispatch: AppDispatch) => {
    dispatch(getDataIngredientsRequestAction());
    return fetch(apiUrl + "/ingredients")
        .then(checkResponse)
        .then(jsonResp =>
            dispatch(getDataIngredientsSuccessAction(jsonResp.data))
        )
        .catch((err) => {
            console.log(err);
            dispatch(getDataIngredientsErrorAction());
        })
}

export const getOrder: AppThunk = (apiUrl: string, constructorIngredients: {ingredients: Array<TIngredient>}) => (dispatch: AppDispatch) => {
    const json = JSON.stringify(constructorIngredients);
    const headers: string[][] = [
        ['Content-Type', 'application/json; charset=utf-8'],
        ['Authorization', getCookie("refreshToken")]
    ];

    dispatch(getOrderRequestAction());
    return fetch(apiUrl + "/orders", {
        method: 'POST',
        body: json,
        headers: headers
    })
        .then(checkResponse)
        .then(jsonResp => {
            dispatch(getOrderSuccessAction(jsonResp));
            dispatch(clearConstructorAction());
        })
        .catch((err) => {
            console.log(err);
            dispatch(getOrderErrorAction());
        })
}

export const addBun = (item: TIngredient, uuid: string): ISetConstructorBunAction => ({
    type: SET_CONSTRUCTOR_BUN,
    item: { ...item, uuid: uuid }
});

export const addIngredient = (item: TIngredient, uuid: string): IAddConstructorIngredientAction => ({
    type: ADD_CONSTRUCTOR_INGREDIENT,
    item: { ...item, uuid: uuid }
});

export const closeIngredientModal = (): ICloseIngredientModalAction => ({
    type: CLOSE_INGREDIENT_MODAL
});

export const closeModal = (): ICloseModalAction => ({
    type: CLOSE_MODAL
});

export const moveIngredient = (dragIndex: number, hoverIndex: number): IMoveConstructorIngredientAction => ({
    type: MOVE_CONSTRUCTOR_INGREDIENT,
    dragIndex,
    hoverIndex
});

export const openIngredientModal = (): IOpenIngredientModalAction => ({
    type: OPEN_INGREDIENT_MODAL
});

export const openModal = (): IOpenModalAction => ({
    type: OPEN_MODAL
});

export const openOrderModal = (): IOpenOrderModalAction => ({
    type: OPEN_ORDER_MODAL
});

export const removeIngredient = (uuid: string): IRemoveConstructorIngredientAction => ({
    type: REMOVE_CONSTRUCTOR_INGREDIENT,
    uuid
});

export const setTabNameAction = (tabname: string): ISetTabNameAction => ({ 
    type: SET_TAB_NAME,
    tabname
});

export const setTabOffsettopAction = (data: {[tabName: string]: number}): ISetTabOffsettopAction => ({ 
    type: SET_TAB_OFFSETTOP,
    data
});

export const closeOrderModal: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(closeOrderModalAction());
    dispatch(removeOrderObjectAction());
}