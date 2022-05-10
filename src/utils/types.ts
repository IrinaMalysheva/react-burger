import { Location } from "history";
import { ReactNode } from "react";
import { match } from 'react-router-dom';

export type TBurgerConstructorComponent = {
    burgerItem: TIngredient;
    index: number;
    onDelete: (uuid: string) => void;
    onMove: (dragIndex: number, hoverIndex: number) => void;
}

export type TBurgerIngredient = {
    ingredientsType: string;
    item: TIngredient;
}

export type TConstructorInner = {
    data: TIngredient[];
    onDelete: (uuid: string) => void;
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

export type THistory = {
    prevPathname?: string;
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

export type TIngredientComponent = {
    item: TIngredient;
}

export type TIngredientsItemComponent = {
    ingredients: TIngredient[];
    name: string;
}

export type TIngredientId = Pick<TIngredient, '_id'> | string;

export type TIngredientsSection = {
    data: TIngredient[];
    header: string;
    ingredientsType: string;
    tabHeadersOffset: number;
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

export type TOrderObject = {
    name: string;
    order: TOrder;
    success: boolean;
};

export type TOrderIngrItem = {
    name: string;
    ingredient: TIngredient; 
    image: string;
    currentOrder: TOrder;
}

export type TOrderOrder = {
    _id: string;
    owner: TOwner;
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    price: number;
};

export type TOwner = {
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export type TParams = {
    id: string;
}

export type TSetUserData = Omit<TUserData, "password">;

export type TScrollableSection = {
    children?: ReactNode;
    parentClassName?: string;
}

export type TTabOffsettop = {
    [tabName: string]: number
}

export type TUserData = {
    name?: string;
    email?: string;
    password?: string;
}

export type TWSOrdersFeed = {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
}