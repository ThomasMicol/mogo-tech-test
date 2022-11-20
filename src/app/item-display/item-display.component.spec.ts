import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../app.module';

import { ItemDisplayComponent } from './item-display.component';

describe('ItemDisplayComponent', () => {
  let component: ItemDisplayComponent;
  let fixture: ComponentFixture<ItemDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemDisplayComponent],
      imports: [
        StoreModule.forRoot(reducers),
        FormsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ItemDisplayComponent);
    component = fixture.componentInstance;
    component.product = { name: 'sledgehammer', price: 125.75 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
