import { IProduct } from "./IProduct";

// An individual item that is in the basket
export interface IBasketProduct {
  product: IProduct,
  quantity: number;
}
