import { Location } from "history";
import { ReactNode } from "react";
import { match } from 'react-router-dom';

export type TBurgerIngredient = {
    ingredientsType: string;
    item: TIngredient;
}

export type TConstructorInner = {
    data: TIngredient[];
    onDelete: (uuid: string) => void;
}

export type THistory = {
    prevPathname?: string;
}

export type TConstructorInnerElement = {
    id: string,
    index: number,
    itemData: TIngredient,
    onDelete: (uuid: string) => void;
}

export type TFeedItemComponent = {
    orderId: string;
    orderNumber: number;
    orderDate: string;
    orderName: string;
    status: string;
    ingredients: Array<TIngredientId>;
    isProfileOrder: match<{}> | null;
}

export type TIngredient = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    uuid: string,
}

export type TIngredientId = Pick<TIngredient, '_id'> | string;

export type TIngredientsSection = {
    data: TIngredient[];
    header: string;
    ingredientsType: string;
    tabName: string;
}

export type TLocation = {
    from: Location;
    background?: Location;
}

export type TModal = {
    header?: string;
    onClose: () => void;
}

export type TModalOverlay = {
    onClose: () => void;
}

export type TOrder = {
    name: string;
    ingredients: Array<TIngredientId>;
    _id: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
};

export type TWSOrdersFeed = {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
}

export type TParams = {
    id: string;
}

export type TScrollableSection = {
    children?: ReactNode;
    parentClassName?: string;
}

export type TBurgerConstructorComponent = {
    burgerItem: TIngredient;
    index: number;
    onDelete: (uuid: string) => void;
    onMove: (dragIndex: number, hoverIndex: number) => void;
}

export type TForm = {
    name?: string;
    email?: string;
    password?: string;
    token?: string;
}

export type TUserData = Omit<TForm, "token">;

export type TSetUserData = Omit<TForm, "password">;

export type TIngredientComponent = {
    item: TIngredient;
}

export type TIngredientsItemComponent = {
    ingredients: TIngredient[];
    name: string;
}

export type TOrderIngrItem = {
    name: string;
    ingredient: TIngredient; 
    image: string;
    currentOrder: TOrder;
} 