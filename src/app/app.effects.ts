import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, from, map, mergeMap, of, switchMap } from "rxjs";
import * as AppActions from './app.actions';
import { ProductService } from "./product.service";

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) { }

  // AppActions load products from the service. once the service has resolved we trigger the load products success action.
  // usually if this data was coming from an API we would catch a reject from the promise to send a load products failure result but
  // this service serves static data and will never fail.
  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(AppActions.loadProducts),
    switchMap(() =>
      from(this.productService.getAllProducts()).pipe(
        concatMap(res => of(
          AppActions.loadProductsSuccess({ products: res })
        ))
      )
    ))
  );
}
