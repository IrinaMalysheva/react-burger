import reducer from './generalBurgers';
import initialState from './generalBurgers';
import * as types from '../constants/generalBurgers';

describe('generalBurgers reducer', () => {
  const tabName = "two";
  const tabOffset = { "one": 123 };
  const ingrsFetchedList = [
    {
      "_id": "60d3b41abdacab0026a733c6",
      "name": "Краторная булка N-200i",
      "type": "bun",
      "proteins": 80,
      "fat": 24,
      "carbohydrates": 53,
      "calories": 420,
      "price": 1255,
      "image": "https://code.s3.yandex.net/react/code/bun-02.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
      "__v": 0
    },
    {
      "_id": "60d3b41abdacab0026a733c8",
      "name": "Филе Люминесцентного тетраодонтимформа",
      "type": "main",
      "proteins": 44,
      "fat": 26,
      "carbohydrates": 85,
      "calories": 643,
      "price": 988,
      "image": "https://code.s3.yandex.net/react/code/meat-03.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
      "__v": 0
    },
  ];
  const ingrsInnerList = [
    {
      "_id": "60d3b41abdacab0026a733c6",
      "name": "Краторная булка N-200i",
      "type": "bun",
      "proteins": 80,
      "fat": 24,
      "carbohydrates": 53,
      "calories": 420,
      "price": 1255,
      "image": "https://code.s3.yandex.net/react/code/bun-02.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
      "__v": 0,
      "uuid": "059871-e593-369a-78df-9dc23847f2cf"
    },
    {
      "_id": "60d3b41abdacab0026a733c8",
      "name": "Филе Люминесцентного тетраодонтимформа",
      "type": "main",
      "proteins": 44,
      "fat": 26,
      "carbohydrates": 85,
      "calories": 643,
      "price": 988,
      "image": "https://code.s3.yandex.net/react/code/meat-03.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
      "__v": 0,
      "uuid": "1ba9c7ba-3693-2892-141b-65c24c37baf882"
    },
    {
      "_id": "60d3b41abdacab0026a733cc",
      "name": "Соус Spicy-X",
      "type": "sauce",
      "proteins": 30,
      "fat": 20,
      "carbohydrates": 40,
      "calories": 30,
      "price": 90,
      "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
      "__v": 0,
      "uuid": "2ba9c7ba-111a-22b2-3c33-65c24c37baf882"
    },
  ];
  const order = {
    "success": true,
    "name": "Spicy краторный бургер",
    "order": {
      "ingredients": [
        {
          "_id": "60d3b41abdacab0026a733cc",
          "name": "Соус Spicy-X",
          "type": "sauce",
          "proteins": 30,
          "fat": 20,
          "carbohydrates": 40,
          "calories": 30,
          "price": 90,
          "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
          "__v": 0
        },
        {
          "_id": "60d3b41abdacab0026a733c6",
          "name": "Краторная булка N-200i",
          "type": "bun",
          "proteins": 80,
          "fat": 24,
          "carbohydrates": 53,
          "calories": 420,
          "price": 1255,
          "image": "https://code.s3.yandex.net/react/code/bun-02.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
          "__v": 0
        }
      ],
      "_id": "628acb22fa747e001bd49b20",
      "owner": {
        "name": "11",
        "email": "kijos-01@royins.com",
        "createdAt": "2022-04-01T17:55:17.189Z",
        "updatedAt": "2022-04-06T22:03:19.738Z"
      },
      "status": "done",
      "name": "Spicy краторный бургер",
      "createdAt": "2022-05-22T23:45:38.985Z",
      "updatedAt": "2022-05-22T23:45:39.261Z",
      "number": 15684,
      "price": 1345
    }
  }

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        tabName: "one",
        tabOffsets: [],

        isModalOpen: false,
        isIngredientModal: false,
        isOrderModal: false,

        dataIngredientsList: [],
        dataIngredientsRequest: false,
        dataIngredientsFailed: false,

        constructorFillingIngredients: [],
        constructorBun: null,

        orderObject: null,
        orderRequest: false,
        orderFailed: false,
      }
    )
  });

  it("should handle CLOSE_MODAL", () => {
    expect(
      reducer(initialState, {
        type: types.CLOSE_MODAL,
      })
    ).toEqual({
      ...initialState,
      isModalOpen: false,
    });
  });

  it("should handle OPEN_MODAL", () => {
    expect(
      reducer(initialState, {
        type: types.OPEN_MODAL,
      })
    ).toEqual({
      ...initialState,
      isModalOpen: true,
      isIngredientModal: false,
      isOrderModal: false
    });
  });

  it("should handle OPEN_INGREDIENT_MODAL", () => {
    expect(
      reducer(initialState, {
        type: types.OPEN_INGREDIENT_MODAL,
      })
    ).toEqual({
      ...initialState,
      isIngredientModal: true
    });
  });

  it("should handle CLOSE_INGREDIENT_MODAL", () => {
    expect(
      reducer(initialState, {
        type: types.CLOSE_INGREDIENT_MODAL,
      })
    ).toEqual({
      ...initialState,
      isIngredientModal: false
    });
  });

  it("should handle OPEN_ORDER_MODAL", () => {
    expect(
      reducer(initialState, {
        type: types.OPEN_ORDER_MODAL,
      })
    ).toEqual({
      ...initialState,
      isOrderModal: true
    });
  });

  it("should handle CLOSE_ORDER_MODAL", () => {
    expect(
      reducer(initialState, {
        type: types.CLOSE_ORDER_MODAL,
      })
    ).toEqual({
      ...initialState,
      isOrderModal: false
    });
  });

  it("should handle SET_TAB_OFFSETTOP", () => {
    expect(
      reducer({
        ...initialState,
        tabOffsets: []
      }, {
        type: types.SET_TAB_OFFSETTOP,
        data: tabOffset
      })
    ).toEqual({
      ...initialState,
      tabOffsets: [tabOffset]
    });
  });

  it("should handle SET_TAB_NAME", () => {
    expect(
      reducer(initialState, {
        type: types.SET_TAB_NAME,
        tabname: tabName
      })
    ).toEqual({
      ...initialState,
      tabName: tabName
    });
  });

  it("should handle GET_DATA_INGREDIENTS_REQUEST", () => {
    expect(
      reducer(initialState, {
        type: types.GET_DATA_INGREDIENTS_REQUEST,
      })
    ).toEqual({
      ...initialState,
      dataIngredientsFailed: false,
      dataIngredientsRequest: true
    });
  });

  it("should handle GET_DATA_INGREDIENTS_SUCCESS", () => {
    expect(
      reducer(initialState, {
        type: types.GET_DATA_INGREDIENTS_SUCCESS,
        data: ingrsFetchedList
      })
    ).toEqual({
      ...initialState,
      dataIngredientsList: ingrsFetchedList,
      dataIngredientsRequest: false,
      dataIngredientsFailed: false,
    });
  });

  it("should handle GET_DATA_INGREDIENTS_ERROR", () => {
    expect(
      reducer(initialState, {
        type: types.GET_DATA_INGREDIENTS_ERROR,
      })
    ).toEqual({
      ...initialState,
      dataIngredientsRequest: false,
      dataIngredientsFailed: true
    });
  });

  it("should handle ADD_CONSTRUCTOR_INGREDIENT", () => {
    expect(
      reducer({
        ...initialState,
        constructorFillingIngredients: []
      }, {
        type: types.ADD_CONSTRUCTOR_INGREDIENT,
        item: ingrsFetchedList[1]
      })
    ).toEqual({
      ...initialState,
      constructorFillingIngredients: [ingrsFetchedList[1]]
    });
  });

  it("should handle SET_CONSTRUCTOR_BUN", () => {
    expect(
      reducer({
        ...initialState,
        constructorBun: null
      }, {
        type: types.SET_CONSTRUCTOR_BUN,
        item: ingrsFetchedList[0]
      })
    ).toEqual({
      ...initialState,
      constructorBun: ingrsFetchedList[0]
    });
  });

  it("should handle REMOVE_CONSTRUCTOR_INGREDIENT", () => {
    expect(
      reducer({
        ...initialState,
        constructorFillingIngredients: [ingrsInnerList[1], ingrsInnerList[2]]
      }, {
        type: types.REMOVE_CONSTRUCTOR_INGREDIENT,
        uuid: ingrsInnerList[1].uuid
      })
    ).toEqual({
      ...initialState,
      constructorFillingIngredients: [ingrsInnerList[2]]
    });
  });

  it("should handle CLEAR_CONSTRUCTOR", () => {
    expect(
      reducer({
        ...initialState,
        constructorBun: ingrsInnerList[0],
        constructorFillingIngredients: [ingrsInnerList[1]]
      }, {
        type: types.CLEAR_CONSTRUCTOR
      })
    ).toEqual({
      ...initialState,
      constructorBun: null,
      constructorFillingIngredients: []
    });
  });

  it("should handle MOVE_CONSTRUCTOR_INGREDIENT", () => {
    expect(
      reducer({
        ...initialState,
        constructorFillingIngredients: [ingrsInnerList[1], ingrsInnerList[2]]
      }, {
        type: types.MOVE_CONSTRUCTOR_INGREDIENT,
        dragIndex: 1,
        hoverIndex: 0
      })
    ).toEqual({
      ...initialState,
      constructorFillingIngredients: [ingrsInnerList[2], ingrsInnerList[1]]
    });
  });

  it("should handle GET_ORDER_REQUEST", () => {
    expect(
      reducer(initialState, {
        type: types.GET_ORDER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      orderFailed: false,
      orderRequest: true
    });
  });

  it("should handle GET_ORDER_SUCCESS", () => {
    expect(
      reducer(initialState, {
        type: types.GET_ORDER_SUCCESS,
        data: order
      })
    ).toEqual({
      ...initialState,
      orderObject: order,
      orderRequest: false,
      orderFailed: false,
    });
  });
  
  it("should handle GET_ORDER_ERROR", () => {
    expect(
      reducer(initialState, {
        type: types.GET_ORDER_ERROR,
      })
    ).toEqual({
      ...initialState,
      orderRequest: false,
      orderFailed: true
    });
  });

  it("should handle REMOVE_ORDER_OBJECT", () => {
    expect(
      reducer(initialState, {
        type: types.REMOVE_ORDER_OBJECT,
      })
    ).toEqual({
      ...initialState,
      orderObject: null
    });
  });
});