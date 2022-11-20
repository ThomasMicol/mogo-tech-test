import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';
import { appReducer, IAppState, metaReducerLocalCache } from './app.reducer';
import { StoreFrontComponent } from './store-front/store-front.component';
import { BasketComponent } from './store-front/basket/basket.component';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { ItemDisplayComponent } from './item-display/item-display.component';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const reducers: ActionReducerMap<{ AppState: IAppState }> = {
  AppState: appReducer
};

export const metaReducers: MetaReducer<IAppState>[] = [];


@NgModule({
  declarations: [
    AppComponent,
    StoreFrontComponent,
    BasketComponent,
    ItemDisplayComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers: [metaReducerLocalCache] }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([AppEffects]),
    NoopAnimationsModule,
    MatIconModule,
    MatSidenavModule,
    FormsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
