import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IProduct } from 'src/models/IProduct';
import { addProductToBasket } from '../app.actions';
import { IAppState } from '../app.reducer';

@Component({
  selector: 'app-item-display',
  templateUrl: './item-display.component.html',
  styleUrls: ['./item-display.component.scss']
})
export class ItemDisplayComponent {

  // the product that this item display is handling.
  @Input()
  product: IProduct;

  // ng model for the input defaults to zero
  quantity: number = 0;

  // inject stores
  constructor(private store$: Store<IAppState>) { }


  addToBasket() {
    // dont dispatch the action if the quantity box value is still zero
    if (this.quantity > 0) {
      this.store$.dispatch(addProductToBasket({ product: this.product, quantity: this.quantity }));
      this.quantity = 0;
    }
  }
}
