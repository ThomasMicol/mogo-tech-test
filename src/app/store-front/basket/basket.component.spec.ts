import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/app.module';
import { metaReducerLocalCache } from 'src/app/app.reducer';

import { BasketComponent } from './basket.component';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasketComponent],
      imports: [StoreModule.forRoot(reducers, { metaReducers: [metaReducerLocalCache] }),]

    })
      .compileComponents();

    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
