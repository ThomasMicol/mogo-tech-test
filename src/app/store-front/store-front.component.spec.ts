import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../app.module';
import { metaReducerLocalCache } from '../app.reducer';

import { StoreFrontComponent } from './store-front.component';

describe('StoreFrontComponent', () => {
  let component: StoreFrontComponent;
  let fixture: ComponentFixture<StoreFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreFrontComponent ],
      imports: [StoreModule.forRoot(reducers, { metaReducers: [metaReducerLocalCache] }),]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
