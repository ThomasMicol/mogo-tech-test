import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBasketProduct } from 'src/models/IBasketProduct';
import { IProduct } from 'src/models/IProduct';
import { loadProducts } from './app.actions';
import { IAppState, selectAllBasketProducts, selectAllProducts } from './app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mogo-tech-test';

  // observable that is listening to the stores products state.
  products$: Observable<IProduct[]>;

  // observable that is listening to the products in the basket state
  basketProducts$: Observable<IBasketProduct[]>;

  constructor(private store$: Store<IAppState>) {
    // load the products from the product service
    this.store$.dispatch(loadProducts());

    // get all the products from the store. this is will emit values everytime the products state change
    // these value changes are propogated down into the components that are using this observable as a asyncronous
    // param
    this.products$ = this.store$.select(selectAllProducts);
    // get all the products in the basket, emitting everytime they change
    this.basketProducts$ = this.store$.select(selectAllBasketProducts);
  }


}
