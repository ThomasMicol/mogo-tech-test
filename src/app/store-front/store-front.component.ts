import { Component, Input } from '@angular/core';
import { IProduct } from 'src/models/IProduct';

@Component({
  selector: 'app-store-front',
  templateUrl: './store-front.component.html',
  styleUrls: ['./store-front.component.scss']
})
export class StoreFrontComponent {

  // passed into the component via observable triggered in the app component
  @Input()
  products: IProduct[] | null;
}
