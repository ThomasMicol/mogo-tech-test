import { Injectable } from "@angular/core";
import { IProduct } from "src/models/IProduct";

// labelling this as injectable lets us request this service as a parameter for DI
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getAllProducts(): Promise<IProduct[]> {
    // Here is where an API call would go to get a list of products from the backend.

    // mimics us calling an API return a promise that resolves a list of products.
    return new Promise((resolve, reject) => {
      resolve([{
        name: 'Sledgehammer',
        price: 125.75
      }, {
        name: 'Axe',
        price: 190.50
      }, {
        name: 'Bandsaw',
        price: 562.13
      }, {
        name: 'Chisel',
        price: 12.9
      }, {
        name: 'Hacksaw',
        price: 18.45
      }])
    });

  }
}
