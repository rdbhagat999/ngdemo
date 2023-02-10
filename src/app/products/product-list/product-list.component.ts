import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { IProduct } from '../product';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent
  implements
    AfterViewInit,
    AfterViewChecked
{
  @Input() products: IProduct[] = [];

  @ViewChildren(ProductComponent)
  productQueryList!: QueryList<ProductComponent>;

  constructor() {}

  trackById(index: number, item: IProduct) {
    return item.id;
  }

  ngAfterViewInit() {
    const productList = this.productQueryList.toArray();
    console.log('[ngAfterViewInit]');
    console.log('productList', productList);
  }

  ngAfterViewChecked() {
    const productList = this.productQueryList.toArray();
    console.log('[ngAfterViewChecked]');
    console.log('productList', productList);
  }
}
