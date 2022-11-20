import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { removeProductFromBasket } from 'src/app/app.actions';
import { IAppState } from 'src/app/app.reducer';
import { IBasketProduct } from 'src/models/IBasketProduct';
import { IProduct } from 'src/models/IProduct';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  // list of basket products. this is passed from the parent as an observable
  @Input()
  productsInBasket: IBasketProduct[] | null;


  // bool to handle the showing and hiding of the basket sidebar
  showBasket: boolean = false;

  constructor(private store$: Store<IAppState>) { }

  // dispatches remove product actions for the given product and removes the number
  removeProduct(item: IProduct, quantity: number) {
    this.store$.dispatch(removeProductFromBasket({ product: item, quantity: quantity }));
  }

  // calculates the total cost of the basket
  getTotalAmount = () => this.productsInBasket?.reduce((total, item) => total + item.product.price * item.quantity, 0)
}
