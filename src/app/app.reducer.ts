import { ActionReducer, createReducer, createSelector, INIT, on, UPDATE } from "@ngrx/store"
import { IBasketProduct } from "src/models/IBasketProduct"
import { IProduct } from "src/models/IProduct"
import { addProductToBasket, loadProductsSuccess, removeProductFromBasket } from "./app.actions"

export interface IAppState {
  products: IProduct[],
  basket: IBasketProduct[]
}

// when loaded this is the initial state of the app
export const initialState: IAppState = {
  products: [],
  basket: []
}

export const appReducer = createReducer(
  initialState,
  // following reducer is triggered when the load product success action is called.
  // this just puts the loaded products into the state.
  on(loadProductsSuccess, (state, { products }) => {
    return {
      ...state,
      products: products
    }
  }),
  // adds product to the basket
  on(addProductToBasket, (state, { product, quantity }) => {
    let basket = state.basket;

    // does the product already exist in the list. -1 indicates it doesnt exist any other number means it was found.
    const indexOfProductAlreadyInBasket = state.basket.findIndex(a => a.product.name === product.name);

    if (indexOfProductAlreadyInBasket !== -1) {
      // create a new array from mapping over the basket array finding where the items product name is the same as what was passed into this reducer
      // if it does increment the quantity and add to the list. return the item unchanged if its name doesnt match
      basket = basket.map((item: IBasketProduct) => item.product.name === product.name
        ? { ...item, quantity: item.quantity + quantity }
        : { ...item });
    } else {
      //if the item doesnt already exist in the list just append the new product to the list
      basket = [...basket, { product: product, quantity: quantity }]
    }

    return {
      ...state,
      basket: basket
    }
  }),
  // handles remove from basket action
  on(removeProductFromBasket, (state, { product, quantity }) => {
    let basket = state.basket;

    // do a similar map function from the add product to basket reducer but instead decrement the quantity by the
    // quantity passed into this reducer
    basket = basket.map((item: IBasketProduct) => item.product.name === product.name
      ? { ...item, quantity: item.quantity - quantity }
      : { ...item });

    // get rid of any products who have had their quantities reduced to 0 (or lower somehow)
    basket = basket.filter(item => item.quantity >= 1);
    return { ...state, basket: basket }
  })
)

// meta reducer handles the persistance across reloads. This is run before any other normal reducer is run
export const metaReducerLocalCache = (reducer: ActionReducer<{ AppState: IAppState }>): ActionReducer<{ AppState: IAppState }> => {
  return (state, action) => {
    // if the action type is intializing or an update, we want to check the local storage for a value with the key basket.
    // if that exists we parse that json and return out that state.
    if (action.type === INIT || action.type === UPDATE) {
      const storedData = localStorage.getItem('basket');
      if (storedData !== null) {
        const data = JSON.parse(storedData);
        return data;
      }
    }

    // if the action was not listed in the above if statement, we want to continue on,
    // run reducer that was intended to be run and get the resulting new state.
    // stringify the json of the next state and save it in local storage for when there is an init or update event
    const nextState = reducer(state, action);
    localStorage.setItem('basket', JSON.stringify(nextState));
    return nextState;
  }
}

export const selectAppState = (state: any) => state.AppState;


export const selectAllProducts = createSelector(
  selectAppState,
  (state: IAppState) => state?.products
);

export const selectAllBasketProducts = createSelector(
  selectAppState,
  (state: IAppState) => state?.basket
);
