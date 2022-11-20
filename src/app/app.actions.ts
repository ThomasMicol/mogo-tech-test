import { createAction, props } from "@ngrx/store";
import { IProduct } from "src/models/IProduct";

// three actions for the loading of products. because this would usually be from an api we have to handle both success and failure states.
// in the effect that handles the load product action, when the service resolves we trigger the success action with the result. if the promise
// rejects we trigger the failure action that could show a error message
export const loadProducts = createAction('[Store Front] Load Products');
export const loadProductsSuccess = createAction('[Store Front] Load Products Success', props<{ products: IProduct[] }>());
export const loadProductsFailure = createAction('[Store Front] Load Products Failure');

// action for adding products this is handled by the app reducer
export const addProductToBasket = createAction('[Item Display] Add Product To Basket', props<{ product: IProduct, quantity: number }>());

// action for removing product from the basket. this is also picked up by the app reducer.
export const removeProductFromBasket = createAction('[Basket] Remove Product From Basket', props<{ product: IProduct, quantity: number }>());
